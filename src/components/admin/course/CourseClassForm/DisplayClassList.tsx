import React from "react";
import { BorderedSection } from "../../../styled/Containers";
import {
  CourseClass,
  CourseClassResponse,
} from "../../../types/course/responses";
import { CourseClassDetails } from "./CourseClassDetails";

interface DisplayClassListProps {
  courseClasses: CourseClassResponse[];
}

export const DisplayClassList: React.FC<DisplayClassListProps> = ({
  courseClasses = [],
}) => {
  return (
    <div className="p-4 w-full">
      <BorderedSection>
        <h2 className="uppercase text-lg font-bold">Live Classes</h2>
        <div className="flex flex-wrap">
          {courseClasses.length ? (
            courseClasses.map((c) => (
              <CourseClassDetails key={c.id} courseClass={c} />
            ))
          ) : (
            <div></div>
          )}
        </div>
      </BorderedSection>
    </div>
  );
};
