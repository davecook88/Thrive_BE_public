import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  selectTeacherPrivateClassBookings,
  setReadyForPayment,
} from "../../../../../redux/reducers/teacherPrivateClassBooking/teacherPrivateClassBookingSlice";

export const useTeacherProfilePayment = () => {
  const dispatch = useAppDispatch();
  const { readyForPayment } = useAppSelector(selectTeacherPrivateClassBookings);

  const showPaymentScreen = () =>
    dispatch(setReadyForPayment({ readyForPayment: true }));

  const hidePaymentScreen = () =>
    dispatch(setReadyForPayment({ readyForPayment: false }));

  return { hidePaymentScreen, showPaymentScreen, readyForPayment };
};
