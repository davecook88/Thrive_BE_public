import React from "react";
import { StandardButton } from "../../styled/Buttons";
import ReviewCarousel from "./ReviewCarousel";
import { LandingPageSection, LandingPageSectionInner } from "./styled";

const ReviewSection = () => {
  return (
    <section>
      <h2 className="text-2xl text-center uppercase font-bold text-skin-base tracking-tight text-gray-900 my-4">
        What my students say
      </h2>
      <ReviewCarousel />
    </section>
  );
};
export default ReviewSection;
