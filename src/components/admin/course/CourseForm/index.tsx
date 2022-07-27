import React, { useEffect, useState } from "react";
import ApiAdaptor from "../../../../backend/apiAdaptor";
import { StandardButton } from "../../../styled/Buttons";
import {
  FormSection,
  StandardForm,
  StandardFormBody,
} from "../../../styled/Form";
import { ListTeachersResponse } from "../../../types/teacher/responses";
import DatePicker from "./DatePicker";
import Dropdown from "./Dropdown";
import InputSlider from "./InputSlider";
import SelectedList from "./SelectedList";

interface CourseFormProps {}

const CourseForm: React.FC<CourseFormProps> = () => {
  const [availableTeachers, setAvailableTeachers] = useState<
    ListTeachersResponse[]
  >([]);

  // FORM VALUES
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [level, setLevel] = useState<number>(0);
  const [maxStudents, setMaxStudents] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [selectedTeachers, setSelectedTeachers] = useState<
    ListTeachersResponse[]
  >([]);

  const onSubmitCourse = async () => {
    const submittedCourse = await ApiAdaptor.postCourse({
      name,
      description,
      difficulty: level,
      teacher_ids: selectedTeachers.map((t) => t.id),
      price,
      max_students: maxStudents,
    });
    debugger;

    console.log(submittedCourse);
  };
  useEffect(() => {
    ApiAdaptor.listTeachers().then((teachers) =>
      setAvailableTeachers(teachers)
    );
  }, []);

  const selectTeacher = (val: string | number) => {
    console.log({ selectTeacher: val });
    const selectedTeacher = availableTeachers.find((t) => t.user_id == val);
    if (!selectedTeacher) return;
    setSelectedTeachers([...selectedTeachers, selectedTeacher]);
  };
  const selectedTeacherIds = selectedTeachers.map((t) => t.user_id);
  const unselectedTeachers = availableTeachers.filter(
    (t) => !selectedTeacherIds.includes(t.user_id)
  );

  return (
    <StandardForm>
      <div className="mb-4 w-full">
        <h2 className="font-bold uppercase">Create a course</h2>
      </div>
      <StandardFormBody>
        <FormSection>
          <div className="p-2">
            <label className="input-group">
              <span className="text-xs bg-secondary">Course Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name your course"
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
          <div>
            <InputSlider
              onChange={(val) => setLevel(val)}
              value={level}
              title="Course Level"
            />
          </div>
          <div>
            <InputSlider
              onChange={(val) => setMaxStudents(val)}
              value={maxStudents}
              title="Max. Students / Class"
            />
          </div>
          <div className="p-2">
            <label className="input-group w-min m-auto ">
              <span className="text-xs bg-secondary">Price</span>
              <input
                value={`$${price}`}
                onChange={(e) => {
                  const priceVal = Number(e.target.value.replace("$", ""));

                  if (isNaN(priceVal)) return setPrice(0);
                  setPrice(priceVal);
                }}
                placeholder="Set your price"
                className="input input-bordered "
              />
            </label>
          </div>
        </FormSection>
        <FormSection>
          {unselectedTeachers.length > 0 && (
            <Dropdown
              options={unselectedTeachers.map((t) => ({
                name: t.user_name,
                id: t.user_id,
              }))}
              onChange={selectTeacher}
              defaultOption="Add a teacher"
              value={0}
            />
          )}
          <div className="p-2">
            {selectedTeacherIds.length > 0 && (
              <>
                <div className="mb-2 uppercase text-sm">Selected Teachers </div>
                <SelectedList
                  onRemove={(id) => {
                    setSelectedTeachers(
                      selectedTeachers.filter((t) => t.user_id != id)
                    );
                  }}
                  items={selectedTeachers.map((t) => ({
                    id: t.user_id,
                    name: t.user_name,
                  }))}
                />
              </>
            )}
          </div>
        </FormSection>
      </StandardFormBody>

      <div className="flex items-center justify-center p-4">
        <StandardButton
          className="bg-primary border-none drop-shadow-md btn-wide hover:bg-secondary"
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault();
            onSubmitCourse();
          }}
        >
          Create Course
        </StandardButton>
      </div>
    </StandardForm>
  );
};

export default CourseForm;
