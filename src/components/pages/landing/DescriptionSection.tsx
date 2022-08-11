import React from "react";
import { StandardButton } from "../../styled/Buttons";
import ReviewCarousel from "./ReviewCarousel";
import { LandingPageSection, LandingPageSectionInner } from "./styled";

export const DescriptionSection = () => {
  return (
    <LandingPageSection className="w-full bg-secondary">
      <LandingPageSectionInner>
        <div className="flex ">
          <article className="md:w-3/6">
            <h2 className="text-2xl text-center uppercase font-bold text-skin-base tracking-tight text-gray-900 my-4">
              What my students say
            </h2>
            <ReviewCarousel />
          </article>
          <article className="md:w-3/6">
            <h2 className="text-2xl text-center md:text-right uppercase font-bold text-skin-base tracking-tight text-gray-900 my-4">
              Speak Spanish from the first class!
            </h2>
            <p className="text-center md:text-right p-2">
              Courses designed to focus on speaking straight away. Time in class
              is optimised to keep students talking in Spanish through the
              entire class with fun and engaging activities.
            </p>
            <p className="text-center md:text-right p-2">
              Study vocabulary and grammar outside of class so that 100% of your
              precious class time is spent SPEAKING SPANISH. With additional
              video activities between classes to keep your practicing.
            </p>
            <div className="p-4 flex ">
              <StandardButton className="w-full bg-base-100 text-neutral hover:text-base-100">
                <a href={process.env.NEXT_PUBLIC_CALENDLY_LINK} target="_blank">
                  Book a call to find your level
                </a>
              </StandardButton>
            </div>
          </article>
        </div>
      </LandingPageSectionInner>
    </LandingPageSection>
  );
};
