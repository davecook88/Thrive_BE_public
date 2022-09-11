import React, { useEffect, useMemo, useRef, useState } from "react";
import { ReviewCarouselProps } from "./types";
import { reviews as defaultReviews } from "./reviews";
import ReviewDetails from "./ReviewDetails";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({
  reviews = defaultReviews,
}) => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener("resize", handleResize);
      console.log("window width:", window.innerWidth);
      return () => window.removeEventListener("resize", handleResize);
    }
  });

  const slicedReviews = useMemo(() => {
    const sliced = [];
    let sliceSize;
    if (!windowSize) sliceSize = 3;
    sliceSize = windowSize.width > 768 ? 3 : 1;
    for (let i = 0; i < reviews.length; i += sliceSize) {
      sliced.push(reviews.slice(i, i + sliceSize));
    }
    return sliced;
  }, [reviews, windowSize]);
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
