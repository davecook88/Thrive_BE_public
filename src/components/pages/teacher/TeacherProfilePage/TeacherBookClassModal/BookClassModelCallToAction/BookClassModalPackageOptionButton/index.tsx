import React from "react";
import { BookClassModalPackageOptionButtonProps } from "./types";

export const BookClassModalPackageOptionButton: React.FC<
  BookClassModalPackageOptionButtonProps
> = ({ packageOption, classPrice }) => {
  const clickHandler = () => {};

  return (
    <div
      className="m-2 rounded-sm bg-primary text-base-100 p-4 cursor-pointer"
      onClick={clickHandler}
    >
      <div>
        Book {packageOption.class_count} classes and get a{" "}
        {packageOption.discount_percentage * 100}% discount.
      </div>
      <div className="text-center font-extrabold">
        $
        {(
          (classPrice *
            packageOption.class_count *
            (1 - packageOption.discount_percentage)) /
          100
        ).toFixed(2)}
      </div>
    </div>
  );
};
