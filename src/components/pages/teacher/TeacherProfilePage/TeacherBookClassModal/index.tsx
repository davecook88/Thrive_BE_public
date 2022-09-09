import React, { useMemo } from "react";
import { TeacherBookClassModalProps } from "./types";
import moment from "moment";
import { TeacherAvatar } from "../../../../user/teacher/TeacherAvatar";
import { StandardButton } from "../../../../styled/Buttons";
import { BookClassModelCallToAction } from "./BookClassModelCallToAction";
export const TeacherBookClassModal: React.FC<TeacherBookClassModalProps> = ({
  teacher,
  availabilitySlot,
  privateClassOption,
}) => {
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
          <BookClassModelCallToAction
            endTime={times.end}
            startTime={times.start}
            price={privateClassOption.cents_price}
          />
        </div>
      </div>
    </div>
  );
};
