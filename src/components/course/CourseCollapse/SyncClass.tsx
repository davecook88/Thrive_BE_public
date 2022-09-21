import React from "react";
import moment from "moment";
import { parseDbTime } from "../../utils/dateMethods";
import { CourseInfoEntry } from "./CourseInfoEntry";
import { formatCourseDate } from "./index";

interface SyncClassProps {
  start_time: string;
  end_time: string;
}
export const SyncClass: React.FC<SyncClassProps> = ({
  start_time,
  end_time,
}) => {
  return (
    <div className="flex p-2">
      <div className="w-1/2 px-4 py-2">
        <CourseInfoEntry
          title="Starts: "
          value={formatCourseDate(start_time)}
        />
        <CourseInfoEntry title="Ends: " value={formatCourseDate(end_time)} />
      </div>
      <div className="w-1/2 flex justify-center items-center  border-l-2 ">
        <CourseInfoEntry
          title="Class Time: "
          value={moment(parseDbTime(start_time)).format("HH:mm")}
        />
      </div>
    </div>
  );
};
