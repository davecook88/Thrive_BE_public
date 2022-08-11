import React from "react";
import { Review } from "./types";

const ReviewDetails: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="font-bold">
          {review.body.split("\n").map((p) => (
            <p key={p} id="">{p}</p>
          ))}
        </div>
        <div className="text-right">
          <p>{review.reviewer}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
