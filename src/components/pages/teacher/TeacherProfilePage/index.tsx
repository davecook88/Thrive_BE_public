import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectAvailability } from "../../../redux/reducers/calendar/availabilitySlice";
import { TeacherCard } from "../../../user/teacher/TeacherCard";
import { TeacherBookingCalendar } from "./TeacherBookingCalendar";
import { TeacherProfilePageProps } from "./types";

export const TeacherProfilePage: React.FC<TeacherProfilePageProps> = ({
  teacher,
}) => {
  const availability = useAppSelector(selectAvailability);

  return (
    <section className="container">
      <div>
        <TeacherCard teacher={teacher} showScheduleButton={false} />
      </div>
      <section>
        <TeacherBookingCalendar
          availability={availability}
          teacherId={teacher.id}
        />
      </section>
    </section>
  );
};
