import React, { useState } from "react";
import { StandardButton } from "../../../../../styled/Buttons";
import { PrivateClassPackageOptionAdminDisplay } from "./PrivateClassPackageOptionAdminDisplay";
import { PrivateClassOptionAdminDisplayProps } from "./types";
import Modal from "react-modal";
import { PrivateClassPackageOptionEditForm } from "./PrivateClassPackageOptionEditForm";
import ApiAdaptor from "../../../../../../backend/apiAdaptor";
import { DeleteIconButton } from "../../../../../common/buttons/DeleteIconButton";
import { useTeacherAdmin } from "../../hooks/useTeacherAdmin";
import { useToast } from "../../../../../../hooks/useToast";
import { EditIconButton } from "../../../../../common/buttons/EditIconButton";
import { usePrivateClassAdmin } from "../hooks/usePrivateClassAdmin";
import clsx from "clsx";
import { PrivateClassPackageOption } from "../../../../../types/privateClass/responses";

export const PrivateClassOptionAdminDisplay: React.FC<
  PrivateClassOptionAdminDisplayProps
> = ({ option, onEditClick }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] =
    useState<PrivateClassPackageOption | null>(null);

  const { refreshTeacher } = useTeacherAdmin();
  const { selectPrivateClass } = usePrivateClassAdmin();

  const onCreatePackageClick = () => {
    setModalOpen(true);
  };

  const onDeletePrivateClassOption = async () => {
    if (confirm("Are you sure? All associated classes will be deleted!"))
      await ApiAdaptor.deletePrivateClassOption(option.id);
    toast({
      message: "Private class option deleted",
    });
    refreshTeacher();
  };

  const onEditPrivateClassOption = async () => {
    selectPrivateClass(option.id);
    onEditClick && onEditClick();
  };

  const toggleActive = async () => {
    await ApiAdaptor.putPrivateClassOption(option.id, {
      ...option,
      active: !option.active,
    });
    refreshTeacher();
  };

  const onEditPackageClick = (packageOption: PrivateClassPackageOption) => {
    setSelectedPackage(packageOption);
    setModalOpen(true);
  };

  const onModalClose = () => {
    setModalOpen(false);
    setSelectedPackage(null);
  };

  return (
    <div className="p-4 border border-primary rounded-sm m-2">
      <div className="flex">
        <div className="w-1/6">
          <StandardButton
            className="m-2 bg-error border-error"
            onClick={onDeletePrivateClassOption}
          >
            <DeleteIconButton onClick={onDeletePrivateClassOption} />
          </StandardButton>
          <StandardButton
            className="m-2 bg-info border-info"
            onClick={onEditPrivateClassOption}
          >
            <EditIconButton onClick={onEditPrivateClassOption} />
          </StandardButton>
        </div>
        <div className="flex justify-center w-4/6">
          <h5 className="font-extrabold">Private Class Option Details</h5>
        </div>
        <div>
          <div
            className={clsx(
              "badge mx-2",
              "p-2",
              "cursor-pointer",
              option.active ? "badge-primary" : "badge-neutral"
            )}
            onClick={toggleActive}
          >
            {option.active ? "active" : "inactive"}
          </div>
        </div>
      </div>
      <table className="table table-compact w-full">
        <tbody>
          <tr>
            <td>Name</td>
            <td>{option.name}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{option.description}</td>
          </tr>
          <tr>
            <td>Duration</td>
            <td>{option.length_minutes} minutes</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>US${(option.cents_price / 100).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center m-2">
        <h5 className="font-extrabold">Available packages</h5>
      </div>
      <div className="flex">
        {option.package_options.map((packageOption) => (
          <PrivateClassPackageOptionAdminDisplay
            packageOption={packageOption}
            onEditClick={() => onEditPackageClick(packageOption)}
            key={packageOption.id}
            refresh={refreshTeacher}
          />
        ))}
      </div>
      <div className="flex justify-around m-2">
        <StandardButton onClick={() => onCreatePackageClick()}>
          Create Package
        </StandardButton>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={onModalClose}
        className="w-max h-max p-4 bg-white m-auto mt-24 border-4 border-solid border-slate-400"
      >
        <PrivateClassPackageOptionEditForm
          packageOption={selectedPackage || undefined}
          privateClassOptionId={option.id}
          refresh={refreshTeacher}
          closeModal={onModalClose}
        />
      </Modal>
    </div>
  );
};
