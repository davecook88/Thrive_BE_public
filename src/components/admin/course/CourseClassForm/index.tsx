import React, { useEffect, useState } from "react";
import {
  FormSection,
  StandardForm,
  StandardFormBody,
} from "../../../styled/Form";
import { Course, CourseClassResponse } from "../../../types/course/responses";
import { ListCourseTeachersResponse } from "../../../types/teacher/responses";
import DateTimePicker from "./DateTimePicker";
import SelectedList from "../CourseForm/SelectedList";
import { StandardButton } from "../../../styled/Buttons";
import {
  CreateCourseClassPayload,
  UpdateCourseClassPayload,
} from "../../../types/course/payloads";
import ApiAdaptor from "../../../../backend/apiAdaptor";
import { useAppDispatch } from "../../../redux/hooks";
import { showToast } from "../../../common/alerts/toastSlice";
import AdminFormErrors from "../../AdminFormErrors";
import { addError, clearErrors } from "../../adminSlice";
import { RepeatMenu } from "./RepeatMenu";
import moment from "moment";
import Dropdown from "../../../common/forms/Dropdown";

interface CourseClassFormProps {
  courseClass?: CourseClassResponse;
  classNumber: number;
  course: Course;
  refresh: () => void;
}

export enum RepeatOption {
  day = "day",
  week = "week",
}

export const CourseClassForm: React.FC<CourseClassFormProps> = ({
  course,
  classNumber,
  courseClass,
  refresh,
}) => {
  const [name, setName] = useState(`Live Class ${classNumber}`);
  const [description, setDescription] = useState<string | undefined>();
  const [selectedTeacher, setSelectedTeacher] =
    useState<ListCourseTeachersResponse | null>(null);
  const [startTime, setStartTime] = useState(
    courseClass?.start_time ? new Date(courseClass?.start_time) : new Date()
  );
  const [repeatClass, setRepeatClass] = useState(false);
  const [repeatEvery, setRepeatEvery] = useState<RepeatOption>(
    RepeatOption.week
  );
  const [repeatTimes, setRepeatTimes] = useState(1);
  const calculateDuration = (courseClass: CourseClassResponse) => {
    const millisecondsDuration =
      new Date(courseClass.end_time).getTime() -
      new Date(courseClass.start_time).getTime();
    return millisecondsDuration / (60 * 1000);
  };
  const [duration, setDuration] = useState<number>(30);

  useEffect(() => {
    dispatch(clearErrors());
    // Update states with selected courseClass if it exists
    const _name = courseClass ? courseClass.name : `Live Class ${classNumber}`;
    setName(_name);
    const _description = courseClass?.description;
    if (_description) setDescription(_description);
    const _start = courseClass?.start_time
      ? new Date(courseClass?.start_time)
      : new Date();
    setStartTime(_start);
    const _duration = courseClass ? calculateDuration(courseClass) : 60;
    setDuration(_duration);
    if (courseClass?.class_teachers.length) {
      setSelectedTeacher(courseClass.class_teachers[0]);
    } else {
      setSelectedTeacher(null);
    }
  }, [courseClass]);

  const dispatch = useAppDispatch();

  const displayToast = (message: string) => {
    dispatch(
      showToast({
        message,
      })
    );
  };

  const courseTeachers: ListCourseTeachersResponse[] = course.course_teachers;
  const selectTeacher = (val: string | number) => {
    const selectedTeacher = courseTeachers.find((t) => t.user_id == val);
    if (!selectedTeacher) return;
    setSelectedTeacher(selectedTeacher);
  };

  const setError = (error: string) => dispatch(addError({ error }));

  const validateInput = () => {
    const _errors = [];
    if (!selectedTeacher) _errors.push("No class teacher selected");
    if (!duration) _errors.push("Class duration is not set");
    if (startTime.getTime() < new Date().getTime())
      _errors.push("Start time is in the past");
    _errors.forEach(setError);
    return _errors.length > 0;
  };

  const onSubmitCourseClass = () => {
    const invalidInput = validateInput();
    if (invalidInput) return;
    if (!selectedTeacher) throw new Error("Teacher not selected");
    if (!courseClass) {
      createClass({
        class_teachers: [selectedTeacher.teacher_id],
        course_id: course.id,
        minutes_duration: duration,
        name: name,
        description,
        start_time: startTime,
      });
    } else {
      updateClass(courseClass.id, {
        class_teachers: [selectedTeacher.teacher_id],
        course_id: course.id,
        minutes_duration: duration,
        name: name,
        description,
        start_time: startTime,
      });
      refresh();
    }
  };

  const deleteCourseClass = async (
    courseClassId: number,
    courseClassName: string
  ) => {
    await ApiAdaptor.deleteCourseClass(courseClassId);
    displayToast(`Class ${courseClassName} deleted`);

    refresh();
  };

  const createClass = async (payload: CreateCourseClassPayload) => {
    const _repeatTimes = repeatClass ? repeatTimes : 1;
    for (let i = 1; i <= _repeatTimes; i++) {
      const _payload =
        i === 1
          ? payload
          : {
              ...payload,
              start_time: moment(payload.start_time)
                .add(i, repeatEvery)
                .toDate(),
            };
      await ApiAdaptor.postCourseClass(_payload);
    }
    refresh();
    displayToast(_repeatTimes === 1 ? "Class created!" : "Classes created!");
  };

  const updateClass = async (
    courseClassId: number,
    payload: UpdateCourseClassPayload
  ) => {
    await ApiAdaptor.putCourseClass(courseClassId, payload);
    displayToast("Class updated!");
  };

  const teacherComponent = () => {
    if (!selectTeacher && !courseTeachers?.length)
      return <div>No teachers assigned to this course yet</div>;
    else if (!selectedTeacher)
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
    else if (selectedTeacher)
      return (
        <SelectedList
          onRemove={() => setSelectedTeacher(null)}
          items={[
            { id: selectedTeacher.teacher_id, name: selectedTeacher.user_name },
          ]}
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
          <div className="p-2">
            <label className="label">
              <span className="label-text uppercase text-sm ">
                Class Teacher
              </span>
            </label>
            {teacherComponent()}
          </div>
        </FormSection>
        <FormSection>
          <label className="label">
            <span className="label-text uppercase text-sm ">Start time</span>
            {startTime.getTime() < new Date().getTime() && (
              <span className="label-text-alt text-error text-xs ">
                Time must be in the future
              </span>
            )}
          </label>
          <DateTimePicker onChange={setStartTime} value={startTime} />
          <div className="p-6 flex align-center flex justify-center">
            <div>
              <label className="input-group w-min m-auto ">
                <span className="text-xs bg-secondary">Duration minutes</span>
                <input
                  value={duration}
                  onChange={(e) => {
                    const durationVal = Number(e.target.value);
                    if (isNaN(durationVal)) return;
                    setDuration(durationVal);
                  }}
                  placeholder="Set duration in minutes"
                  className="input input-bordered p-1"
                />
              </label>
            </div>
          </div>
          {!courseClass && (
            <RepeatMenu
              repeatClass={repeatClass}
              setRepeatClass={setRepeatClass}
              repeatEvery={repeatEvery}
              setRepeatEvery={setRepeatEvery}
              repeatTimes={repeatTimes}
              setRepeatTimes={setRepeatTimes}
            />
          )}
        </FormSection>
      </StandardFormBody>
      <div className="flex items-center w-full justify-center p-2">
        {courseClass && (
          <StandardButton
            className="bg-error border-none drop-shadow-md btn-wide mx-2 text-white"
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault();
              deleteCourseClass(courseClass.id, courseClass.name);
            }}
          >
            Delete Class
          </StandardButton>
        )}
        <StandardButton
          className="bg-primary border-none drop-shadow-md btn-wide mx-2 text-white hover:bg-secondary"
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault();
            onSubmitCourseClass();
          }}
        >
          {courseClass ? "Update Class" : "Create Class"}
        </StandardButton>
      </div>
      <AdminFormErrors />
    </StandardForm>
  );
};
