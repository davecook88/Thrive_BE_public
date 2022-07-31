import React from "react";

interface Props {
  height?: string;
  clickHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const EditButton: React.FC<Props> = ({ clickHandler, height }) => (
  <button
    className="btn btn-secondary text-white btn-sm"
    onClick={(e) => {
      e.preventDefault();
      clickHandler(e);
    }}
  >
    <img height={height} src="/svg/edit-pencil.svg" alt="edit" />
  </button>
);
