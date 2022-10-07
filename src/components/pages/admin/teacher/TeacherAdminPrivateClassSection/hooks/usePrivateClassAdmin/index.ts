import { useAppDispatch, useAppSelector } from "../../../../../../redux/hooks";
import {
  selectTeacherAdminState,
  setSelectedPrivateClassOption,
} from "../../../../../../redux/reducers/teachers/TeacherAdminSlice/slice";

export const usePrivateClassAdmin = () => {
  const { privateClassOptions, selectedPrivateClassOption } = useAppSelector(
    selectTeacherAdminState
  );

  const dispatch = useAppDispatch();

  const selectPrivateClass = (privateClassOptionId: number) =>
    dispatch(setSelectedPrivateClassOption({ privateClassOptionId }));

  const clearSelectedPrivateClass = () =>
    dispatch(setSelectedPrivateClassOption({ privateClassOptionId: null }));

  return {
    selectPrivateClass,
    privateClassOptions,
    clearSelectedPrivateClass,
    selectedPrivateClassOption,
  };
};
