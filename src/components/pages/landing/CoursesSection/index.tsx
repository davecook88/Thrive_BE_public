import React, { useEffect, useState } from "react";
import ApiAdaptor from "../../../../backend/apiAdaptor";
import { StandardButton } from "../../../styled/Buttons";
import { Course } from "../../../types/course/responses";
import { LevelResponse } from "../../../types/level/response";
import { LandingPageSection, LandingPageSectionInner } from "../styled";
import LevelDisplayCard from "./LevelDisplayCard";

const CoursesSection = () => {
  const [levels, setLevels] = useState<LevelResponse[]>([]);
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);

  useEffect(() => {
    ApiAdaptor.listLevels({ page: 0 }).then(setLevels);
  }, []);

  return (
    <LandingPageSection className="w-full">
      <div className="w-full">
        <div className="w-full">
          <h2 className="text-2xl text-center uppercase text-skin-base font-extrabold tracking-tight text-gray-900 my-4">
            I want to...{" "}
          </h2>
        </div>
        <div className="md:flex md:justify-between">
          {levels.map((level) => (
            <LevelDisplayCard
              level={level}
              hidden={selectedLevelId ? selectedLevelId !== level.id : false}
              focused={selectedLevelId === level.id}
              selectLevel={() => setSelectedLevelId(level.id)}
              showAllLevels={() => setSelectedLevelId(null)}
            />
          ))}
        </div>
      </div>
    </LandingPageSection>
  );
};

export default CoursesSection;
