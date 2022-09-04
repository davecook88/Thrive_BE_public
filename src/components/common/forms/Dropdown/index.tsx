import React from "react";
import { DropdownOptions } from "./types";

const Dropdown: React.FC<DropdownOptions> = ({
  onChange,
  options,
  defaultOption,
  value,
}) => {
  return (
    <div className="p-4">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select select-secondary w-full max-w-xs "
      >
        {defaultOption && (
          <option disabled value={0}>
            {defaultOption}
          </option>
        )}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Dropdown;
