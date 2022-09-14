import moment from "moment";
import React from "react";
import { CourseClassResponse } from "../../types/course/responses";
import { parseDbTime } from "../../utils/dateMethods";
import { ClassScheduleTableProps } from "./types";

export const formatCourseDate = (val: string | Date) => {
  const d = val instanceof Date ? val : parseDbTime(val);
  return moment(d).format("dddd d MMMM");
};

export const ClassScheduleTable: React.FC<ClassScheduleTableProps> = ({
  courseClasses,
}) => {
  return (
    <table className="table-compact w-full">
      <thead className="bg-info text-base-100 text-xs ">
        <tr>
          <td>Class Name</td>
          <td>Date</td>
          <td>Start Time</td>
        </tr>
      </thead>
      <tbody>
        {courseClasses.map((courseClass) => (
          <tr className=" border-b border-info text-sm" key={courseClass.id}>
            <td>{courseClass.name}</td>
            <td>{formatCourseDate(courseClass.start_time)}</td>
            <td>
              {moment(parseDbTime(courseClass.start_time)).format("hh:mm A")}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
