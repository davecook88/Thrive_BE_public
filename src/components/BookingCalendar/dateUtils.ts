import { AvailabilityStateEntry } from "./types";

export class DateUtils {
  static isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.toISOString().slice(0, 10) === date2.toISOString().slice(0, 10)
    );
  };

  static isBetweenDates = (
    compareDate: Date,
    availabilityEntry: AvailabilityStateEntry
  ) =>
    compareDate.getTime() > availabilityEntry.from.getTime() &&
    compareDate.getTime() < availabilityEntry.until.getTime();
}
