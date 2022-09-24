import React, { useEffect, useState } from "react";
import { useDisplayedDates } from "./hooks/useDisplayedDates";
import { TeacherCard } from "../../../user/teacher/TeacherCard";
import { ClassLengthSelect } from "./ClassLengthSelect";
import { PrivateClassOptionDisplay } from "./PrivateClassOptionDisplay";
import { PrivateClassOptionsMenu } from "./PrivateClassOptionsMenu";
import { TeacherBookingCalendar } from "./TeacherBookingCalendar";
import { TeacherProfilePageProps } from "./types";
import { usePrivateClassOption } from "./hooks/usePrivateClassOption";

export const TeacherProfilePage: React.FC<TeacherProfilePageProps> = ({
  teacher,
}) => {
  const [classLengthMinutes, setClassLengthMinutes] = useState<number>(60);
  const { displayedDates, setDisplayedDates } = useDisplayedDates({
    teacher,
  });

  const {
    selectedPrivateClassOption,
    privateClassOptions,
    setPrivateClassOptionById,
    setSelectedPrivateClassOption,
  } = usePrivateClassOption();

  useEffect(() => {
    const durationOptions = privateClassOptions?.filter(
      (o) => o.length_minutes === classLengthMinutes
    );
    if (!durationOptions) return;

    setSelectedPrivateClassOption(durationOptions[0]);
  }, [privateClassOptions]);

  return (
    <section className="container">
      <div>
        <TeacherCard teacher={teacher} showScheduleButton={false} />
      </div>
      <section>
        <ClassLengthSelect
          selectedClassLength={classLengthMinutes}
          onSelectClassLength={setClassLengthMinutes}
          classLengthOptions={
            privateClassOptions?.map((o) => o.length_minutes).sort() || []
          }
        />
      </section>
      <section id="teacher-profile-page-private-class-options">
        <PrivateClassOptionsMenu
          privateClassOptions={
            privateClassOptions?.filter(
              (o) => o.length_minutes === classLengthMinutes
            ) || []
          }
          onSelectOption={setPrivateClassOptionById}
        />
      </section>
      <section
        id="teacher-profile-page-selected-private-class-option"
        className="flex justify-center"
      >
        {selectedPrivateClassOption && (
          <PrivateClassOptionDisplay
            privateClassOption={selectedPrivateClassOption}
          />
        )}
      </section>
      <section>
        <TeacherBookingCalendar
          classLength={classLengthMinutes}
          displayedDates={displayedDates}
          setDisplayedDates={setDisplayedDates}
        />
      </section>
    </section>
  );
};
