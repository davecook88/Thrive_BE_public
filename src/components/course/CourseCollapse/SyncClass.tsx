import React from "react";
import moment from "moment";
import { parseDbTime } from "../../utils/dateMethods";
import { CourseInfoEntry } from "./CourseInfoEntry";
import { formatCourseDate } from "./index";
import { CourseMinimal } from "../../types/course/responses";

interface SyncClassProps {
  course: CourseMinimal;
}
export const SyncClass: React.FC<SyncClassProps> = ({ course }) => {
  return (
    <div className="flex p-2">
      <div className="w-1/2 px-4 py-2">
        <CourseInfoEntry
          title="Starts: "
          value={formatCourseDate(course.start_time)}
        />
        <CourseInfoEntry
          title="Ends: "
          value={formatCourseDate(course.end_time)}
        />
      </div>
      <div className="w-1/2 flex justify-center items-center  border-l-2 ">
        <CourseInfoEntry
          title="Class Time: "
          value={moment(parseDbTime(course.start_time)).format("HH:mm")}
        />
      </div>
    </div>
  );
};
