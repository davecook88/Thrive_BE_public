import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAvailability } from "../../redux/reducers/calendar/availabilitySlice";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AvailabilityStateEntry } from "../../types/calendar/types";

const localizer = momentLocalizer(moment); // or globalizeLocalizer

interface BigBookingCalendarProps {
  height: string;
}

interface EventDetails {
  id: string | number;
  title: string;
  start: Date;
  end: Date;
}

const BigBookingCalendar: React.FC<BigBookingCalendarProps> = ({ height }) => {
  const availability = useAppSelector(selectAvailability);
  const dispatch = useAppDispatch();

  const formatEvents =
    (title?: string) =>
    (entry: AvailabilityStateEntry): EventDetails => ({
      title: entry?.title || title || "",
      id: entry.from.getTime(),
      start: entry.from,
      end: entry.until,
    });

  return (
    <div style={{ height }}>
      <Calendar
        backgroundEvents={availability.available.map(formatEvents("available"))} //{availability.available.map(formatEvents)}
        scrollToTime={new Date()}
        showMultiDayTimes
        defaultView="week"
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default BigBookingCalendar;
