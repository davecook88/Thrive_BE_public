import React from "react";
import { DropdownOptions } from "./types";

const Dropdown: React.FC<DropdownOptions> = ({
  onChange,
  options,
  value,
  register,
  name,
  rules,
}) => {
  const registered = register && name ? register(name, rules) : null;
  const changeHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    debugger;
    if (registered?.onChange(e)) {
      registered.onChange(e);
      return;
    }
    if (onChange) onChange(e.target.value);
  };
  return (
    <div className="p-4">
      <select
        value={value || undefined}
        onChange={changeHandler}
        className="select select-secondary w-full max-w-xs "
        {...(registered && registered)}
      >
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
            onClick={() => onChange && onChange(option.id)}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Dropdown;
