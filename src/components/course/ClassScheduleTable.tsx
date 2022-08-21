import moment from "moment";
import React from "react";
import { CourseClassResponse } from "../types/course/responses";
import { parseDbTime } from "../utils/dateMethods";

export const formatCourseDate = (val: string | Date) => {
  const d = val instanceof Date ? val : parseDbTime(val);
  return moment(d).format("dddd d MMMM");
};

interface ClassScheduleTableProps {
  courseClasses: CourseClassResponse[];
}

export const ClassScheduleTable: React.FC<ClassScheduleTableProps> = ({
  courseClasses,
}) => {
  return (
    <table className="table-compact w-full">
      <thead className="bg-secondary text-base-100 ">
        <tr>
          <td>Class Name</td>
          <td>Date</td>
          <td>Start Time</td>
        </tr>
      </thead>
      <tbody>
        {courseClasses.map((courseClass) => (
          <tr className=" border-b border-secondary" key={courseClass.id}>
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
