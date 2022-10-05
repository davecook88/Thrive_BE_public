import React, { useState } from "react";
import { StandardButton } from "../../../../styled/Buttons";
import { PrivateClassPackageOptionAdminDisplay } from "./PrivateClassPackageOptionAdminDisplay";
import { PrivateClassOptionAdminDisplayProps } from "./types";
import Modal from "react-modal";
import { PrivateClassPackageOptionEditForm } from "./PrivateClassPackageOptionEditForm";
import ApiAdaptor from "../../../../../backend/apiAdaptor";
import { DeleteIconButton } from "../../../../common/buttons/DeleteIconButton";
import { useTeacherAdmin } from "../hooks/useTeacherAdmin";
import { useToast } from "../../../../../hooks/useToast";

export const PrivateClassOptionAdminDisplay: React.FC<
  PrivateClassOptionAdminDisplayProps
> = ({ option }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  const { refreshTeacher } = useTeacherAdmin();

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
  return (
    <div className="p-4 border border-primary rounded-sm m-2">
      <div className="flex justify-center m-2">
        <h5 className="font-extrabold">Private Class Option Details</h5>
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
            key={packageOption.id}
            refresh={refreshTeacher}
          />
        ))}
      </div>
      <div className="flex justify-around m-2">
        <StandardButton
          className="bg-error border-error"
          onClick={onDeletePrivateClassOption}
        >
          <DeleteIconButton onClick={onDeletePrivateClassOption} />
        </StandardButton>
        <StandardButton onClick={() => onCreatePackageClick()}>
          Create Package
        </StandardButton>
      </div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="w-max h-max p-4 bg-white m-auto mt-24 border-4 border-solid border-slate-400"
      >
        <PrivateClassPackageOptionEditForm
          privateClassOptionId={option.id}
          refresh={refreshTeacher}
        />
      </Modal>
    </div>
  );
};
