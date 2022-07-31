import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ApiAdaptor from "../../../backend/apiAdaptor";
import CourseForm from "../../../components/admin/course/CourseForm";
import { Course } from "../../../components/types/course/responses";

const EditCoursePage = () => {
  const router = useRouter();
  const { courseId } = router.query;

  const [course, setCourse] = useState<Course | undefined>();

  useEffect(() => {
    if (!courseId) return;
    const getId = Array.isArray(courseId) ? courseId[0] : (courseId as string);
    ApiAdaptor.getCourseById(getId).then(setCourse);
  }, [courseId]);
  if (!course) return "loading";
  return (
    <div className="artboard-demo">
      <div className="mb-4 w-full flex justify-center pt-4">
        <h1 className="font-bold uppercase text-3xl">Edit course</h1>
      </div>
      <CourseForm course={course} />
    </div>
  );
};

export default EditCoursePage;
