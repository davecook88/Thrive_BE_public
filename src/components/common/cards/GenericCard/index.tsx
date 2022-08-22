import React from "react";
import { GenericCardHolder } from "./styled";
import { GenericCardProps } from "./types";

export const GenericCard: React.FC<GenericCardProps> = ({
  children,
  className,
}) => {
  return (
    <GenericCardHolder $className={className}>
      <div className="card-body">{children}</div>
    </GenericCardHolder>
  );
};
