import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AvailabilityStateEntry } from "../../types/calendar/types";
import { AvailabilityAsEvent } from "./events/eventPropGetters";

import {
  AvailabilityCalendarEvent,
  BigBookingCalendarProps,
  DisplayDatesType,
} from "./types";
import { getDefaultDisplayDates } from "./utils";
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const BigBookingCalendar: React.FC<BigBookingCalendarProps> = ({
  height,
  defaultView = "week",
  availability,
  onDisplayedDatesUpdate,
  onSelectEvent,
  displayedDates,
  setDisplayedDates,
}) => {
  const [view, setView] = useState<View>(defaultView);

  useEffect(() => {
    onDisplayedDatesUpdate(displayedDates);
  }, [displayedDates]);

  const formatEvents =
    (title?: string) =>
    (entry: AvailabilityStateEntry): AvailabilityCalendarEvent => ({
      title: entry?.title || title || "",
      start: new Date(entry.start),
      end: new Date(entry.end),
      status: entry.status,
      id: entry.id,
    });

  const createStyleMap = () => {
    const styleObj: { [statusName: string]: React.CSSProperties } = {
      booked: {
        backgroundColor: "#ff0000",
      },
    };
    return new Map(Object.entries(styleObj));
  };

  const onViewChange = (view: View) => {
    setView(view);
  };

  const displayBackgroundEvents = () => {
    if (view === "month") return [];
    return availability.available.map(formatEvents("available"));
  };

  const calendarRangeChangeHandler = (
    e:
      | Date[]
      | {
          start: Date;
          end: Date;
        }
  ) => {
    const start = Array.isArray(e) ? e[0] : e.start;
    const end = Array.isArray(e) ? e[e.length - 1] : e.end;
    setDisplayedDates({
      start,
      end,
    });
  };

  const displayEvents = () => {
    const availabileSlots = availability.available.map(
      formatEvents("available")
    );
    const bookedSlots = availability.booked.map(formatEvents());
    if (view !== "month") return bookedSlots;
    return [...bookedSlots, ...availabileSlots];
  };

  return (
    <div style={{ height }}>
      <Calendar
        backgroundEvents={displayBackgroundEvents()}
        scrollToTime={new Date()}
        showMultiDayTimes
        defaultView="week"
        localizer={localizer}
        onView={onViewChange}
        events={displayEvents()}
        eventPropGetter={AvailabilityAsEvent.getStyle(createStyleMap())}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={onSelectEvent}
        onRangeChange={(dateRange) => calendarRangeChangeHandler(dateRange)}
      />
    </div>
  );
};

export default BigBookingCalendar;
