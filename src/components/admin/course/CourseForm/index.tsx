import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import ApiAdaptor from "../../../../backend/apiAdaptor";
import { showToast } from "../../../common/alerts/toastSlice";
import { StandardButton } from "../../../styled/Buttons";
import {
  FormSection,
  StandardForm,
  StandardFormBody,
} from "../../../styled/Form";
import { Course } from "../../../types/course/responses";
import { ListTeachersResponse } from "../../../types/teacher/responses";
import Dropdown from "./Dropdown";
import InputSlider from "./InputSlider";
import SelectedList from "./SelectedList";
import { useAppDispatch } from "../../../redux/hooks";
import { setSelectedCourse, setSelectedLevel } from "../../adminSlice";
import { LevelResponse } from "../../../types/level/response";
import Link from "next/link";

interface CourseFormProps {
  course?: Course;
  refresh: () => void;
}

const CourseForm: React.FC<CourseFormProps> = ({ course, refresh }) => {
  const router = useRouter();
  const [availableTeachers, setAvailableTeachers] = useState<
    ListTeachersResponse[]
  >([]);

  // FORM VALUES
  const [name, setName] = useState<string>(course?.name || "");
  const [description, setDescription] = useState<string>(
    course?.description || ""
  );
  const [level, setLevel] = useState<number>(course?.level_id || 0);
  const [maxStudents, setMaxStudents] = useState<number>(
    course?.max_students || 0
  );
  const [price, setPrice] = useState<number>(course?.price || 0);
  const [selectedTeachers, setSelectedTeachers] = useState<
    ListTeachersResponse[]
  >([]);

  const [levels, setLevels] = useState<LevelResponse[]>([]);
  const [unit, setUnit] = useState<number>();

  const selectedLevel = useMemo(
    () => levels.find((l) => l.id == level),
    [levels, level]
  );

  useEffect(() => {
    if (selectedLevel || !levels?.length) return;
    setLevel(levels[0].id);
  }, [selectedLevel, levels]);

  const dispatch = useAppDispatch();

  const displayToast = (message: string) => {
    dispatch(
      showToast({
        message,
      })
    );
  };

  const onSubmitCourse = () => {
    if (!course) createCourse();
    else updateCourse(course);
    refresh();
  };

  const createCourse = async () => {
    const selectedUnit = selectedLevel?.units.find((l) => l.id == level);
    if (selectedUnit === undefined) {
      displayToast("No unit selected");
      return;
    }
    const newCourse = await ApiAdaptor.postCourse({
      name,
      description,
      difficulty: level,
      teacher_ids: selectedTeachers.map((t) => t.id),
      price,
      max_students: maxStudents,
      unit_id: selectedUnit.id,
    });
    displayToast("Course created!");
    setTimeout(() => {
      router.push(`/admin/course/${newCourse.id}`);
    }, 300);
  };

  const updateCourse = async (course: Course) => {
    const selectedUnit = selectedLevel?.units.find((l) => l.id == unit);

    if (selectedUnit === undefined) {
      displayToast("No unit selected");
      return;
    }
    const updatedCourse = await ApiAdaptor.putCourse(course.id, {
      name,
      description,
      difficulty: level,
      teacher_ids: selectedTeachers.map((t) => t.id),
      student_ids: course.course_students?.map((s) => s.id) || [],
      price,
      max_students: maxStudents,
      unit_id: selectedUnit.id,
    });
    displayToast("Course updated!");
    dispatch(setSelectedCourse({ selectedCourse: updatedCourse }));
  };

  useEffect(() => {
    if (availableTeachers.length) return;
    ApiAdaptor.listTeachers().then((teachers) =>
      setAvailableTeachers(teachers)
    );
    ApiAdaptor.listLevels().then(setLevels);
  }, []);

  useEffect(() => {
    if (!course) return;
    const selectedTeacherIds = course.course_teachers.map((t) => t.teacher_id);
    setSelectedTeachers(
      availableTeachers.filter((t) => selectedTeacherIds.includes(t.id))
    );
  }, [course, availableTeachers]);

  const selectTeacher = (val: string | number) => {
    const selectedTeacher = availableTeachers.find((t) => t.user_id == val);
    if (!selectedTeacher) return;
    setSelectedTeachers([...selectedTeachers, selectedTeacher]);
  };
  const selectedTeacherIds = selectedTeachers.map((t) => t.user_id);
  const unselectedTeachers = availableTeachers.filter(
    (t) => !selectedTeacherIds.includes(t.user_id)
  );

  const deleteCourse = async (courseId: number, courseName: string) => {
    await ApiAdaptor.deleteCourse(courseId);
    displayToast(`Course ${courseName} deleted`);
    router.push("/admin");
  };

  useEffect(() => {
    if (!selectedLevel?.units.length) return;
    setUnit(selectedLevel.units[0].id);
  }, [selectedLevel]);

  const displayUnitDropdown = () => {
    if (!selectedLevel) return null;
    if (selectedLevel?.units.length)
      return (
        <div>
          <Dropdown
            options={selectedLevel?.units.map((l) => ({
              name: l.name,
              id: l.id,
            }))}
            onChange={(id) => setUnit(Number(id))}
            defaultOption="Select a unit"
            value={Math.min(...selectedLevel.units.map((l) => l.id))}
          />
        </div>
      );
    else
      return (
        <div className="p-2 text-center">
          <div>
            It looks like there aren't any units for the {selectedLevel.name}{" "}
            course yet.
          </div>
          <StandardButton
            className="btn-secondary"
            id="create-missing-unit-btn"
          >
            <Link href={`/admin/level/${selectedLevel.id}`}>Create a Unit</Link>
          </StandardButton>
        </div>
      );
  };

  return (
    <StandardForm>
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
            <Dropdown
              options={levels.map((l) => ({
                name: l.name,
                id: l.id,
              }))}
              onChange={(id) => setLevel(Number(id))}
              defaultOption="Select a course"
              value={selectedLevel?.id}
            />
          </div>
          {displayUnitDropdown()}
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

      <div className="flex items-center justify-center p-2">
        {course && (
          <StandardButton
            className="bg-error border-none drop-shadow-md btn-wide text-white mx-2"
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault();
              deleteCourse(course.id, course.name);
            }}
          >
            Delete Course
          </StandardButton>
        )}
        <StandardButton
          className="bg-primary border-none drop-shadow-md btn-wide text-white hover:bg-secondary mx-2"
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault();
            onSubmitCourse();
          }}
        >
          {course ? "Update Course" : "Create Course"}
        </StandardButton>
      </div>
    </StandardForm>
  );
};

export default CourseForm;
