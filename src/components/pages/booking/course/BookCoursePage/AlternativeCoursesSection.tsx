import React from "react";
import { Course } from "../../../../types/course/responses";
import { CourseCollapse } from "../../../landing/CoursesSection/CourseCollapse";

interface AlternativeCoursesSectionProps {
  levelCourses: Course[];
}
export const AlternativeCoursesSection: React.FC<
  AlternativeCoursesSectionProps
> = ({ levelCourses }) => {
  return (
    <div>
      <p className="p-2">
        If these course times are not convenient for you, here are some
        alternative schedules for this level.
      </p>
      {levelCourses.map((levelCourse) => (
        <CourseCollapse course={levelCourse} key={levelCourse.id} />
      ))}
    </div>
  );
};
