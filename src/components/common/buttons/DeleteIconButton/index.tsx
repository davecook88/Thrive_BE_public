import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IconHolder } from "./styled";
import { DeleteIconButtonProps } from "./types";

export const DeleteIconButton: React.FC<DeleteIconButtonProps> = ({
  onClick,
}) => {
  return (
    <IconHolder>
      <FontAwesomeIcon icon={faTrash} onClick={onClick} />
    </IconHolder>
  );
};
