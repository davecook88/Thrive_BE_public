import React, { useState } from "react";
import { TeacherBookClassModalProps } from "./types";
import { TeacherAvatar } from "../../../../user/teacher/TeacherAvatar";
import { BookClassModelCallToAction } from "./BookClassModelCallToAction";
import { TeacherBookClassModalPaymentForm } from "./BookClassModalPaymentForm";
import { PrivateClassPackageOption } from "../../../../types/privateClass/responses";
import { usePrivateClassOption } from "../hooks/usePrivateClassOption";
import { useSelectedSlot } from "../hooks/useSelectedSlot";
import { useTeacherProfile } from "../../../../../hooks/useTeacherProfile";
import useDisplayedDates from "../hooks/useDisplayedDates";
import { useInvoice } from "../../../../../hooks/useInvoice";
import { useTeacherProfilePayment } from "../hooks/useTeacherProfilePayment";
export const TeacherBookClassModal: React.FC<
  TeacherBookClassModalProps
> = ({}) => {
  const { readyForPayment } = useTeacherProfilePayment();
  const { selectedPrivateClassOption } = usePrivateClassOption();
  const { selectedAvailabilitySlot } = useSelectedSlot();
  const { teacher } = useTeacherProfile();

  if (!selectedPrivateClassOption)
    return <div>You need to select a private class option to book</div>;

  const displayModalContents = () => {
    if (!selectedAvailabilitySlot) return "No slot selected";
    if (readyForPayment) return <TeacherBookClassModalPaymentForm />;
    return (
      <BookClassModelCallToAction
        price={selectedPrivateClassOption.cents_price}
        packageOptions={selectedPrivateClassOption.package_options}
      />
    );
  };

  if (!teacher) return null;

  return (
    <div className="p-6">
      <div>
        <div className="w-full p-2">
          <header className="flex">
            <TeacherAvatar imageUrl={teacher.photo_url} />
            <div className="px-2">
              <h2 className="text-lg font-bold">
                Book a class with {teacher.name}
              </h2>
            </div>
          </header>
          {displayModalContents()}
        </div>
      </div>
    </div>
  );
};
