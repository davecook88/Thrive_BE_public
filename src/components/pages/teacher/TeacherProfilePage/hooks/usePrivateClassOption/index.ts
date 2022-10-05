import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  selectTeacherPrivateClassBookings,
  setPackageOption,
  setPrivateClassOption,
} from "../../../../../redux/reducers/teacherPrivateClassBooking/teacherPrivateClassBookingSlice";
import { selectTeacherProfilePageState } from "../../../../../redux/reducers/teachers/TeacherProfilePageSlice/slice";
import {
  PrivateClassOption,
  PrivateClassPackageOption,
} from "../../../../../types/privateClass/responses";

export const usePrivateClassOption = () => {
  const dispatch = useAppDispatch();
  const { teacher } = useAppSelector(selectTeacherProfilePageState);
  const { selectedPrivateClassOption, selectedPrivateClassPackage } =
    useAppSelector(selectTeacherPrivateClassBookings);

  const setSelectedPrivateClassOption = (option: PrivateClassOption) =>
    dispatch(setPrivateClassOption({ privateClassOption: option }));

  const privateClassOptions: PrivateClassOption[] =
    teacher?.private_class_options.filter((option) => option.active) || [];

  const setPrivateClassOptionById = (optionId: number) => {
    const selectedOption = privateClassOptions.find(
      (option) => optionId === option.id
    );
    if (!selectedOption) throw new Error("Couldn't find selectedOption");
    setSelectedPrivateClassOption(selectedOption);
  };

  const setSelectedPrivateClassPackage = (
    packageOption: PrivateClassPackageOption
  ) => {
    dispatch(setPackageOption({ packageOption }));
  };

  return {
    setPrivateClassOptionById,
    setSelectedPrivateClassOption,
    setSelectedPrivateClassPackage,
    privateClassOptions,
    selectedPrivateClassOption,
    selectedPrivateClassPackage,
  };
};
