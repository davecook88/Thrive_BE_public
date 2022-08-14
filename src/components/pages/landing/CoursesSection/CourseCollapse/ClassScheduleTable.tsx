import moment from "moment";
import React from "react";
import { formatCourseDate } from ".";
import { CourseClassResponse } from "../../../../types/course/responses";

interface ClassScheduleTableProps {
  courseClasses: CourseClassResponse[];
}

export const ClassScheduleTable: React.FC<ClassScheduleTableProps> = ({
  courseClasses,
}) => {
  return (
    <table className="table">
      <thead className="text-center">
        <tr>
          <td>Class Name</td>
          <td>Date</td>
          <td>Start Time</td>
        </tr>
      </thead>
      <tbody>
        {courseClasses.map((courseClass) => (
          <tr>
            <td>{courseClass.name}</td>
            <td>{formatCourseDate(courseClass.start_time)}</td>
            <td>{moment(courseClass.start_time).format("HH:mm")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
