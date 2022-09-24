import React, { useEffect, useState } from "react";
import { selectUser } from "../../../../../../auth/userSlice";
import ApiAdaptor from "../../../../../../backend/apiAdaptor";
import StripePayment from "../../../../../payment/stripe/StripePayment";
import { useAppSelector } from "../../../../../redux/hooks";
import { Course } from "../../../../../types/course/responses";
import {
  PrivateClassBookingResponse,
  PrivateClassPackageBooking,
} from "../../../../../types/privateClass/responses";
import { usePackageBooking } from "../../hooks/usePackageBooking";
import { usePrivateClassOption } from "../../hooks/usePrivateClassOption";
import { useSelectedSlot } from "../../hooks/useSelectedSlot";
import { TeacherBookClassModalPaymentFormProps } from "./types";

export const TeacherBookClassModalPaymentForm: React.FC<
  TeacherBookClassModalPaymentFormProps
> = () => {
  const admin = useAppSelector(selectUser);
  const [course, setCourse] = useState<Course | null>(null);
  const [packageForPayment, setPackageForPayment] =
    useState<PrivateClassPackageBooking | null>(null);
  const { selectedPrivateClassOption, selectedPrivateClassPackage } =
    usePrivateClassOption();
  const { selectedAvailabilitySlotDates } = useSelectedSlot();

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
    setCourse(newCourse);
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

    setCourse(bookingResponse.course);
    setPackageForPayment(bookingResponse.booking);
  };

  useEffect(() => {
    if (selectedPrivateClassPackage) createPackage();
    else createCourse();
  }, []);

  if (!course || !admin.user || !selectedPrivateClassOption)
    return <div>Loading...</div>;
  return (
    <div>
      <StripePayment
        package_id={packageForPayment?.id}
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
      />
    </div>
  );
};
