import React from "react";
import { PrivateClassOptionsProps } from "./types";

export const PrivateClassOptionsMenu: React.FC<PrivateClassOptionsProps> = ({
  privateClassOptions,
  onSelectOption,
}) => {
  if (!privateClassOptions || privateClassOptions.length === 1) return null;
  return (
    <div className="flex flex-row">
      {privateClassOptions.map((option) => (
        <div
          key={option.id}
          onClick={() => onSelectOption(option.id)}
          className="card m-2 cursor-pointer rounded-sm border border-primary p-2 shadow-sm"
        >
          <div className="font-extrabold">{option.name}</div>
          <div>{option.description}</div>
          <div>${(option.cents_price / 100).toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
};
