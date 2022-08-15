import React from "react";
import StripePayment from "../../../components/payment/stripe/StripePayment";
import BookCoursePage from "../../../components/pages/booking/course/BookCoursePage";
import { GetServerSideProps, GetStaticProps } from "next";
import ApiAdaptor from "../../../backend/apiAdaptor";
import { Course } from "../../../components/types/course/responses";

interface BookCourseLandingPageProps {
  course: Course;
  levelCourses: Course[];
}

const BookCourseLandingPage: React.FC<BookCourseLandingPageProps> = ({
  course,
  levelCourses,
}) => {
  return <BookCoursePage course={course} levelCourses={levelCourses} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { courseId } = context.query;
  const course = await ApiAdaptor.getCourseById(Number(courseId), {
    serverSide: true,
  });
  if (!course) return { notFound: true };
  const levelCourses = await ApiAdaptor.listLevelCourses(course.unit.level.id);

  return {
    props: { course, levelCourses }, // will be passed to the page component as props
  };
};

export default BookCourseLandingPage;
