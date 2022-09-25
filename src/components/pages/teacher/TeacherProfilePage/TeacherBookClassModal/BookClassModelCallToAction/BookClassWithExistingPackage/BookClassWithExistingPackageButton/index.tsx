import React from "react";
import { StandardButton } from "../../../../../../../styled/Buttons";
import { BookClassWithExistingPackageButtonProps } from "./types";

export const BookClassWithExistingPackageButton: React.FC<
  BookClassWithExistingPackageButtonProps
> = ({ booking, clickHandler }) => {
  return (
    <StandardButton className="m-2" onClick={() => clickHandler(booking)}>
      {booking.booking.classes_booked} / {booking.booking.total_classes}
    </StandardButton>
  );
};
