import React from "react";
import UnauthorizedAccessPage from "../../../auth/UnauthorizedPage";
import { selectUser } from "../../../components/redux/reducers/user/userSlice";
import CourseForm from "../../../components/admin/course/CourseForm";
import { useAppSelector } from "../../../components/redux/hooks";

const CourseAdminPage = () => {
  const auth = useAppSelector(selectUser);
  if (!auth.user?.is_teacher) return <UnauthorizedAccessPage />;
  return (
    <div className="artboard-demo">
      <div className="mb-4 flex w-full justify-center pt-4">
        <h1 className="text-3xl font-bold uppercase">Create a course</h1>
      </div>
      <CourseForm refresh={() => {}} />
    </div>
  );
};

export default CourseAdminPage;
