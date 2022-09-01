import React from "react";
import tw from "tailwind-styled-components";
import { LandingPageSection } from "../styled";
import { FeatureIcon } from "./FeatureIcon";
import {
  faMobileScreen,
  faCirclePlay,
  faPersonChalkboard,
  faPenToSquare,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";

const SectionHeader = tw.h2`
    text-3xl
    whitespace-nowrap
    mb-8
`;

const IconsGridUpper = tw.div`
    grid
    grid-cols-1
    md:grid-cols-3
`;
const IconsGridLower = tw.div`
    grid
    grid-cols-1
    md:grid-cols-2
    
`;
const DescriptionSection = () => {
  return (
    <section className="w-full ">
      <div className="w-full flex justify-center">
        <SectionHeader>Courses provide</SectionHeader>
      </div>

      <IconsGridUpper>
        <FeatureIcon
          icon={faMobileScreen}
          description="Study on the go. Just a few minutes each day and you won't forget."
          header="Vocabulary App"
        />
        <FeatureIcon
          icon={faCirclePlay}
          header="Video lessons"
          description="Pre-class videos to learn grammar and phrases before class."
        />
        <FeatureIcon
          icon={faPersonChalkboard}
          header="Live Classes"
          description="Online lessons designed to get students speaking."
        />
      </IconsGridUpper>
      <IconsGridLower>
        <FeatureIcon
          icon={faPenToSquare}
          description="Materials to help you prepare grammar outside of class."
          header="Offline Exercises"
        />
        <FeatureIcon
          icon={faPeopleGroup}
          header="Native Teachers"
          description="Friendly speakers ready to share their language and culture."
        />
      </IconsGridLower>
    </section>
  );
};

export default DescriptionSection;
