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
  const { hidePaymentScreen } = useTeacherProfilePayment();

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
