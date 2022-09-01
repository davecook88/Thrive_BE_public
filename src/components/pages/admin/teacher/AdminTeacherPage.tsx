import React, { useEffect, useState } from "react";
import ApiAdaptor from "../../../../backend/apiAdaptor";
import { ListTeachersResponse } from "../../../types/teacher/responses";
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
      <p>{JSON.stringify(teachers)}</p>
    </div>
  );
};
