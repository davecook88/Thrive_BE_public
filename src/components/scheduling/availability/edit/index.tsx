import clsx from "clsx";
import { randomUUID } from "crypto";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  addEditAvailabilityDayEntry,
  DAY_NAMES,
  editAvailabilityConfig,
  removeEditAvailabilityDayEntry,
  resetEditAvailabilityState,
  updateEditAvailabilityDayEntry,
} from "../../../redux/reducers/calendar/editAvailabilitySlice";
import WeekdayRow, { AvailabilityInputType } from "./WeekdayRow";
import { v4 as uuidv4 } from "uuid";
import { StandardButton } from "../../../styled/Buttons";

import ApiAdaptor from "../../../../backend/apiAdaptor";
import { EditAvailabilityEntry } from "../../../types/availability/editAvailability";
import { CreateAvailabilityCalendarEvent } from "../../BigBookingCalendar/types";
export interface CompleteEditAvailabilityEntry extends EditAvailabilityEntry {
  start: number;
  end: number;
}

export const editAvailabilityEntryIsComplete = (
  entry: EditAvailabilityEntry
): entry is CompleteEditAvailabilityEntry =>
  Boolean(entry.end) && Boolean(entry.start);

const getMondayFromDate = (momentDate?: Moment) => {
  const monday = momentDate?.startOf("week") || moment().startOf("week");
  return monday;
};

const multiplyEvents = (
  events: CompleteEditAvailabilityEntry[],
  endDate: Date
) => {
  const allEvents: CompleteEditAvailabilityEntry[] = [];
  events.forEach((event) => {
    let tempEvent = { ...event };
    while (tempEvent.end.valueOf() < endDate.getTime()) {
      allEvents.push(tempEvent);
      // Add exactly one week to
      tempEvent = {
        ...tempEvent,
        id: uuidv4(),
        start: moment(tempEvent.start).add(1, "week").valueOf(),
        end: moment(tempEvent.end).add(1, "week").valueOf(),
      };
    }
  });
  return allEvents;
};

const EditAvailabilityForm = () => {
  const dispatch = useAppDispatch();
  const _editAvailabilityConfig = useAppSelector(editAvailabilityConfig);
  const [weekStart, setWeekStart] = useState<number>(
    getMondayFromDate().valueOf()
  );
  const [weekEnd, setWeekEnd] = useState<number>(
    weekStart + 7 * 24 * 60 * 60 * 1000
  );

  const calculateWeeksSelected = () => {
    return (weekEnd - weekStart) / (7 * 24 * 60 * 60 * 1000);
  };

  const onUpdateEndDate = (timestamp: number) => {
    if (timestamp < weekStart) {
      throw new Error("Your end date must be after the start date");
    }
    setWeekEnd(timestamp);
  };

  const onUpdateDateRange =
    (callback: Function): React.ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      try {
        const { value } = event.target;
        const date = new Date(value);
        if (date < new Date()) {
          throw new Error("You must select a date in the future");
        }
        callback(getMondayFromDate(moment(date)).valueOf());
      } catch (err: any) {
        alert(err.message);
      }
    };

  const onEditAvailability =
    (dayName: string, dateString: string) =>
    (index: number) =>
    (type: AvailabilityInputType, value: string) => {
      const entry = _editAvailabilityConfig.config[dayName][index];
      dispatch(
        updateEditAvailabilityDayEntry({
          dayName,
          entry: {
            ...entry,
            id: entry.id || uuidv4(),
            [type]: moment(
              `${dateString} ${value}`,
              "YYYY-MM-DD HH:mm"
            ).valueOf(),
          },
          entryIndex: index,
        })
      );
    };

  const removeEntry =
    (dayName: string): React.MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      event.preventDefault();
      dispatch(
        removeEditAvailabilityDayEntry({
          dayName,
        })
      );
    };
  const addEntry =
    (dayName: string): React.MouseEventHandler<HTMLButtonElement> =>
    (event) => {
      event.preventDefault();
      dispatch(
        addEditAvailabilityDayEntry({
          dayName: dayName,
        })
      );
    };

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // Send entries to backend
    e.preventDefault();
    if (
      !confirm(
        `Are you sure? This will overwrite settings for ${calculateWeeksSelected()} weeks`
      )
    ) {
      return;
    }
    const availabilityEntries = Object.values(
      _editAvailabilityConfig.config
    ).reduce((acc, val) => acc.concat(val), []);

    const filteredEntries = availabilityEntries.filter((entry) =>
      editAvailabilityEntryIsComplete(entry)
    ) as CompleteEditAvailabilityEntry[];

    for (const entry of filteredEntries) {
      if (new Date(entry.start as number) > new Date(entry.end as number)) {
        alert(`Ensure that all end times are after the start time. Error found here: 
From ${entry.start}
Until: ${entry.end}`);
        return;
      }
    }
    // If multiple weeks selected, multiply events for the additional weeks
    if (!filteredEntries.length) {
      alert("No valid updates to submit");
      return;
    }
    const allWeekEvents = multiplyEvents(filteredEntries, new Date(weekEnd));
    updateAvailability(allWeekEvents);
  };

  const updateAvailability = async (
    entries: CompleteEditAvailabilityEntry[]
  ) => {
    const events: CreateAvailabilityCalendarEvent[] = entries.map((entry) => ({
      id: entry.id || uuidv4(),
      end: new Date(entry.end),
      start: new Date(entry.start),
      status: "available",
      title: "available",
    }));

    const startTimes = entries.map((e) => e.start);
    const endTimes = entries.map((e) => e.end);
    await ApiAdaptor.postAvailability({
      events,
      timeframe: {
        start: new Date(Math.min(...startTimes)),
        end: new Date(Math.max(...endTimes)),
      },
    });
    dispatch(resetEditAvailabilityState({}));
  };

  return (
    <div className="w-full ">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <div id="week_start_section" className="grid grid-cols-4 gap-2">
            <div className="text-center">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="select_week_start"
              >
                Week Beginning
              </label>
              <span id="week_beginning_text">
                {moment(weekStart)?.format("LL")}
              </span>
            </div>
            <div className="text-center">
              <label
                className={clsx(
                  "block",
                  "text-gray-700",
                  "text-sm",
                  "font-bold mb-2"
                )}
                htmlFor="select_week_start"
              >
                Select Start Week
              </label>
              <input
                type="date"
                id="select_week_start"
                onChange={onUpdateDateRange(setWeekStart)}
                value={moment(weekStart).toISOString().slice(0, 10)}
              />
            </div>
            <div className="text-center">
              <label
                className={clsx(
                  "block",
                  "text-gray-700",
                  "text-sm",
                  "font-bold mb-2"
                )}
                htmlFor="select_week_end"
              >
                Select End Week
              </label>
              <input
                type="date"
                id="select_week_end"
                onChange={onUpdateDateRange(onUpdateEndDate)}
                value={moment(weekEnd).toISOString().slice(0, 10)}
              />
            </div>
            <div className="text-center">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="set_multi_week_checkbox"
              >
                Weeks To Update
              </label>
              <span>{calculateWeeksSelected()}</span>
            </div>
          </div>
        </div>
        <div className="w-full text-center">
          <StandardButton onClick={onSubmit}>Save Updates</StandardButton>
        </div>

        <div>
          {DAY_NAMES.map((dayName, index) => {
            const date = moment(moment(weekStart)?.add(index, "days"));
            return (
              <WeekdayRow
                key={dayName}
                dayName={dayName}
                date={calculateWeeksSelected() === 1 ? date : null}
                onEntryUpdate={onEditAvailability(
                  dayName,
                  date.format("YYYY-MM-DD")
                )}
                addEntry={addEntry(dayName)}
                removeEntry={removeEntry(dayName)}
                entries={_editAvailabilityConfig.config[dayName]}
              />
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default EditAvailabilityForm;
