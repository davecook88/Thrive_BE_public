import clsx from "clsx";
import moment from "moment";
import React, { useEffect, useState } from "react";
import ApiAdaptor from "../../../backend/apiAdaptor";
import {
  Course,
  CourseClass,
  CourseClassResponse,
  CourseMinimal,
} from "../../types/course/responses";
import { parseDbTime } from "../../utils/dateMethods";
import { ClassScheduleTable } from "../ClassSheduleTable";
import { BookCourseButton } from "./BookCourseButton";
import { CourseInfoEntry } from "./CourseInfoEntry";
import { CourseCollapseProps } from "./types";

export const formatCourseDate = (val: string | Date) => {
  const d = val instanceof Date ? val : parseDbTime(val);
  return moment(d).format("dddd d MMMM");
};

export const CourseCollapse: React.FC<CourseCollapseProps> = ({
  course,
  showBookNowButton,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [classes, setClasses] = useState<CourseClassResponse[]>([]);

  useEffect(() => {
    ApiAdaptor.getCourseById(course.id).then((course: Course) => {
      const classes: CourseClassResponse[] = course.live_classes.map((c) => ({
        ...c,
      }));
      setClasses(classes);
    });
  }, [course]);

  return (
    <div
      className={clsx(
        "collapse collapse-arrow border border-base-300 bg-base-100 rounded-box",
        isOpen && "collapse-open"
      )}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="collapse-title ">
        <div className=" p-1 flex  w-full">
          <div className="font-medium">{course.name}</div>
          <CourseInfoEntry
            title="Class Time "
            value={moment(parseDbTime(course.start_time)).format("HH:mm")}
          />
          <CourseInfoEntry
            title="Starts "
            value={formatCourseDate(course.start_time)}
          />
          <CourseInfoEntry
            title="Ends "
            value={formatCourseDate(course.end_time)}
          />
          {showBookNowButton && <BookCourseButton courseId={course.id} />}
        </div>
      </div>
      <div className="collapse-content">
        <p>List live class data here</p>
        <ClassScheduleTable courseClasses={classes} />
      </div>
    </div>
  );
};
