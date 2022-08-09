import React from "react";
import { LandingPageSection, LandingPageSectionInner } from "./styled";

export const DescriptionSection = () => {
  return (
    <LandingPageSection className="w-full bg-secondary">
      <LandingPageSectionInner>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <article>
            <h2 className="text-2xl uppercase font-bold text-skin-base tracking-tight text-base-100 my-4">
              Levels Available
            </h2>
          </article>
          <article>
            <h2 className="text-2xl uppercase font-bold text-skin-base tracking-tight text-gray-900 my-4">
              Speak Spanish from the first class!
            </h2>
            <p>
              Courses designed to focus on speaking straight away. Time in class
              is optimised to keep students talking in Spanish through the
              entire class with fun and engaging activities.
            </p>
          </article>
        </div>
      </LandingPageSectionInner>
    </LandingPageSection>
  );
};
