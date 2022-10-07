import React, { useRef } from "react";
import { CreatePrivateClassOptionForm } from "../../../../admin/privateClass/CreatePrivateClassOptionForm";
import { useTeacherAdmin } from "../hooks/useTeacherAdmin";
import { AdminTeacherPrivateClassOptions } from "./AdminTeacherPrivateClassOptions";

export const TeacherAdminPrivateClassSection: React.FC = () => {
  const { teacherId: savedTeacherId } = useTeacherAdmin();
  const formRef = useRef<HTMLDivElement>();

  const scrollToForm = () => formRef.current?.scrollIntoView();

  if (!savedTeacherId) return <div>No teacher selected</div>;
  return (
    <section>
      <div className="w-full flex justify-center">
        <CreatePrivateClassOptionForm
          teacherId={savedTeacherId}
          formRef={formRef}
        />
      </div>
      <AdminTeacherPrivateClassOptions onEditPrivateClassClick={scrollToForm} />
    </section>
  );
};
