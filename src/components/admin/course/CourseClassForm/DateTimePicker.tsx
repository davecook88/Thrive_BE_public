import moment from "moment";
import React from "react";

interface DateTimePickerProps {
  onChange: (date: Date) => void;
  value: Date;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ onChange, value }) => {
  const onUpdate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    try {
      const { value } = e.target;
      const date = new Date(value);
      onChange(date);
    } catch (err: any) {
      alert(err.message);
    }
  };
  return (
    <div className="relative">
      <input
        type="datetime-local"
        className="bg-base-100"
        onChange={onUpdate}
        value={moment(value).format("yyyy-MM-DDTHH:mm")}
      />{" "}
    </div>
  );
};

export default DateTimePicker;
