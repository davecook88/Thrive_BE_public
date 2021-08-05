import React, { useState, useEffect } from "react";

const Toggle = () => {
  const [checked, setChecked] = useState<boolean>();
  // const darkmodeState = useState(localStorage.theme);

  const ToggleNow = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (checked === true) {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    }
    if (checked === false) {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  }, [checked]);

  useEffect(() => {
    if (localStorage.theme === "dark") {
      setChecked(true);
    }
  }, []);

  return (
    <>
      <div className="form-control">
        <label className="cursor-pointer label space-x-5">
          <input
            type="checkbox"
            onChange={ToggleNow}
            className="toggle toggle-secondary"
          />
          <span className="label-text">Dark Mode</span>
        </label>
      </div>
    </>
  );
};

export default Toggle;
