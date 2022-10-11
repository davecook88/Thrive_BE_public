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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { ClassScheduleTable } from "../ClassScheduleTable";
import { BookCourseButton } from "./BookCourseButton";
import { CourseInfoEntry } from "./CourseInfoEntry";
import { CourseCollapseProps } from "./types";
import { SyncClass } from "./SyncClass";
import { AsyncClass } from "./AsyncClass";

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
        "collapse collapse-close border border-base-300 bg-base-100 rounded-box mb-2",

        isOpen && "collapse-open"
      )}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className="p-2 border-t-8 border-primary/50 grid items-center justify-center sm:justify-evenly">
        <div className="flex flex-col border-t-6 border-primary w-full col-span-2">
          <div className="flex items-center justify-between w-full border-t-2 border-b-2">
            <div className="font-medium text-primary font-bold p-1 px-1 pr-2 text-center max-w-fit sm:w-1/3">
              {course.name}
            </div>
            <div className="font-bold sm:w-1/3 text-center px-2 py-1 sm:px-8 sm:py-4 border-l-2 border-r-2">
              Online
            </div>
            <div className="font-bold sm:w-1/3 p-1 pl-2 text-center h-full">
              300 hours
            </div>
          </div>
          {course.start_time ? (
            <SyncClass course={course} />
          ) : (
            <AsyncClass course={course} />
          )}
        </div>
        <div className="mx-auto self-center col-start-1 sm:col-start-1 sm:col-span-2">
          <button
            className="btn p-1 min-h-1 text-xs px-2 text-info bg-base-100 border-info hover:bg-opacity-5"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
          >
            <FontAwesomeIcon icon={faCalendarDays} className="pr-2" /> Show
            Schedule
          </button>
        </div>
        <div className="mx-auto col-start-2 sm:col-start-3 row-start-2 sm:row-start-1">
          {showBookNowButton && <BookCourseButton courseId={course.id} />}
        </div>
      </div>
      <div className="collapse-content">
        {course.start_time && <ClassScheduleTable courseClasses={classes} />}
      </div>
    </div>
  );
};
