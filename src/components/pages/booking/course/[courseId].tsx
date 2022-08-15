import { GetServerSideProps } from "next";
import React, { FC } from "react";
import ApiAdaptor from "../../../../backend/apiAdaptor";
import StripePayment from "../../../payment/stripe/StripePayment";
import { Course } from "../../../types/course/responses";

interface BookCoursePage {
  course: Course;
}

const BookCoursePage: FC<BookCoursePage> = ({ course }) => {
  return (
    <div>
      <div>{JSON.stringify(course)}</div>
      <StripePayment amount={100} coursePackage={"abc"} />;
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { courseId } = context.query;
  const course = await ApiAdaptor.getCourseById(Number(courseId), {
    serverSide: true,
  });
  console.log(course);
  if (!course) return { notFound: true };

  return {
    props: { course }, // will be passed to the page component as props
  };
};

export default BookCoursePage;
