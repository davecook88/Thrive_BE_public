import React from "react";

interface Props {
  clickHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const DeleteButton: React.FC<Props> = ({ clickHandler }) => (
  <button
    className="btn btn-error text-white btn-xs text-xs"
    onClick={(e) => {
      e.preventDefault();
      clickHandler(e);
    }}
  >
    X
  </button>
);

export const DeleteFAButton = ({ onClick }) => {
  <FontAwesomeIcon
    className="text-base-100"
    icon={faTrash}
    onClick={onDeletePackage}
  />;
};
