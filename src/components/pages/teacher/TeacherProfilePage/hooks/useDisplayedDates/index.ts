import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  selectTeacherPrivateClassBookings,
  setPrivateClassCalendarDisplayedDates,
} from "../../../../../redux/reducers/teacherPrivateClassBooking/teacherPrivateClassBookingSlice";
import { fetchAvailabilityAsync } from "../../../../../redux/reducers/calendar/availabilitySlice";
import { DisplayDatesType } from "../../../../../scheduling/BigBookingCalendar/types";
import { UseDisplayedDatesProps } from "./types";

export function useDisplayedDates({ teacher }: UseDisplayedDatesProps) {
  // Dates displayed in calendar

  const dispatch = useAppDispatch();

  const { calendarDisplayedDates } = useAppSelector(
    selectTeacherPrivateClassBookings
  );

  const displayedDates: DisplayDatesType = useMemo(
    () => ({
      start: new Date(calendarDisplayedDates.start),
      end: new Date(calendarDisplayedDates.end),
    }),
    [calendarDisplayedDates]
  );

  const setDisplayedDates = (displayedDates: DisplayDatesType) => {
    dispatch(
      setPrivateClassCalendarDisplayedDates({
        displayedDates: {
          start: displayedDates.start.toISOString(),
          end: displayedDates.end.toISOString(),
        },
      })
    );
  };

  useEffect(() => {
    if (!teacher?.id) return;
    dispatch(
      fetchAvailabilityAsync({ teacherId: teacher.id, ...displayedDates })
    );
  }, [displayedDates, teacher]);

  return {
    displayedDates,
    setDisplayedDates,
  };
}

export default useDisplayedDates;
