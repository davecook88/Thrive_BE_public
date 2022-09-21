import React, { useMemo, useState } from "react";
import { TeacherBookClassModalProps } from "./types";
import { TeacherAvatar } from "../../../../user/teacher/TeacherAvatar";
import { BookClassModelCallToAction } from "./BookClassModelCallToAction";
import { TeacherBookClassModalPaymentForm } from "./BookClassModalPaymentForm";
import { PrivateClassPackageOption } from "../../../../types/privateClass/responses";
export const TeacherBookClassModal: React.FC<TeacherBookClassModalProps> = ({
  teacher,
  availabilitySlot,
  privateClassOption,
}) => {
  const [showPaymentContents, setShowPaymentContents] = useState(false);
  const [selectedPackage, setSelectedPackage] =
    useState<PrivateClassPackageOption | null>(null);
  const times = useMemo(
    () => ({
      start: new Date(availabilitySlot.start),
      end: new Date(availabilitySlot.end),
    }),
    [availabilitySlot]
  );
  if (!privateClassOption)
    return <div>You need to select a private class option to book</div>;

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
          {showPaymentContents ? (
            <TeacherBookClassModalPaymentForm
              privateClassOption={privateClassOption}
              startTime={availabilitySlot.start}
              privateClassPackage={selectedPackage}
            />
          ) : (
            <BookClassModelCallToAction
              endTime={times.end}
              startTime={times.start}
              price={privateClassOption.cents_price}
              onBookNowClick={() => setShowPaymentContents(true)}
              packageOptions={privateClassOption.package_options}
              setSelectedPackage={setSelectedPackage}
            />
          )}
        </div>
      </div>
    </div>
  );
};
