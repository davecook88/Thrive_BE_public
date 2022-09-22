import React from "react";
import { CourseMinimal } from "../../types/course/responses";

interface AsyncClassProps {
  course: CourseMinimal;
}
export const AsyncClass: React.FC<AsyncClassProps> = ({ course }) => {
  return <div className="flex p-2">Async Class Info</div>;
};
