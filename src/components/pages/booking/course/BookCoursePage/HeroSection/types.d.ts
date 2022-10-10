import { Course } from "../../../../../types/course/responses";

export type BookCoursePageHeroProps = {
  course: Course;
  onBookNowClick: () => void;
};
