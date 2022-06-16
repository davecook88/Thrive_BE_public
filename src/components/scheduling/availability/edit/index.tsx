import clsx from "clsx";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  addEditAvailabilityDayEntry,
  DAY_NAMES,
  editAvailabilityConfig,
  removeEditAvailabilityDayEntry,
  updateEditAvailabilityDayEntry,
} from "../../../redux/reducers/calendar/editAvailabilitySlice";
import WeekdayRow, { AvailabilityInputType } from "./WeekdayRow";

const getWeekStart = (moment: Moment) => {
  return moment.startOf("week");
};

const EditAvailabilityForm = () => {
  const dispatch = useAppDispatch();
  const _editAvailabilityConfig = useAppSelector(editAvailabilityConfig);
  const [weekStart, setWeekStart] = useState<Moment>(moment());
  const [everyWeek, setEveryWeek] = useState<boolean>(false);

  const onSelectWeekStart: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { value } = event.target;
    const date = new Date(value);
    setWeekStart(getWeekStart(moment(date)));
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
            [type]: moment(`${dateString} ${value}`, "YYYY-MM-DD HH:mm"),
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

  return (
    <div className="w-full ">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <div id="week_start_section" className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="select_week_start"
              >
                Week Beginning
              </label>
              <span
                className={clsx(everyWeek && "text-white")}
                id="week_beginning_text"
              >
                {weekStart.format("LL")}
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
                Select Week Start
              </label>
              <input
                type="date"
                id="select_week_start"
                disabled={everyWeek}
                onChange={onSelectWeekStart}
              />
            </div>
            <div className="text-center">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="set_every_week_checkbox"
              >
                Every Week?
              </label>
              <input
                id="set_every_week_checkbox"
                type="checkbox"
                onChange={() => setEveryWeek(!everyWeek)}
              />
            </div>
          </div>
        </div>

        <div>
          {DAY_NAMES.map((dayName, index) => {
            const date = moment(weekStart.add(index, "days"));
            return (
              <WeekdayRow
                key={dayName}
                dayName={dayName}
                date={date}
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
        <div className="flex items-center justify-around ">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
};

export default EditAvailabilityForm;
