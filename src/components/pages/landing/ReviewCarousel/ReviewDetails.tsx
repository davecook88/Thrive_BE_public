import React from "react";
import { Review } from "./types";

const Star = () => <div className="text-[#F9B501] mx-0.5"> &#9733;</div>;

const ReviewDetails: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="card  bg-base-100 drop-shadow-lg rounded-sm w-5/6 md:w-2/3 md:m-4 m-auto my-4">
      <div className="card-body my-1">
        <div className="flex w-full justify-center mb-2">
          <div className="flex">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
        </div>
        <div className="font-light ">
          {review.body.split("\n").map((p) => (
            <p key={p} id="">
              {p}
            </p>
          ))}
        </div>
      </div>
      <div className="card-actions justify-end mx-10 mb-4">
        <div className="text-right font-bold">
          <p>{review.reviewer}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
