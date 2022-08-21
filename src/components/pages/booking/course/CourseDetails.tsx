import moment from "moment";
import React from "react";
import { Course } from "../../../types/course/responses";
import { parseDbTime } from "../../../utils/dateMethods";

interface CourseDetailsProps {
  course: Course;
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({ course }) => {
  return (
    <div className="card-body shadow rounded">
      <h2 className="card-title m-auto">{course.name}</h2>
      <p>{course.description}</p>
      <div className="text-left">
        <ul>
          <li>
            Starts:{" "}
            {moment(parseDbTime(course.start_time)).format(
              "dddd d MMM yy hh:mm A"
            )}
          </li>
          <li>Maximum students per class: {course.max_students}</li>
          <li>Live Classes: {course.live_classes.length}</li>
        </ul>
      </div>
      <div className="card-actions justify-end">
        <button className="btn btn-primary">Book Now</button>
      </div>
    </div>
  );
};
