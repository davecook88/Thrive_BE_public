import clsx from "clsx";
import React from "react";
import tw from "tailwind-styled-components";
import ApiAdaptor from "../../../../../../../backend/apiAdaptor";
import { DeleteIconButton } from "../../../../../../common/buttons/DeleteIconButton";
import { EditIconButton } from "../../../../../../common/buttons/EditIconButton";
import { PrivateClassPackageOptionAdminDisplayProps } from "./types";

const IconHolder = tw.div`
    flex
    justify-center
    h-100
    p-2
    cursor-pointer
`;

export const PrivateClassPackageOptionAdminDisplay: React.FC<
  PrivateClassPackageOptionAdminDisplayProps
> = ({ packageOption, refresh, onEditClick }) => {
  const onDeletePackage = async () => {
    ApiAdaptor.deletePrivateClassPackage(packageOption.id);
    refresh();
  };
  return (
    <div className="m-2 rounded-sm bg-primary text-base-100 p-2 text-xs flex">
      <IconHolder>
        <DeleteIconButton onClick={onDeletePackage} />
      </IconHolder>
      <div className="ml-2">
        <div>Classes: {packageOption.class_count}</div>
        <div>Discount: {packageOption.discount_percentage * 100}%</div>{" "}
        <div>
          <div
            className={clsx(
              "badge mx-2",
              "m-2",
              "cursor-pointer",
              packageOption.active ? "badge-info" : "badge-neutral"
            )}
          >
            {packageOption.active ? "active" : "inactive"}
          </div>
        </div>
      </div>
      <IconHolder>
        <EditIconButton onClick={onEditClick} />
      </IconHolder>
    </div>
  );
};
