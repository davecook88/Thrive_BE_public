import React from "react";

interface DropdownOptions {
  onChange: (val: string | number) => void;
  options: { id: string | number; name: string }[];
  defaultOption?: string;
  value: string | number;
}

const Dropdown: React.FC<DropdownOptions> = ({
  onChange,
  options,
  defaultOption,
  value,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="select select-secondary w-full max-w-xs"
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
  );
};
export default Dropdown;
