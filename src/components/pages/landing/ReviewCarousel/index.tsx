import React, { useEffect, useRef, useState } from "react";
import { ReviewCarouselProps } from "./types";
import { reviews as defaultReviews } from "./reviews";
import ReviewDetails from "./ReviewDetails";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({
  reviews = defaultReviews,
}) => {
  return (
    <Carousel autoPlay showStatus={false} infiniteLoop showThumbs={false}>
      {reviews.map((review) => (
        <div
          className="flex justify-center p-8 pb-12"
          id={`carouse-item-${review.id}`}
          key={review.id}
        >
          <ReviewDetails review={review} />
        </div>
      ))}
    </Carousel>
  );
};

export default ReviewCarousel;
