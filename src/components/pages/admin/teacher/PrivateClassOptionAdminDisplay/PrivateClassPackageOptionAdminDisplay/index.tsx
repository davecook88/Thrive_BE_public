import React from "react";
import { PrivateClassPackageOptionAdminDisplayProps } from "./types";

export const PrivateClassPackageOptionAdminDisplay: React.FC<
  PrivateClassPackageOptionAdminDisplayProps
> = ({ packageOption }) => {
  return (
    <div>
      <div>Classes: {packageOption.class_count}</div>
      <div>Discount: {packageOption.discount_percentage}%</div>
    </div>
  );
};
