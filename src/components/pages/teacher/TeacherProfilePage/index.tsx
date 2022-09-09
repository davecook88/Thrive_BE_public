import React, { useEffect, useMemo, useState } from "react";
import ApiAdaptor from "../../../../backend/apiAdaptor";
import { useAppSelector } from "../../../redux/hooks";
import { selectAvailability } from "../../../redux/reducers/calendar/availabilitySlice";
import { PrivateClassOption } from "../../../types/privateClass/responses";
import { TeacherCard } from "../../../user/teacher/TeacherCard";
import { ClassLengthSelect } from "./ClassLengthSelect";
import { PrivateClassOptionDisplay } from "./PrivateClassOptionDisplay";
import { PrivateClassOptionsMenu } from "./PrivateClassOptionsMenu";
import { TeacherBookingCalendar } from "./TeacherBookingCalendar";
import { TeacherProfilePageProps } from "./types";

export const TeacherProfilePage: React.FC<TeacherProfilePageProps> = ({
  teacher,
}) => {
  console.log({ teacher });
  const [classLengthMinutes, setClassLengthMinutes] = useState<number>(60);
  const [selectedPrivateClassOptionId, setSelectedPrivateClassOptionId] =
    useState<number | undefined>();
  const privateClassOptions: PrivateClassOption[] =
    teacher.private_class_options;
  const availability = useAppSelector(selectAvailability);

  if (!availability) return null;
  useEffect(() => {
    const durationOptions = privateClassOptions.filter(
      (o) => o.length_minutes === classLengthMinutes
    );
    setSelectedPrivateClassOptionId(durationOptions[0].id);
  });

  const selectedPrivateClassOption = useMemo(
    () =>
      privateClassOptions.find((o) => o.id === selectedPrivateClassOptionId),
    [selectedPrivateClassOptionId]
  );
  return (
    <section className="container">
      <div>
        <TeacherCard teacher={teacher} showScheduleButton={false} />
      </div>
      <section>
        <ClassLengthSelect
          selectedClassLength={classLengthMinutes}
          onSelectClassLength={setClassLengthMinutes}
          classLengthOptions={privateClassOptions
            .map((o) => o.length_minutes)
            .sort()}
        />
      </section>
      <section id="teacher-profile-page-private-class-options">
        <PrivateClassOptionsMenu
          privateClassOptions={privateClassOptions.filter(
            (o) => o.length_minutes === classLengthMinutes
          )}
          onSelectOption={setSelectedPrivateClassOptionId}
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
          availabilityEntries={availability.available}
          teacherId={teacher.id}
          classLength={classLengthMinutes}
          selectedPrivateClass={selectedPrivateClassOption}
        />
      </section>
    </section>
  );
};
