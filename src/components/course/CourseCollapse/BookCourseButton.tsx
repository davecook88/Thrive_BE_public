import Link from "next/link";
import React from "react";
import { StandardButton } from "../../styled/Buttons";
import { RouteCreator } from "../../utils/routeConstants";

export const BookCourseButton: React.FC<{ courseId: number }> = ({
  courseId,
}) => {
  return (
    <button
      className="btn btn-primary p-1 min-h-1 text-m"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Link href={RouteCreator.getBookCourseRoute(courseId)}>
        Book Your Place
      </Link>
    </button>
  );
};
