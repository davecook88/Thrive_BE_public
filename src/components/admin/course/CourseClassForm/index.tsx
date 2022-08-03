import React, { useState } from "react";
import {
  FormSection,
  StandardForm,
  StandardFormBody,
} from "../../../styled/Form";
import { Course, CourseClass } from "../../../types/course/responses";
import { ListTeachersResponse } from "../../../types/teacher/responses";
import Dropdown from "../CourseForm/Dropdown";

interface CourseClassFormProps {
  courseClass?: CourseClass;
  classNumber: number;
  course: Course;
}

export const CourseClassForm: React.FC<CourseClassFormProps> = ({
  course,
  classNumber,
}) => {
  const [name, setName] = useState(`Live Class ${classNumber}`);
  const [description, setDescription] = useState("");
  const [selectedTeacher, setSelectedTeacher] =
    useState<ListTeachersResponse | null>(null);

  const courseTeachers: ListTeachersResponse[] = course.course_teachers;
  const selectTeacher = (val: string | number) => {
    const selectedTeacher = courseTeachers.find((t) => t.user_id == val);
    if (!selectedTeacher) return;
    setSelectedTeacher(selectedTeacher);
  };

  const teacherComponent = () => {
    if (!selectTeacher && !courseTeachers?.length)
      return <div>No teachers assigned to this course yet</div>;
    if (!selectedTeacher)
      return (
        <Dropdown
          options={courseTeachers.map((t) => ({
            name: t.user_name,
            id: t.user_id,
          }))}
          onChange={selectTeacher}
          defaultOption="Select  teacher"
          value={0}
        />
      );
  };

  return (
    <StandardForm>
      <StandardFormBody>
        <FormSection>
          <div className="p-2">
            <label className="input-group">
              <span className="text-xs bg-secondary">Class Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name your class"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="p-2">
            <label className="input-group  h-25">
              <span className="text-xs bg-secondary">Description</span>
              <textarea
                rows={10}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="This course focuses on..."
                className="input input-bordered w-full h-25"
              />
            </label>
          </div>
        </FormSection>
        <FormSection>
          <div className="p-2">{teacherComponent()}</div>
        </FormSection>
      </StandardFormBody>
    </StandardForm>
  );
};
