import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { selectTeacherAdminState } from "../../../../../redux/reducers/teachers/TeacherAdminSlice/slice";
import { fetchTeacherAdminAsync } from "../../../../../redux/reducers/teachers/TeacherAdminSlice/thunks";

export const useTeacherAdmin = () => {
  const dispatch = useAppDispatch();

  const { teacher, teacherId } = useAppSelector(selectTeacherAdminState);

  const refreshTeacher = () => {
    if (!teacherId) return;
    dispatch(
      fetchTeacherAdminAsync({
        teacherId,
      })
    );
  };

  return {
    teacher,
    refreshTeacher,
    teacherId,
  };
};
