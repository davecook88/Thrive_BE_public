import React, { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectAvailability } from "../../../redux/reducers/calendar/availabilitySlice";
import { TeacherCard } from "../../../user/teacher/TeacherCard";
import { ClassLengthSelect } from "./ClassLengthSelect";
import { TeacherBookingCalendar } from "./TeacherBookingCalendar";
import { TeacherProfilePageProps } from "./types";

export const TeacherProfilePage: React.FC<TeacherProfilePageProps> = ({
  teacher,
}) => {
  const [classLengthMinutes, setClassLengthMinutes] = useState<number>(60);
  const availability = useAppSelector(selectAvailability);
  if (!availability) return null;
  return (
    <section className="container">
      <div>
        <TeacherCard teacher={teacher} showScheduleButton={false} />
      </div>
      <section>
        <ClassLengthSelect
          selectedClassLength={classLengthMinutes}
          onSelectClassLength={setClassLengthMinutes}
          classLengthOptions={[30, 60]}
        />
      </section>
      <section>
        <TeacherBookingCalendar
          availabilityEntries={availability.available}
          teacherId={teacher.id}
          classLength={classLengthMinutes}
        />
      </section>
    </section>
  );
};
