import React from "react";
import CourseForm from "../../../components/admin/course/CourseForm";

const CourseAdminPage = () => {
  return (
    <div className="artboard-demo">
      <div className="mb-4 w-full flex justify-center pt-4">
        <h1 className="font-bold uppercase text-3xl">Create a course</h1>
      </div>
      <CourseForm refresh={() => {}} />
    </div>
  );
};

export default CourseAdminPage;
