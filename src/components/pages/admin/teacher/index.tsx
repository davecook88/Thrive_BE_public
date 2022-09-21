import React, { useEffect, useState } from "react";
import { View } from "react-big-calendar";
import CalendarMenu from "../../../calendar/CalendarMenu";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchAvailabilityAsync,
  selectAvailability,
} from "../../../redux/reducers/calendar/availabilitySlice";
import EditAvailabilityForm from "../../../scheduling/availability/edit";
import { StandardButton } from "../../../styled/Buttons";
import { BookingStatus } from "../../../types/calendar/types";
import Modal from "react-modal";

import {
  AvailabilityCalendarEvent,
  DisplayDatesType,
} from "../../../scheduling/BigBookingCalendar/types";
import BigBookingCalendar from "../../../scheduling/BigBookingCalendar";
import { getDefaultDisplayDates } from "../../../scheduling/BigBookingCalendar/utils";
import EditAvailabilityEventModal from "./TeacherAvailabilitySettings/EditAvailabilityEventModel";
import { SelectCalendarEventTypeDropdown } from "./SelectCalendarEventTypeDropdown";
import { CreatePrivateClassOptionForm } from "../../../admin/privateClass/CreatePrivateClassOptionForm";
import {
  fetchTeacherAsync,
  selectTeacherProfilePageState,
} from "../../../redux/reducers/teachers/TeacherProfilePageSlice/slice";
import { AdminTeacherPrivateClassOptions } from "./AdminTeacherPrivateClassOptions";

interface TeacherAvailabilitySettingsProps {
  height?: string;
  defaultView?: View;
  teacherId: number;
}
export const TeacherAvailabilitySettings: React.FC<
  TeacherAvailabilitySettingsProps
> = ({ height = "600px", defaultView = "month", teacherId }) => {
  const [view, setView] = useState<View>(defaultView);
  const [displayAvailabilityForm, setDisplayAvailabilityForm] =
    useState<boolean>(false);
  const [editModelOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<
    AvailabilityCalendarEvent | undefined
  >();
  const [displayEventType, setDisplayEventType] =
    useState<BookingStatus>("available");
  const availability = useAppSelector(selectAvailability);
  const teacherState = useAppSelector(selectTeacherProfilePageState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTeacherAsync({ teacherId }));
  }, []);

  const onDisplayedDatesUpdate = (displayedDates: DisplayDatesType) => {
    dispatch(fetchAvailabilityAsync({ teacherId, ...displayedDates }));
  };

  const [displayedDates, setDisplayedDates] = useState<DisplayDatesType>(
    getDefaultDisplayDates()
  );

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

  const addAvailability = () => {
    // setSelectedEvent(undefined);
    setEditModalOpen(true);
  };

  const onSelectEvent = (event: AvailabilityCalendarEvent) => {
    setSelectedEvent(event);
    setEditModalOpen(true);
  };
  return (
    <div>
      {displayAvailabilityForm && <EditAvailabilityForm />}
      <CalendarMenu>
        <SelectCalendarEventTypeDropdown
          onEventTypeChange={setDisplayEventType}
          selectedEventType={displayEventType}
        />
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
      <BigBookingCalendar
        availabilityEntries={availability[displayEventType]}
        onDisplayedDatesUpdate={onDisplayedDatesUpdate}
        onSelectEvent={onSelectEvent}
        height={height}
        defaultView="month"
        displayedDates={displayedDates}
        setDisplayedDates={setDisplayedDates}
      />
      <Modal
        isOpen={editModelOpen}
        onRequestClose={() => setEditModalOpen(false)}
        className="w-max h-max p-4 bg-white m-auto mt-24 border-4 border-solid border-slate-400"
      >
        {
          <EditAvailabilityEventModal
            eventDetails={undefined}
            checkOverlap={checkOverlap}
            refreshAvailability={() => {
              dispatch(
                fetchAvailabilityAsync({ teacherId, ...displayedDates })
              );
            }}
            close={() => setEditModalOpen(false)}
          />
        }
      </Modal>
      <CreatePrivateClassOptionForm teacherId={teacherId} />
      <AdminTeacherPrivateClassOptions
        options={teacherState.teacher?.private_class_options || []}
      />
    </div>
  );
};
