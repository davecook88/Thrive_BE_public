import React, { useEffect, useState } from "react";
import { selectUser } from "../../../../../../auth/userSlice";
import ApiAdaptor from "../../../../../../backend/apiAdaptor";
import StripePayment from "../../../../../payment/stripe/StripePayment";
import { useAppSelector } from "../../../../../redux/hooks";
import { Course } from "../../../../../types/course/responses";
import {
  PrivateClassBooking,
  PrivateClassBookingResponse,
} from "../../../../../types/privateClass/responses";
import { TeacherBookClassModalPaymentFormProps } from "./types";

export const TeacherBookClassModalPaymentForm: React.FC<
  TeacherBookClassModalPaymentFormProps
> = ({ privateClassOption, startTime, privateClassPackage }) => {
  const admin = useAppSelector(selectUser);
  const [course, setCourse] = useState<Course | null>(null);
  const [booking, setBooking] = useState<PrivateClassBooking | null>(null);
  const createCourse = async () => {
    /*
    If just one class is being booked then
    this will create a new course with one live class.

    TODO: Convert this so that everything uses a package
    */
    const newCourse = await ApiAdaptor.createPrivateClassCourse(
      privateClassOption.id,
      {
        minutes_duration: privateClassOption.length_minutes,
        max_students: 1,
        start_time: startTime,
      }
    );
    setCourse(newCourse);
  };

  const createPackage = async () => {
    if (!privateClassPackage?.id)
      throw new Error(
        "createPackage should be called only when a privateClassPackage has been selected"
      );
    const bookingResponse: PrivateClassBookingResponse =
      await ApiAdaptor.createPrivateClassPackageBooking(privateClassPackage.id);

    setCourse(bookingResponse.course);
    setBooking(bookingResponse.booking);
  };

  useEffect(() => {
    if (privateClassPackage) createPackage();
    else createCourse();
  }, []);

  if (!course || !admin.user) return <div>Loading...</div>;
  return (
    <div>
      <StripePayment
        amount={privateClassOption.cents_price}
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
