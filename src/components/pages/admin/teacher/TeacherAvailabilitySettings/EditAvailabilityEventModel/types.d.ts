export interface EditAvailabilityEventModalProps {
  eventDetails?: AvailabilityCalendarEvent;
  checkOverlap: (
    type: BookingStatus,
    details: {
      start: Date;
      end: Date;
    }
  ) => AvailabilityStateEntry[];
  refreshAvailability: () => void;
  close: () => void;
}
