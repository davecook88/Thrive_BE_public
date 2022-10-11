import clsx from "clsx";
import React, { useMemo } from "react";
import { StandardButton } from "../../../styled/Buttons";
import { CourseMinimal } from "../../../types/course/responses";
import { LevelResponse } from "../../../types/level/response";
import { CourseCollapse } from "../../../course/CourseCollapse";

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
        "md:m-1",
        "border",
        "border-info",
        "bg-base-100",
        "shadow-xl",
        "mx-auto",
        "md:mx-none",
        "my-2",
        "border-t-6",
        focused ? "w-5/6 h-max flex-grow" : "w-0 flex-shrink",
        hidden ? "w-1 h-2 opacity-0 border-0" : "h-min w-4/6 md:w-2/6",

        "duration-500",
        "transition-all"
      )}
      key={level.id}
    >
      <div className={clsx("card-body", hidden ? "w-0 p-0 " : "h-max")}>
        <div className="flex justify-center bg-primary">
          <h2 className="card-title font-extrabold text-base-100 left-50">{`...${level.title}`}</h2>{" "}
          {focused && (
            <StandardButton
              onClick={showAllLevels}
              className="btn btn-info bg-neutral border-none text-base-100 hover:bg-neutral/90 py-0.5 text-xs ml-auto"
            >
              Show all levels
            </StandardButton>
          )}
        </div>

        {!focused && <p>{level.subtitle}</p>}

        {focused && (
          <div>
            <p className="p-2 text-center">{level.description}</p>
            {allCourses.map((c) => (
              <CourseCollapse course={c} showBookNowButton={true} />
            ))}
          </div>
        )}

        {!hidden && !focused && (
          <div className="card-actions justify-start mt-4">
            <StandardButton
              onClick={selectLevel}
              className="btn btn-info text-base-100 hover:text-info hover:bg-base-100 p-2"
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
