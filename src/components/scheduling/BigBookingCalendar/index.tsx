import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import { AvailabilityStateEntry } from "../../types/calendar/types";

import { AvailabilityCalendarEvent, BigBookingCalendarProps } from "./types";
import { CustomToolbar } from "./CustomToolbar";
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const BigBookingCalendar: React.FC<BigBookingCalendarProps> = ({
  height,
  defaultView = "week",
  availabilityEntries,
  onDisplayedDatesUpdate,
  onSelectEvent,
  displayedDates,
  setDisplayedDates,
  eventPropGetter,
}) => {
  const [view, setView] = useState<View>(defaultView);

  useEffect(() => {
    onDisplayedDatesUpdate(displayedDates);
  }, [displayedDates]);

  const formatEvents = (
    entry: AvailabilityStateEntry
  ): AvailabilityCalendarEvent => ({
    title: entry?.title || "",
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
    return availabilityEntries.map(formatEvents);
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
    return availabilityEntries.map(formatEvents);
  };

  return (
    <div style={{ height }}>
      <Calendar
        components={{
          toolbar: CustomToolbar,
        }}
        backgroundEvents={displayBackgroundEvents()}
        scrollToTime={new Date()}
        showMultiDayTimes
        defaultView="week"
        localizer={localizer}
        onView={onViewChange}
        events={displayEvents()}
        eventPropGetter={eventPropGetter}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={onSelectEvent}
        onRangeChange={(dateRange) => calendarRangeChangeHandler(dateRange)}
      />
    </div>
  );
};

export default BigBookingCalendar;
