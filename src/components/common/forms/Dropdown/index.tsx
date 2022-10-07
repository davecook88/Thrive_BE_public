import React from "react";
import { DropdownOptions } from "./types";

const Dropdown: React.FC<DropdownOptions> = ({
  onChange,
  options,
  defaultOption,
  value,
  register,
  name,
  rules,
}) => {
  const registered = register && name ? register(name, rules) : null;
  return (
    <div className="p-4">
      <select
        value={value || undefined}
        onChange={(e) =>
          onChange ? onChange(e.target.value) : registered?.onChange(e)
        }
        className="select select-secondary w-full max-w-xs "
        {...(registered && registered)}
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
