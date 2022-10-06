import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IconHolder } from "./styled";
import { EditIconButtonProps } from "./types";

export const EditIconButton: React.FC<EditIconButtonProps> = ({ onClick }) => {
  return (
    <IconHolder>
      <FontAwesomeIcon icon={faPenToSquare} onClick={onClick} />
    </IconHolder>
  );
};
