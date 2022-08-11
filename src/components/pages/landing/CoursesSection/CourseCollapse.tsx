import clsx from "clsx";
import React, { useState } from "react";
import {
  Course,
  CourseClass,
  CourseMinimal,
} from "../../../types/course/responses";
import { parseDbTime } from "../../../utils/dateMethods";

interface CourseCollapseProps {
  course: CourseMinimal;
}
export const CourseCollapse: React.FC<CourseCollapseProps> = ({ course }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [classes, setClasses] = useState<CourseClass[]>([]);
  return (
    <div
      className={clsx(
        "collapse collapse-arrow border border-base-300 bg-base-100 rounded-box",
        isOpen && "collapse-open"
      )}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="collapse-title ">
        <div className="text-xl font-medium p-1">{course.name}</div>
        <div>
          first class: {parseDbTime(course.start_time).toLocaleString()} last
          class: {parseDbTime(course.end_time).toLocaleString()}
        </div>
      </div>
      <div className="collapse-content">
        <p>List live class data here</p>
      </div>
    </div>
  );
};
