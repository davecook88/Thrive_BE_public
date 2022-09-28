import React, { useEffect, useMemo, useState } from "react";
import { selectUser } from "../../../../../../auth/userSlice";
import ApiAdaptor from "../../../../../../backend/apiAdaptor";
import { useInvoice } from "../../../../../../hooks/useInvoice";
import { InvoiceConfirmation } from "../../../../../payment/InvoiceConfirmation";
import StripePayment from "../../../../../payment/stripe/StripePayment";
import { PaymentIntentCategory } from "../../../../../payment/stripe/types";
import { useAppSelector } from "../../../../../redux/hooks";
import { Course } from "../../../../../types/course/responses";
import {
  PrivateClassBookingResponse,
  PrivateClassPackageBooking,
} from "../../../../../types/privateClass/responses";
import { usePrivateClassOption } from "../../hooks/usePrivateClassOption";
import { useSelectedSlot } from "../../hooks/useSelectedSlot";
import { useTeacherProfilePayment } from "../../hooks/useTeacherProfilePayment";
import { TeacherBookClassModalPaymentFormProps } from "./types";

export const TeacherBookClassModalPaymentForm: React.FC<
  TeacherBookClassModalPaymentFormProps
> = ({}) => {
  const { selectedPrivateClassOption, selectedPrivateClassPackage } =
    usePrivateClassOption();
  const { selectedAvailabilitySlotDates } = useSelectedSlot();
  const { addPackageBookingToInvoice, addCourseToInvoice } = useInvoice();
  const { hidePaymentScreen } = useTeacherProfilePayment();

  const createCourse = async () => {
    if (!selectedPrivateClassOption)
      throw new Error("No selected privateClassOption");
    /*
    If just one class is being booked then
    this will create a new course with one live class.

    TODO: Convert this so that everything uses a package
    */
    const newCourse = await ApiAdaptor.createPrivateClassCourse(
      selectedPrivateClassOption?.id,
      {
        minutes_duration: selectedPrivateClassOption?.length_minutes,
        max_students: 1,
        start_time: selectedAvailabilitySlotDates().start,
      }
    );
    addCourseToInvoice(newCourse.id);
  };

  const createPackage = async () => {
    if (!selectedPrivateClassPackage?.id)
      throw new Error(
        "createPackage should be called only when a privateClassPackage has been selected"
      );
    const bookingResponse: PrivateClassBookingResponse =
      await ApiAdaptor.createPrivateClassPackageBooking(
        selectedPrivateClassPackage.id
      );
    addPackageBookingToInvoice(bookingResponse.booking.id);
  };

  useEffect(() => {
    if (selectedPrivateClassPackage) createPackage();
    else createCourse();
  }, []);

  return (
    <div>
      <InvoiceConfirmation keepBrowsing={hidePaymentScreen} />
      {/* <StripePayment
        category={category}
        package_booking_id={packageForPayment?.id}
        amount={selectedPrivateClassOption.cents_price}
        course_id={course.id}
        course_name={course.name}
        currency="usd"
        user_google_id={admin.user.details.google_id || ""}
        user_email={admin.user.details.email}
        user_id={Number(admin.user.details.id)}
        returnUrl={
          process.env.NEXT_PUBLIC_APP_BASE_URL + "/payment-confirmation"
        }
      /> */}
    </div>
  );
};
