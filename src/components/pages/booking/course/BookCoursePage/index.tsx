import React, { useRef } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import { StandardButton } from "../../../../styled/Buttons";
import { Course } from "../../../../types/course/responses";
import { BookCoursePageHero } from "./HeroSection";
import { BookCourseDetailsSection } from "./CourseDetailsSection";
import { BookCoursePageBookNowFlow } from "./BookNowFlow";
import { BookCoursePaymentForm } from "./PaymentForm";
import { selectUser } from "../../../../redux/reducers/user/userSlice";

interface BookCoursePage {
  course: Course;
  levelCourses: Course[];
}

const BookCoursePage: React.FC<BookCoursePage> = ({ course, levelCourses }) => {
  const { user } = useAppSelector(selectUser);
  const paymentFormRef = useRef<HTMLDivElement>();
  const onHeroCTAClick = () => {
    if (!paymentFormRef.current) return;
    paymentFormRef.current.scrollIntoView();
  };

  return (
    <>
      <BookCoursePageHero course={course} onBookNowClick={onHeroCTAClick} />
      <BookCourseDetailsSection course={course} />
      <BookCoursePageBookNowFlow />
      <BookCoursePaymentForm
        course={course}
        paymentSectionRef={paymentFormRef}
      />
    </>
  );
};

export default BookCoursePage;
