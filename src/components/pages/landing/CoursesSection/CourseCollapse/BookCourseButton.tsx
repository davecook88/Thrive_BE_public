import Link from "next/link";
import React from "react";
import { StandardButton } from "../../../../styled/Buttons";
import { RouteCreator } from "../../../../utils/routeConstants";

export const BookCourseButton: React.FC<{ courseId: number }> = ({
  courseId,
}) => {
  return (
    <button
      className="btn btn-primary p-0.5 min-h-1 text-xs"
      onClick={(e) => {
        e.preventDefault();
        e.bubbles = false;
      }}
    >
      <Link href={RouteCreator.getBookCourseRoute(courseId)}>
        Book Your Place
      </Link>
    </button>
  );
};
