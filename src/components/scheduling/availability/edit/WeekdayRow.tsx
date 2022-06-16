import clsx from "clsx";
import { Moment } from "moment";
import React, { MouseEventHandler } from "react";
import { EditAvailabilityEntry } from "../../../types/availability/editAvailability";

export type AvailabilityInputType = "from" | "until";

interface WeekdayRowProps {
  date: Moment;
  dayName: string;
  entries: EditAvailabilityEntry[];
  addEntry: MouseEventHandler<HTMLButtonElement>;
  removeEntry: MouseEventHandler<HTMLButtonElement>;
  onEntryUpdate: (
    index: number
  ) => (type: AvailabilityInputType, value: string) => void;
}
const WeekdayRow: React.FC<WeekdayRowProps> = ({
  date,
  dayName,
  entries,
  addEntry,
  removeEntry,
  onEntryUpdate,
}) => {
  const inputAvailabilityRows = () => {
    if (!entries) return null;

    return entries.map((entry, index) => {
      return (
        <div
          className="flex items-center justify-between  m-4 "
          key={dayName + index}
        >
          <div>
            <label className="m-4 font-bold">From</label>
            <input
              type={"time"}
              onChange={(event) =>
                onEntryUpdate(index)("from", event.target.value)
              }
            />
          </div>
          <div>
            <label className="m-4 font-bold">Until</label>
            <input
              type={"time"}
              onChange={(event) =>
                onEntryUpdate(index)("until", event.target.value)
              }
            />
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-2 p-2">
        <div>
          <div className="font-bold">{dayName}</div>
          <div>{date.format("LL")}</div>
        </div>

        <div className="p-2 text-center">{inputAvailabilityRows()}</div>
        <div
          aria-label="add_remove_button_holder"
          className="flex flex-row justify-center "
        >
          <div>
            <button
              className={clsx(
                "rounded-full",
                "font-bold",
                "font-lg",
                "bg-blue-400",
                "w-7",
                "h-7",
                "m-2"
              )}
              onClick={removeEntry}
            >
              -
            </button>
          </div>
          <div>
            <button
              className={clsx(
                "rounded-full",
                "font-bold",
                "font-lg",
                "bg-blue-400",
                "w-7",
                "h-7",
                "m-2"
              )}
              onClick={addEntry}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
export default WeekdayRow;
