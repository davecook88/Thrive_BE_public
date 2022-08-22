import React from "react";

export interface GenericCardProps {
  children?: React.Node | React.Node[];
  className?: string;
}

export interface StyledGenericCardProps {
  $className?: string;
}
