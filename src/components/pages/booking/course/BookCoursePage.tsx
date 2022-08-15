import { GetServerSideProps } from "next";
import React, { useMemo } from "react";
import ApiAdaptor from "../../../../backend/apiAdaptor";
import { ClassScheduleTable } from "../../../course/ClassScheduleTable";
import StripePayment from "../../../payment/stripe/StripePayment";
import { Course } from "../../../types/course/responses";
import { CourseCollapse } from "../../landing/CoursesSection/CourseCollapse";
import { AlternativeCoursesSection } from "./AlternativeCoursesSection";

interface BookCoursePage {
  course: Course;
  levelCourses: Course[];
}

const BookCoursePage: React.FC<BookCoursePage> = ({ course, levelCourses }) => {
  const otherLevelCourses = useMemo(
    () => levelCourses.filter((l) => l.id !== course.id),
    [course.id, levelCourses]
  );
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="text-center text-xl ">
          <h2 className="text-center text-xl font-extrabold p-2">
            Course Details
          </h2>
          <p className="p-2">{course.description}</p>
        </div>
        <div className="p-4">
          <h2 className="text-center text-xl font-extrabold p-2">
            Live Class Schedule
          </h2>
          <p className="p-2">
            Please make sure that you will be available to take all of the live
            classes in this course.
          </p>
          <ClassScheduleTable courseClasses={course.live_classes} />
          {otherLevelCourses.length > 0 && (
            <AlternativeCoursesSection levelCourses={otherLevelCourses} />
          )}
        </div>
      </div>
      <StripePayment amount={100} coursePackage={"abc"} />;
    </section>
  );
};

export default BookCoursePage;
