import { GetServerSideProps } from "next/types";
import React from "react";
import { TeacherAvailabilitySettings } from "../../../components/pages/admin/teacher/TeacherAvailabilitySettings";

interface AdminTeacherProps {
  teacherId: number;
}
const AdminTeacher: React.FC<AdminTeacherProps> = ({ teacherId }) => {
  return (
    <div className="mt-20">
      <TeacherAvailabilitySettings teacherId={Number(teacherId)} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { teacherId } = context.query;

  return {
    props: { teacherId }, // will be passed to the page component as props
  };
};

export default AdminTeacher;
