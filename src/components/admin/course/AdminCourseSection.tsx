import Link from "next/link";
import React, { useEffect, useState } from "react";
import ApiAdaptor from "../../../backend/apiAdaptor";
import { Course } from "../../types/course/responses";
import { AdminSectionContainer, AdminSectionTitle } from "../styled";

const AdminCourseSection = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    ApiAdaptor.listCourses({ page: 1 }).then(setCourses);
  }, []);

  const listCourses = () =>
    courses.map((course) => (
      <div className="p-1 " key={course.id}>
        <Link href={`/admin/course/${course.id}`}>
          <div
            id="row-container"
            className="align-center border-base-600 flex cursor-pointer justify-between rounded-full border bg-base-100 p-4 uppercase  drop-shadow hover:bg-base-300"
          >
            <div className="px-6 font-bold">{course.name}</div>
          </div>
        </Link>
      </div>
    ));

  return (
    <AdminSectionContainer id="course-admin">
      <div className="w-full text-center">
        <AdminSectionTitle className="p-2 text-xl font-bold uppercase">
          Courses
        </AdminSectionTitle>
      </div>
      <div id="courses-list-container">{listCourses()}</div>
      <div className="flex justify-center p-2 py-4">
        <Link href="/admin/course/">
          <div className="btn btn-accent">Create a course</div>
        </Link>
      </div>
    </AdminSectionContainer>
  );
};

export default AdminCourseSection;
