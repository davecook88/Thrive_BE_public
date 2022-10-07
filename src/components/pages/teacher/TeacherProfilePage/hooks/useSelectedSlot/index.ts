import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  selectTeacherPrivateClassBookings,
  setSelectedAvailabilitySlot,
} from "../../../../../redux/reducers/teacherPrivateClassBooking/teacherPrivateClassBookingSlice";
import { AvailabilityCalendarEvent } from "../../../../../scheduling/BigBookingCalendar/types";

export const useSelectedSlot = () => {
  const dispatch = useAppDispatch();

  const { selectedAvailabilitySlot } = useAppSelector(
    selectTeacherPrivateClassBookings
  );

  const setSlot = (selectedAvailabilitySlot: AvailabilityCalendarEvent) =>
    dispatch(setSelectedAvailabilitySlot({ selectedAvailabilitySlot }));

  const selectedAvailabilitySlotDates = useCallback(() => {
    if (
      !selectedAvailabilitySlot ||
      !selectedAvailabilitySlot.start ||
      !selectedAvailabilitySlot.end
    )
      throw new Error("selectedAvailabilitySlot not fully set");
    return {
      start: new Date(selectedAvailabilitySlot.start),

      end: new Date(selectedAvailabilitySlot.end),
    };
  }, [selectedAvailabilitySlot]);

  return {
    setSlot,
    selectedAvailabilitySlot,
    selectedAvailabilitySlotDates,
  };
};
