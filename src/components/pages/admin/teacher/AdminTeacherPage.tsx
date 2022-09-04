import React, { useEffect, useState } from "react";
import ApiAdaptor from "../../../../backend/apiAdaptor";
import { ListTeachersResponse } from "../../../types/teacher/responses";
import { TeacherCard } from "../../../user/teacher/TeacherCard";
import { AddTeacherSection } from "./AddTeacherSection";

export const AdminTeacherPage = () => {
  const [teachers, setTeachers] = useState<ListTeachersResponse[]>([]);
  useEffect(() => {
    ApiAdaptor.listTeachers().then((_teachers) => setTeachers(_teachers));
  }, []);
  return (
    <div className="container text-center">
      <div>
        <h1 className="font-extrabold text-4xl p-4">Teacher Admin</h1>
      </div>
      <AddTeacherSection />
      <div className="grid grid-cols-1 md:grid-cols-3 ">
        {teachers.map((teacher) => (
          <TeacherCard teacher={teacher} />
        ))}
      </div>
    </div>
  );
};
