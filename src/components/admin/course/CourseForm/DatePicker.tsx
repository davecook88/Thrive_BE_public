import moment from "moment";
import React from "react";

interface DatePickerProps {
  onChange: (dateString: string) => void;
  value: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange, value }) => {
  const onUpdate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    try {
      const { value } = e.target;
      const date = new Date(value);
      if (date < new Date()) {
        throw new Error("You must select a date in the future");
      }
      onChange(date.toISOString());
    } catch (err: any) {
      alert(err.message);
    }
  };
  return (
    <div className="relative">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <input
        type="date"
        id="select_week_end"
        onChange={onUpdate}
        value={moment(value).toISOString().slice(0, 10)}
      />{" "}
    </div>
  );
};

export default DatePicker;
