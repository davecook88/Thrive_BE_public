import clsx from "clsx";
import React from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { UnitResponse } from "../../../types/level/response";
import { setSelectedUnit } from "../../adminSlice";

interface UnitDetailsProps {
  unit: UnitResponse;
}

export const UnitDetails: React.FC<UnitDetailsProps> = ({ unit }) => {
  const dispatch = useAppDispatch();

  return (
    <div onClick={() => dispatch(setSelectedUnit({ selectedUnit: unit }))}>
      <div
        className={clsx(
          "bg-primary ",
          "rounded",
          "shadow",
          "p-3",
          "m-1",
          "text-left",
          "text-white",
          "cursor-pointer"
        )}
      >
        <div className={clsx("w-full", "text-center", "font-bold", "text-sm")}>
          {unit.name}
        </div>
        <div className="text-xs">{unit.description}</div>
        <div className="text-xs">Courses: {unit.courses.length}</div>
      </div>
    </div>
  );
};
