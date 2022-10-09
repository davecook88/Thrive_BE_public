import React, { useMemo, useState } from "react";
import tw from "tailwind-styled-components";
import { selectUser } from "../../../../../auth/userSlice";
import StripePayment from "../../../../payment/stripe/StripePayment";
import { useAppSelector } from "../../../../redux/hooks";
import { StandardButton } from "../../../../styled/Buttons";
import { Course } from "../../../../types/course/responses";
import { CourseDetails } from "./CourseDetails";
import { EnterStudentDetails } from "./EnterStudentDetails";
import { StudentDetailsSection } from "./StudentDetailsSection";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { BookCoursePageHero } from "./HeroSection";
import { BookCourseDetailsSection } from "./CourseDetailsSection";
import { BookCoursePageBookNowFlow } from "./BookNowFlow";
import { BookCoursePaymentForm } from "./PaymentForm";

interface BookCoursePage {
  course: Course;
  levelCourses: Course[];
}

const BookCoursePage: React.FC<BookCoursePage> = ({ course, levelCourses }) => {
  const { user, googleProfile } = useAppSelector(selectUser);

  const onHeroCTAClick = () => {};

  return (
    <>
      <BookCoursePageHero course={course} onBookNowClick={onHeroCTAClick} />
      <BookCourseDetailsSection course={course} />
      <BookCoursePageBookNowFlow />
      <BookCoursePaymentForm course={course} />
      <section>
        <div className="grid grid-cols-1">
          <div className="text-center text-xl ">
            <h2 className="p-2 text-center text-xl font-extrabold">
              Course Details
            </h2>
            <div className="p-4">
              <CourseDetails course={course} />
            </div>
            <div>
              {user ? (
                <StudentDetailsSection user={user} />
              ) : (
                <EnterStudentDetails />
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <StandardButton>Book Now</StandardButton>
        </div>
      </section>
    </>
  );
};

export default BookCoursePage;
