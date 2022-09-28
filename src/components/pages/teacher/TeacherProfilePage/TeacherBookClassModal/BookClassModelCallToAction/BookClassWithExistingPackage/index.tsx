import React from "react";
import { usePackageBooking } from "../../../hooks/usePackageBooking";
import { PrivateClassPackageBooking } from "../../../../../../types/privateClass/responses";
import { BookClassWithExistingPackageButton } from "./BookClassWithExistingPackageButton";
import { useTeacherProfilePayment } from "../../../hooks/useTeacherProfilePayment";

export const BookClassWithExistingPackage = () => {
  const { applicableBookings, selectPackageBookingToApply } =
    usePackageBooking();
  const { addNewPackageBookingToInvoice, showPaymentScreen } =
    useTeacherProfilePayment();

  if (!applicableBookings) return null;

  const onSelectBooking = (booking: PrivateClassPackageBooking) => {
    debugger;
    selectPackageBookingToApply(booking);
    addNewPackageBookingToInvoice();
    showPaymentScreen();
  };

  return (
    <div className="w-full p-4">
      <div className="w-full flex justify-center text-center">
        You already have packages available for this class
      </div>

      <div className="flex">
        {applicableBookings.map((booking) => (
          <BookClassWithExistingPackageButton
            booking={booking}
            clickHandler={onSelectBooking}
          />
        ))}
      </div>
    </div>
  );
};
