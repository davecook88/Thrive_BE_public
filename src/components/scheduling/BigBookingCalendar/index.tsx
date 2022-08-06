import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchAvailabilityAsync,
  selectAvailability,
} from "../../redux/reducers/calendar/availabilitySlice";

import { Calendar, Event, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  AvailabilityStateEntry,
  BookingStatus,
} from "../../types/calendar/types";
import { AvailabilityAsEvent } from "./events/eventPropGetters";
import EditAvailabilityEventModal from "./events/EditAvailabilityEventModel";
import Modal from "react-modal";
import CalendarMenu from "../../calendar/CalendarMenu";
import { StandardButton } from "../../styled/Buttons";
import EditAvailabilityForm from "../availability/edit";
const localizer = momentLocalizer(moment); // or globalizeLocalizer

interface BigBookingCalendarProps {
  height: string;
  defaultView: View;
}

export interface AvailabilityCalendarEvent extends Event {
  id: string;
  status: string;
  title: string;
}

export interface CreateAvailabilityCalendarEvent
  extends AvailabilityCalendarEvent {
  start: Date;
  end: Date;
}

const BigBookingCalendar: React.FC<BigBookingCalendarProps> = ({
  height,
  defaultView = "week",
}) => {
  const [displayedDates, setDisplayedDates] = useState<{
    start: Date;
    end: Date;
  }>({
    start: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
    end: new Date(new Date().getTime() + 28 * 24 * 60 * 60 * 1000),
  });
  const [view, setView] = useState<View>(defaultView);
  const [displayAvailabilityForm, setDisplayAvailabilityForm] =
    useState<boolean>(false);
  const [editModelOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<
    AvailabilityCalendarEvent | undefined
  >();
  const availability = useAppSelector(selectAvailability);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAvailabilityAsync(displayedDates));
  }, [displayedDates]);

  const checkOverlap = (
    type: BookingStatus,
    details: { start: Date; end: Date }
  ) => {
    return availability[type].filter(
      (event) =>
        event.start > details.start.getTime() &&
        event.end < details.end.getTime()
    );
  };

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

  const addAvailability = () => {
    setSelectedEvent(undefined);
    setEditModalOpen(true);
  };

  return (
    <div>
      {displayAvailabilityForm && <EditAvailabilityForm />}
      <CalendarMenu>
        <StandardButton onClick={addAvailability}>
          Add Availability
        </StandardButton>
        <StandardButton
          onClick={() => setDisplayAvailabilityForm(!displayAvailabilityForm)}
        >
          {displayAvailabilityForm
            ? "Hide Availability Schedule"
            : "Set Availability Schedule"}
        </StandardButton>
      </CalendarMenu>
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
          onSelectEvent={(event) => {
            setSelectedEvent(event);
            setEditModalOpen(true);
          }}
          onRangeChange={(dateRange) => calendarRangeChangeHandler(dateRange)}
        />
      </div>
      <Modal
        isOpen={editModelOpen}
        onRequestClose={() => setEditModalOpen(false)}
        className="w-max h-max p-4 bg-white m-auto mt-6 border-4 border-solid border-slate-400"
      >
        {
          <EditAvailabilityEventModal
            eventDetails={selectedEvent}
            checkOverlap={checkOverlap}
            refreshAvailability={() =>
              dispatch(fetchAvailabilityAsync(displayedDates))
            }
            close={() => setEditModalOpen(false)}
          />
        }
      </Modal>
    </div>
  );
};

export default BigBookingCalendar;
