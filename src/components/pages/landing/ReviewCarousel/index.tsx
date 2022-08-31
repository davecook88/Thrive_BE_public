import React, { useEffect, useMemo, useRef, useState } from "react";
import { ReviewCarouselProps } from "./types";
import { reviews as defaultReviews } from "./reviews";
import ReviewDetails from "./ReviewDetails";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({
  reviews = defaultReviews,
}) => {
  const slicedReviews = useMemo(() => {
    const sliced = [];
    const sliceSize = 3;
    for (let i = 0; i < reviews.length; i += sliceSize) {
      sliced.push(reviews.slice(i, i + sliceSize));
    }
    return sliced;
  }, [reviews]);
  return (
    <Carousel
      autoPlay={false}
      showStatus={false}
      infiniteLoop
      showThumbs={false}
    >
      {slicedReviews.map((reviews) => (
        <div
          className="p-2 md:p-8 pb-12 md:flex"
          id={`carouse-item-${reviews[0].id}`}
          key={reviews[0].id}
        >
          {reviews.map((r) => (
            <ReviewDetails review={r} key={r.id} />
          ))}
        </div>
      ))}
    </Carousel>
  );
};

export default ReviewCarousel;
