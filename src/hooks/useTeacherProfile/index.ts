import { useAppDispatch, useAppSelector } from "../../components/redux/hooks";
import { selectTeacherProfilePageState } from "../../components/redux/reducers/teachers/TeacherProfilePageSlice/slice";
import { setSelectedProfilePageTeacher } from "../../components/redux/reducers/teachers/TeacherProfilePageSlice/slice";
import { TeacherResponse } from "../../components/types/teacher/responses";

export const useTeacherProfile = () => {
  const dispatch = useAppDispatch();
  const teacherState = useAppSelector(selectTeacherProfilePageState);

  const setTeacherProfile = (teacher: TeacherResponse) =>
    dispatch(
      setSelectedProfilePageTeacher({
        teacher,
      })
    );

  return {
    setTeacherProfile,
    teacher: teacherState.teacher,
  };
};
