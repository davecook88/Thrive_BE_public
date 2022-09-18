import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import tw from "tailwind-styled-components";
import ApiAdaptor from "../../../../../../backend/apiAdaptor";
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
> = ({ packageOption, refresh }) => {
  const onDeletePackage = async () => {
    ApiAdaptor.deletePrivateClassPackage(packageOption.id);
    refresh();
  };
  return (
    <div className="m-2 rounded-sm bg-primary text-base-100 p-2 text-xs flex">
      <IconHolder>
        <FontAwesomeIcon
          className="text-base-100"
          icon={faTrash}
          onClick={onDeletePackage}
        />
      </IconHolder>
      <div className="ml-2">
        <div>Classes: {packageOption.class_count}</div>
        <div>Discount: {packageOption.discount_percentage * 100}%</div>
      </div>
    </div>
  );
};
