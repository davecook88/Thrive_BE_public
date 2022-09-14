import { AvailabilityStateEntry } from "../../../../types/calendar/types";

const createCheckAgainstBookedSlots =
  (bookedSlots: AvailabilityStateEntry[]) => (start: number, end: number) => {
    /*
  Check one availability entry to see if it clashes with any booked slots
  */ bookedSlots.forEach((s) => {
      console.log(
        `Booked from: ${new Date(s.start)} until: ${new Date(s.end)}`
      );
    });

    const clashingSlot = bookedSlots.find((bookedSlot) => {
      console.log({
        bookedSlotStart: new Date(bookedSlot.start),
        bookedSlotEnd: new Date(bookedSlot.end),
        start: new Date(start),
        end: new Date(end),
      });
      return (
        (start >= bookedSlot.start && start < bookedSlot.end) ||
        (end > bookedSlot.start && end <= bookedSlot.end)
      );
    });
    const startDate = new Date(start);
    const endDate = new Date(end);
    // if (Boolean(clashingSlot)) debugger;
    return Boolean(clashingSlot);
  };

export const splitAvailabilitySlots = (
  fullAvailability: AvailabilityStateEntry[],
  bookedSlots: AvailabilityStateEntry[],
  slotSizeMinutes: number = 60
) => {
  /*
    Users will select the length of class that they want to take and availability will
    be split into appropriate sized slots for selection
    */
  const slotLengthMilliseconds = slotSizeMinutes * 60 * 1000;
  const splitSlots: AvailabilityStateEntry[] = [];
  const checkClashingClasses = createCheckAgainstBookedSlots(bookedSlots);
  fullAvailability.forEach((availabilityEntry) => {
    let tempStartTime = availabilityEntry.start;
    let tempEndTime = availabilityEntry.start + slotLengthMilliseconds;
    while (tempEndTime <= availabilityEntry.end) {
      if (!checkClashingClasses(tempStartTime, tempEndTime)) {
        splitSlots.push({
          ...availabilityEntry,
          start: tempStartTime,
          end: tempEndTime,
        });
      }
      tempStartTime = tempEndTime;
      tempEndTime = tempStartTime + slotLengthMilliseconds;
    }
  });
  return splitSlots;
};
