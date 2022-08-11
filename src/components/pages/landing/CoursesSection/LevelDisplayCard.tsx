import clsx from "clsx";
import React from "react";
import { StandardButton } from "../../../styled/Buttons";
import { LevelResponse } from "../../../types/level/response";

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
  return (
    <div
      className={clsx(
        "card",
        "m-1",
        "bg-base-100",
        "shadow-xl",
        "duration-500",
        "transition-all",
        hidden && "w-0",
        focused ? "w-full" : "w-96"
      )}
      key={level.id}
    >
      <div className="card-body">
        <h2 className="card-title">{`...${level.title}`}</h2>

        <p>{level.subtitle}</p>

        {focused && (
          <div>
            <p>{level.description}</p>
          </div>
        )}
        <div className="card-actions justify-start">
          {focused ? (
            <StandardButton
              onClick={showAllLevels}
              className="btn btn-primary p-2"
            >
              Show all levels
            </StandardButton>
          ) : (
            <StandardButton
              onClick={selectLevel}
              className="btn btn-primary p-2"
            >
              Find out more
            </StandardButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default LevelDisplayCard;
