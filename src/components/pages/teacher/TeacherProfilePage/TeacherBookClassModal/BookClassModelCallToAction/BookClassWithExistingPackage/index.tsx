import React from "react";
import { usePackageBooking } from "../../../hooks/usePackageBooking";
import { BookClassWithExistingPackageButton } from "./BookClassWithExistingPackageButton";

export const BookClassWithExistingPackage = () => {
  const { applicableBookings, selectPackageBookingToApply } =
    usePackageBooking();

  if (!applicableBookings) return null;

  return (
    <div className="w-full p-4">
      <div className="w-full flex justify-center text-center">
        You already have packages available for this class
      </div>

      <div className="flex">
        {applicableBookings.map((booking) => (
          <BookClassWithExistingPackageButton
            booking={booking}
            clickHandler={selectPackageBookingToApply}
          />
        ))}
      </div>
    </div>
  );
};
