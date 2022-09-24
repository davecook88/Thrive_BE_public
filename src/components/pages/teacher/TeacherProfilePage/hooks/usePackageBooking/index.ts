import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  fetchActivePackageBookingsAsync,
  selectTeacherPrivateClassBookings,
  setPackageBookingToApply,
} from "../../../../../redux/reducers/teacherPrivateClassBooking/teacherPrivateClassBookingSlice";
import { PrivateClassPackageBooking } from "../../../../../types/privateClass/responses";

export const usePackageBooking = () => {
  const dispatch = useAppDispatch();
  const {
    activePackageBookings,
    packageBookingToApply,
    selectedPrivateClassOption,
  } = useAppSelector(selectTeacherPrivateClassBookings);

  const selectPackageBookingToApply = (
    packageBooking: PrivateClassPackageBooking
  ) => {
    dispatch(setPackageBookingToApply({ booking: packageBooking }));
  };

  const clearSelectedPackageBookingToApply = () => {
    dispatch(setPackageBookingToApply({ booking: null }));
  };

  const fetchActiveBookings = () => dispatch(fetchActivePackageBookingsAsync());

  useEffect(() => {
    fetchActiveBookings();
  }, []);

  /*
   * @description Packages which have been booked
   * for the selected private class option
   */
  const applicableBookings = useMemo(() => {
    if (!selectedPrivateClassOption) return [];
    return activePackageBookings.filter(
      (booking: PrivateClassPackageBooking) =>
        booking.private_class_id === selectedPrivateClassOption.id
    );
  }, [selectedPrivateClassOption]);

  return {
    activePackageBookings,
    packageBookingToApply,
    applicableBookings,
    selectPackageBookingToApply,
    clearSelectedPackageBookingToApply,
    fetchActiveBookings,
    fetchActivePackageBookingsAsync,
  };
};
