import React, { useEffect, useState } from "react";
import ApiAdaptor from "../../../../backend/apiAdaptor";
import { StandardButton } from "../../../styled/Buttons";
import { Course } from "../../../types/course/responses";
import { LevelResponse } from "../../../types/level/response";
import { LandingPageSection, LandingPageSectionInner } from "../styled";

const CoursesSection = () => {
  const [levels, setLevels] = useState<LevelResponse[]>([]);

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
        <div className="flex justify-between">
          {levels.map((level) => (
            <div className="card w-96 bg-base-100 shadow-xl" key={level.id}>
              <div className="card-body">
                <h2 className="card-title">{level.title}</h2>
                <p>{level.subtitle}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Find out more</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LandingPageSection>
  );
};

export default CoursesSection;
