import React from "react";
import { TeacherCard } from "../../../user/teacher/TeacherCard";
import { TeacherProfilePageProps } from "./types";

export const TeacherProfilePage: React.FC<TeacherProfilePageProps> = ({
  teacher,
}) => {
  return (
    <section className="container">
      <div>
        <TeacherCard teacher={teacher} showScheduleButton={false} />
      </div>
    </section>
  );
};
