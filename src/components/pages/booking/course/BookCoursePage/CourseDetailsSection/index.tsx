import {
  faCalendarDays,
  faDollarSign,
  faPersonChalkboard,
  faUsers,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { parseDbTime } from "../../../../../utils/dateMethods";
import { BookCourseDetailsSectionProps } from "./types";

export const BookCourseDetailsSection: React.FC<
  BookCourseDetailsSectionProps
> = ({ course }) => {
  const detailsSections: {
    icon: IconDefinition;
    header: string;
    details: string | number;
  }[] = [
    {
      icon: faCalendarDays,
      header: "Starts",
      details: parseDbTime(course.start_time).toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    },
    {
      icon: faUsers,
      header: "Maximum Students",
      details: `${course.max_students} student${
        course.max_students === 1 ? "" : "s"
      }`,
    },
    {
      icon: faPersonChalkboard,
      header: "Live Classes",
      details: `${course.live_classes.length} student${
        course.live_classes.length === 1 ? "" : "s"
      }`,
    },
    {
      icon: faDollarSign,
      header: "Price",
      details:
        "US" +
        course.price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    },
  ];

  const createSections = () =>
    detailsSections.map((entry) => {
      const { icon, header, details } = entry;
      return (
        <div className="w-full">
          <div className="m-auto w-max p-4">
            <div className="text-md  m-auto flex h-12 w-12 justify-center rounded-full  bg-base-100 text-center align-middle md:h-20 md:w-20  md:text-4xl">
              <FontAwesomeIcon className=" m-auto text-primary" icon={icon} />
            </div>
            <div className="w-full p-2 text-center font-bold text-base-100">
              {header}
            </div>
            <div>
              <hr className="rounded border-2" />
            </div>
          </div>
          <div className="w-full bg-base-100 text-center">{details}</div>
        </div>
      );
    });
  return (
    <section className="grid w-full grid-cols-1 bg-primary md:grid-cols-4 md:py-8">
      {createSections()}
    </section>
  );
};
