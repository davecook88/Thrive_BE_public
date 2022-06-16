import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectAvailability } from "../redux/reducers/calendar/availabilitySlice";

import { Calendar, momentLocalizer } from "./ReactBigCalendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AvailabilityStateEntry } from "../types/calendar/types";

const localizer = momentLocalizer(moment); // or globalizeLocalizer

interface Props {
  height: string;
}

interface EventDetails {
  id: string | number;
  title: string;
  start: Date;
  end: Date;
}

const backgroundEvents = [
  {
    id: 0,
    title: "Available for Clients",
    start: new Date(2022, 5, 13, 6),
    end: new Date(2022, 5, 13, 18),
  },
];

const BigBookingCalendar: React.FC<Props> = ({ height }) => {
  const availability = useAppSelector(selectAvailability);
  const dispatch = useAppDispatch();

  const formatEvents = (entry: AvailabilityStateEntry): EventDetails => ({
    title: "available",
    id: entry.from.getTime(),
    start: entry.from,
    end: entry.until,
  });

  const background = {
    id: 0,
    title: "Board meeting",
    start: new Date(2022, 5, 29, 9, 0, 0),
    end: new Date(2022, 5, 29, 13, 0, 0),
    resourceId: 1,
  };

  return (
    <div style={{ height }}>
      <Calendar
        backgroundEvents={backgroundEvents} //{availability.available.map(formatEvents)}
        showMultiDayTimes
        localizer={localizer}
        // events={backgroundEvents}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default BigBookingCalendar;
