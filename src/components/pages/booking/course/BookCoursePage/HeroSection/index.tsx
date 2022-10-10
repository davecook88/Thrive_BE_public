import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { StandardButton } from "../../../../../styled/Buttons";
import {
  HeroCourseDetailsBox,
  HeroCourseIncludesTable,
  HeroCourseTitleInner,
  HeroCourseTitleNameH1,
  HeroCourseTitleOuter,
  HeroCourseTitleSeparationLine,
  HeroCourseTitleSubtitleH2,
  HeroImageContainer,
} from "./styled";
import { BookCoursePageHeroProps } from "./types";
import Image from "next/image";

const COURSE_INCLUDES_LIST = [
  "Live classes with native speakers",
  "App with vocabulary list",
  "Videos with transcriptions",
  "Exercises to practice",
  "Feedback between classes and conversation",
];

export const BookCoursePageHero: React.FC<BookCoursePageHeroProps> = ({
  course,
  onBookNowClick,
}) => {
  const createTableRows = () =>
    COURSE_INCLUDES_LIST.map((entry) => (
      <tr className="h-12 p-4">
        <td className="w-10 text-primary">
          <FontAwesomeIcon icon={faCircleCheck} />
        </td>
        <td>{entry}</td>
      </tr>
    ));

  return (
    <section id="book-course-hero" className="container mx-auto p-8 ">
      <div
        id="book-course-hero-inner-container"
        className="grid md:grid-cols-2"
      >
        <HeroCourseTitleOuter>
          <HeroCourseTitleInner>
            <HeroCourseTitleNameH1>{course.name}</HeroCourseTitleNameH1>
            <HeroCourseTitleSeparationLine />
            <HeroCourseTitleSubtitleH2>
              Course Details
            </HeroCourseTitleSubtitleH2>
          </HeroCourseTitleInner>
          <HeroImageContainer>
            <Image src="/hero-reflect.png" layout="fill" objectFit="contain" />
          </HeroImageContainer>
        </HeroCourseTitleOuter>
        <div>
          <HeroCourseDetailsBox>
            <h3 className="py-4 text-2xl font-bold">What does it include?</h3>
            <div className="px-8 py-4">
              <HeroCourseIncludesTable>
                <tbody>{createTableRows()}</tbody>
              </HeroCourseIncludesTable>
            </div>
            <div className="p-4 text-center">
              <StandardButton
                className="btn-info px-4 text-xl"
                onClick={(e: any) => {
                  e.preventDefault();
                  onBookNowClick();
                }}
              >
                Book Now
              </StandardButton>
            </div>
          </HeroCourseDetailsBox>
        </div>
      </div>
    </section>
  );
};
