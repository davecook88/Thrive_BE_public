import clsx from "clsx";
import React, { useState } from "react";
import { RepeatOption } from ".";

interface RepeatMenuProps {
  repeatClass: boolean;
  setRepeatClass: React.Dispatch<React.SetStateAction<boolean>>;
  repeatEvery: RepeatOption;
  setRepeatEvery: React.Dispatch<React.SetStateAction<RepeatOption>>;
  repeatTimes: number;
  setRepeatTimes: React.Dispatch<React.SetStateAction<number>>;
}

export const RepeatMenu: React.FC<RepeatMenuProps> = ({
  repeatClass,
  repeatEvery,
  repeatTimes,
  setRepeatClass,
  setRepeatEvery,
  setRepeatTimes,
}) => {
  const [repeatEveryMenuOpen, setRepeatEveryMenuOpen] = useState(false);
  const [repeatTimesMenuOpen, setRepeatTimesMenuOpen] = useState(false);

  const repeatEveryOption = () => (
    <div>
      Repeat every{" "}
      <span
        className="font-bold cursor-pointer"
        onClick={() => setRepeatEveryMenuOpen(true)}
      >
        {repeatEvery}
      </span>
      <div className={clsx(repeatEveryMenuOpen || "hidden")}>
        <ul className="menu bg-base-200 w-3/6 rounded m-auto">
          {Object.keys(RepeatOption).map((option) => (
            <li className="justify-center" key={option}>
              <a
                className="m-auto p-0.5 "
                onClick={() => {
                  setRepeatEvery(option as RepeatOption);
                  setRepeatEveryMenuOpen(false);
                }}
              >
                {option}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const repeatTimesOptions = () => {
    const timesOptions = [];
    const MAX_TIMES = 12;
    for (let i = 1; i < MAX_TIMES; i++) {
      timesOptions.push(i);
    }
    return (
      <div>
        for{" "}
        <span
          className="font-bold cursor-pointer"
          onClick={() => setRepeatTimesMenuOpen(true)}
        >
          {repeatTimes}
        </span>{" "}
        {repeatEvery}
        {repeatTimes > 1 ? "s" : ""}
        <div className={clsx(repeatTimesMenuOpen || "hidden")}>
          <ul className="menu bg-base-200 w-3/6 rounded m-auto">
            {timesOptions.map((option) => (
              <li className="justify-center" key={String(option)}>
                <a
                  className="m-auto p-0.5 "
                  onClick={() => {
                    setRepeatTimes(Number(option));
                    setRepeatTimesMenuOpen(false);
                  }}
                >
                  {option}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="form-control md:w-4/6 m-auto">
      <label className="label cursor-pointer p-2">
        <span className="label-text">Repeat class</span>
        <input
          type="checkbox"
          checked={repeatClass}
          onChange={() => setRepeatClass((prev) => !prev)}
          className="checkbox checkbox-secondary"
        />
      </label>
      {repeatClass && (
        <>
          <div>{repeatEveryOption()}</div>
          <div>{repeatTimesOptions()}</div>
        </>
      )}
    </div>
  );
};
