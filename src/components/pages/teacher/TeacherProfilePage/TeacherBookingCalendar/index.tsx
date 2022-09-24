import React, { useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import BigBookingCalendar from "../../../../scheduling/BigBookingCalendar";
import { AvailabilityCalendarEvent } from "../../../../scheduling/BigBookingCalendar/types";
import Modal from "react-modal";
import { selectAvailability } from "../../../../redux/reducers/calendar/availabilitySlice";
import { TeacherBookingCalendarProps } from "./types";
import { eventPropGetter, splitAvailabilitySlots } from "./utils";
import { TeacherBookClassModal } from "../TeacherBookClassModal";
import { useSelectedSlot } from "../hooks/useSelectedSlot";
import { useTeacherProfile } from "../../../../../hooks/useTeacherProfile";

export const TeacherBookingCalendar: React.FC<TeacherBookingCalendarProps> = ({
  classLength,
  displayedDates,
  setDisplayedDates,
}) => {
  const availability = useAppSelector(selectAvailability);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { setSlot } = useSelectedSlot();
  const { teacher } = useTeacherProfile();
  const onSelectEvent = (event: AvailabilityCalendarEvent) => {
    setSlot(event);
    setModalOpen(true);
  };
  if (typeof document === "undefined") return null;
  if (!teacher) return <div>No teacher selected</div>;
  return (
    <div>
      <BigBookingCalendar
        availabilityEntries={splitAvailabilitySlots(
          availability.available,
          availability.booked,
          classLength
        )}
        setDisplayedDates={setDisplayedDates}
        displayedDates={displayedDates}
        onSelectEvent={onSelectEvent}
        height="600px"
        defaultView="month"
        eventPropGetter={eventPropGetter}
      />
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="w-max h-max p-4 bg-white m-auto mt-24 border-4 border-solid border-slate-400"
        appElement={document.getElementById("root") || undefined}
      >
        <TeacherBookClassModal />
      </Modal>
    </div>
  );
};
