import React from "react";

interface InputSliderProps {
  min?: number;
  max?: number;
  value: number;
  onChange: (val: number) => void;
  title: string;
  valueNames?: { [key: string]: string };
}
const InputSlider: React.FC<InputSliderProps> = ({
  min = 0,
  max = 10,
  value,
  title,
  valueNames = {},
  onChange,
}) => {
  return (
    <div>
      <label className="label">
        <span className="label-text uppercase text-sm ">{title}</span>
        <span className="label-text-alt">{valueNames[value] || value}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range range-sm range-secondary"
        step={1}
      />
    </div>
  );
};

export default InputSlider;
