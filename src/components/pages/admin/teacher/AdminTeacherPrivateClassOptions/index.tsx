import React from "react";
import { PrivateClassOptionAdminDisplay } from "../PrivateClassOptionAdminDisplay";
import { AdminTeacherPrivateClassOptionsProps } from "./types";

export const AdminTeacherPrivateClassOptions: React.FC<
  AdminTeacherPrivateClassOptionsProps
> = ({ options }) => {
  return (
    <section className="container">
      {options.map((option) => (
        <PrivateClassOptionAdminDisplay option={option} />
      ))}
    </section>
  );
};
