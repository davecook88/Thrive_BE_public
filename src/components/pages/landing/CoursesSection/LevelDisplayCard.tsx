import clsx from "clsx";
import React, { useMemo } from "react";
import { StandardButton } from "../../../styled/Buttons";
import { CourseMinimal } from "../../../types/course/responses";
import { LevelResponse } from "../../../types/level/response";
import { CourseCollapse } from "./CourseCollapse";

interface LevelDisplayCardProps {
  level: LevelResponse;
  hidden: boolean;
  focused: boolean;
  selectLevel: () => void;
  showAllLevels: () => void;
}

const LevelDisplayCard: React.FC<LevelDisplayCardProps> = ({
  level,
  hidden,
  focused,
  showAllLevels,
  selectLevel,
}) => {
  const allCourses = useMemo(
    () =>
      level.units.reduce(
        (acc, unit) => [...acc, ...unit.courses],
        [] as CourseMinimal[]
      ),
    [level]
  );
  return (
    <div
      className={clsx(
        "card",
        "m-1",
        "border",
        "border-info",
        "bg-base-100",
        "shadow-xl",

        "w-2/6",

        hidden ? "w-1 h-2 opacity-0 border-0" : "h-min ",
        focused ? "w-5/6 h-max" : "w-max",
        "duration-300",
        "transition-width"
      )}
      key={level.id}
    >
      <div className={clsx("card-body", hidden ? "w-0 p-0 " : "h-max")}>
        <div className="flex justify-between">
          <h2 className="card-title font-extrabold">{`...${level.title}`}</h2>{" "}
          {focused && (
            <StandardButton
              onClick={showAllLevels}
              className="btn btn-info p-2 py-1 text-xs"
            >
              Show all levels
            </StandardButton>
          )}
        </div>

        <p>{level.subtitle}</p>

        {focused && (
          <div>
            <hr className="border-t-info" />
            <p className="text-sm p-2">{level.description}</p>
            <h3 className="p-2 font-extrabold">Upcoming Courses</h3>
            {allCourses.map((c) => (
              <CourseCollapse course={c} />
            ))}
          </div>
        )}

        {!hidden && !focused && (
          <div className="card-actions justify-start">
            <StandardButton
              onClick={selectLevel}
              className="btn btn-primary p-2"
            >
              Find out more
            </StandardButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelDisplayCard;
