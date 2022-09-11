import React, { useEffect, useState } from "react";
import { selectUser } from "../../../../../../auth/userSlice";
import ApiAdaptor from "../../../../../../backend/apiAdaptor";
import StripePayment from "../../../../../payment/stripe/StripePayment";
import { useAppSelector } from "../../../../../redux/hooks";
import { Course } from "../../../../../types/course/responses";
import { TeacherBookClassModalPaymentFormProps } from "./types";

export const TeacherBookClassModalPaymentForm: React.FC<
  TeacherBookClassModalPaymentFormProps
> = ({ privateClassOption, startTime }) => {
  const admin = useAppSelector(selectUser);
  const [course, setCourse] = useState<Course | null>(null);
  const createCourse = async () => {
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

  useEffect(() => {
    createCourse();
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
        returnUrl={process.env.NEXT_PUBLIC_APP_BASE_URL + "/users/me"}
      />
    </div>
  );
};
