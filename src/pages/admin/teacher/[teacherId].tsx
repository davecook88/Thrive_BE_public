import { GetServerSideProps } from "next/types";
import React from "react";
import UnauthorizedAccessPage from "../../../auth/UnauthorizedPage";
import { selectUser } from "../../../auth/userSlice";
import { TeacherAvailabilitySettings } from "../../../components/pages/admin/teacher";
import { useAppSelector } from "../../../components/redux/hooks";

interface AdminTeacherProps {
  teacherId: number;
}
const AdminTeacher: React.FC<AdminTeacherProps> = ({ teacherId }) => {
  const auth = useAppSelector(selectUser);

  if (!auth.user?.is_teacher) return <UnauthorizedAccessPage />;

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
