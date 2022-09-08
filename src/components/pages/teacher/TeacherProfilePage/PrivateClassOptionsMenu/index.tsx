import React from "react";
import { PrivateClassOptionsProps } from "./types";

export const PrivateClassOptionsMenu: React.FC<PrivateClassOptionsProps> = ({
  privateClassOptions,
  onSelectOption,
}) => {
  if (!privateClassOptions || privateClassOptions.length === 1) return null;
  return (
    <div>
      {privateClassOptions.map((option) => (
        <div
          key={option.id}
          onClick={() => onSelectOption(option.id)}
          className="card border border-primary rounded-sm shadow-sm"
        >
          <div>{option.name}</div>
          <div>{option.description}</div>
          <div>${option.cents_price.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
};
