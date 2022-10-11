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
    <div className="flex flex-col sm:flex-row sm:justify-evenly py-1">
      <div className="px-4 sm:py-2 mx-auto sm:mx-0 sm:w-2/3">
        <table className="border-separate">
          <tbody>
            <CourseInfoEntry
              title="Starts: "
              value={formatCourseDate(course.start_time)}
            />
            <CourseInfoEntry
              title="Ends: "
              value={formatCourseDate(course.end_time)}
            />
          </tbody>
        </table>
      </div>
      <div className="m-auto py-1">
        <CourseInfoEntry
          title="Class Time: "
          value={moment(parseDbTime(course.start_time)).format("HH:mm")}
        />
      </div>
    </div>
  );
};
