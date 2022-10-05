import React from "react";
import { useTeacherAdmin } from "../hooks/useTeacherAdmin";
import { PrivateClassOptionAdminDisplay } from "../PrivateClassOptionAdminDisplay";
import { AdminTeacherPrivateClassOptionsProps } from "./types";

export const AdminTeacherPrivateClassOptions: React.FC<
  AdminTeacherPrivateClassOptionsProps
> = () => {
  const { teacher } = useTeacherAdmin();

  if (!teacher) return null;
  return (
    <section className="container">
      {teacher?.private_class_options.map((option) => (
        <PrivateClassOptionAdminDisplay option={option} />
      ))}
    </section>
  );
};
