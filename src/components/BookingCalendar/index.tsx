import React from "react";
import Calendar from "react-calendar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { DateUtils } from "./dateUtils";
import {
  setAvailability,
  selectAvailability,
} from "../redux/reducers/calendar/availabilitySlice";
import "react-calendar/dist/Calendar.css";
import styles from "./calendar.module.css";

const now = new Date();

const BookingCalendar = () => {
  const availability = useAppSelector(selectAvailability);
  const dispatch = useAppDispatch();
  function tileDisabled({ date }: { date: Date }): boolean {
    const clashingSlot = availability.unavailable.find((entry) =>
      DateUtils.isBetweenDates(date, entry)
    );
    return Boolean(clashingSlot);
  }

  const tileClassNames = ({ date }: { date: Date }): string[] => {
    const classNames: string[] = [];
    const isBooked = availability.booked.find((entry) =>
      DateUtils.isBetweenDates(date, entry)
    );

    if (isBooked) classNames.push(styles.booked);

    return classNames;
  };

  const disableDate = () => {
    const toDisable = prompt("Add a date to disable") as string;
    const toDisableDate = new Date(toDisable);
    if (isNaN(toDisableDate.getTime())) {
      alert("invalid date format");
      return;
    }

    const disableUntil = new Date(
      toDisableDate.getTime() + 24 * 60 * 60 * 1000
    );

    dispatch(
      setAvailability({
        status: "unavailable",
        entries: [
          {
            status: "unavailable",
            from: toDisableDate,
            until: disableUntil,
          },
        ],
      })
    );
  };

  return (
    <div>
      <h2>Booking Calendar</h2>
      <button onClick={disableDate}>Test</button>
      <Calendar tileDisabled={tileDisabled} tileClassName={tileClassNames} />
    </div>
  );
};

export default BookingCalendar;
