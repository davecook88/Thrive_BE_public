import { MutableRefObject } from "react";
import { Course } from "../../../../../types/course/responses";

export type BookCoursePaymentFormProps = {
  course: Course;
  paymentSectionRef: MutableRefObject;
};
