import clsx from "clsx";
import React from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { CourseClassResponse } from "../../../types/course/responses";
import { parseDbTime } from "../../../utils/dateMethods";
import { setSelectedCourseClass } from "../../adminSlice";

interface CourseClassDetailsProps {
  courseClass: CourseClassResponse;
}

export const CourseClassDetails: React.FC<CourseClassDetailsProps> = ({
  courseClass,
}) => {
  const dispatch = useAppDispatch();
  const startTime = parseDbTime(courseClass.start_time);
  const endTime = parseDbTime(courseClass.end_time);
  const futureCourse = new Date().getTime() < startTime.getTime();
  return (
    <div
      onClick={() =>
        dispatch(setSelectedCourseClass({ selectedCourseClass: courseClass }))
      }
    >
      <div
        className={clsx(
          futureCourse ? "bg-primary " : "bg-neutral ",
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
          {courseClass.name}
        </div>
        <div className="text-xs">
          {startTime.toLocaleString()} - {endTime.toLocaleString()}
        </div>
      </div>
    </div>
  );
};
