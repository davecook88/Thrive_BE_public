import {
  AvailabilityCalendarEvent,
  CreateAvailabilityCalendarEvent,
} from "../../../../../scheduling/BigBookingCalendar/types";

export const eventHasAllDetails = (
  event: AvailabilityCalendarEvent
): event is CreateAvailabilityCalendarEvent => {
  if (!event.start) {
    return false;
  }
  if (!event.end) {
    return false;
  }
  return true;
};
