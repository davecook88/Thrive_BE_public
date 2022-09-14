import React from "react";
import { ClassScheduleTable } from "../../../../course/ClassScheduleTable";
import {
  Course,
  CourseClassResponse,
} from "../../../../types/course/responses";

import { AlternativeCoursesSection } from "./AlternativeCoursesSection";

interface LiveClassScheduleSectionProps {
  courseClasses: CourseClassResponse[];
  otherLevelCourses: Course[];
}

export const LiveClassScheduleSection: React.FC<
  LiveClassScheduleSectionProps
> = ({ courseClasses, otherLevelCourses }) => {
  return (
    <div className="p-4">
      <h2 className="text-center text-xl font-extrabold p-2">
        Live Class Schedule
      </h2>
      <p className="p-2">
        Please make sure that you will be available to take all of the live
        classes in this course.
      </p>
      <ClassScheduleTable courseClasses={courseClasses} />
      {otherLevelCourses.length > 0 && (
        <AlternativeCoursesSection levelCourses={otherLevelCourses} />
      )}
    </div>
  );
};
