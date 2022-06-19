import clsx from "clsx";
import moment from "moment";
import { Moment } from "moment";
import React, { MouseEventHandler, useState } from "react";
import { EditAvailabilityEntry } from "../../../types/availability/editAvailability";

export type AvailabilityInputType = "from" | "until";

interface WeekdayRowProps {
  date: Moment | null;
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
    const [start, setStart] = useState<string | undefined>();
    const [end, setEnd] = useState<string | undefined>();
    if (!entries) return null;

    const onUpdate = (
      index: number,
      type: AvailabilityInputType,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const { value } = event.target;
      if (type === "from") {
        setStart(value);
      } else if (type === "until") {
        setEnd(value);
      }

      onEntryUpdate(index)(type, value);
    };

    const showError = () => {
      if (!(start && end)) return;
      const startDate = moment(start, "HH:mm");
      const endDate = moment(end, "HH:mm");
      if (startDate < endDate) return;

      return "From time must be before until time.";
    };

    return entries.map((entry, index) => {
      return (
        <div className="grid grid-cols-3 gap-2" key={dayName + index}>
          <div>
            <label className="m-4 font-bold">From</label>
            <input
              type={"time"}
              onChange={(event) => onUpdate(index, "from", event)}
              value={start}
            />
          </div>
          <div className="col-span-1">
            <label className="m-4 font-bold">Until</label>
            <input
              type={"time"}
              onChange={(event) => onUpdate(index, "until", event)}
              value={end}
            />
          </div>
          <div>
            <span className="text-red-500">{showError()}</span>
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
          <div>{date?.format("LL")}</div>
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
