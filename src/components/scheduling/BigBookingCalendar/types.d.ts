import { Event } from "react-big-calendar";

export type DisplayDatesType = {
  start: Date;
  end: Date;
};

export interface BigBookingCalendarProps {
  height: string;
  defaultView: View;
  availabilityEntries: AvailabilityStateEntry[];
  onSelectEvent: (
    event: AvailabilityCalendarEvent,
    e: React.SyntheticEvent<HTMLElement, globalThis.Event>
  ) => void;
  displayedDates: DisplayDatesType;
  setDisplayedDates: React.Dispatch<React.SetStateAction<DisplayDatesType>>;
  eventPropGetter?: EventPropGetter<AvailabilityCalendarEvent>;
  onDisplayedDatesUpdate?: (dates: DisplayDatesType) => void;
}
export interface AvailabilityCalendarEvent extends Event {
  id?: string;
  title?: string;
}

export interface CreateAvailabilityCalendarEvent
  extends AvailabilityCalendarEvent {
  start: Date;
  end: Date;
}
