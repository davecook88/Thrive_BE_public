import React from "react";
import tw from "tailwind-styled-components";
import { ClassLengthSelectProps } from "./types";

const RadioInput = tw.input`
    radio
    checked:bg-primary
`;

export const ClassLengthSelect: React.FC<ClassLengthSelectProps> = ({
  selectedClassLength,
  onSelectClassLength,
  classLengthOptions,
}) => {
  return (
    <div>
      <div className="flex justify-center">
        <h4 className="font-extrabold">Select your class length</h4>
      </div>
      <div className="flex justify-around">
        {classLengthOptions.map((classLength) => (
          <label className="label cursor-pointer" key={classLength}>
            <span className="label-text font-bold m-4">
              {classLength} Minutes
            </span>
            <RadioInput
              type="radio"
              value={classLength}
              name="radio-6"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onSelectClassLength(Number(e.target.value))
              }
              checked={classLength === selectedClassLength}
            />
          </label>
        ))}
      </div>
    </div>
  );
};
