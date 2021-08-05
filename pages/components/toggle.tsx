import React, { useState, useEffect } from "react";
import MoonIcon from "./icons/moon";
import SunIcon from "./icons/sun";

const Toggle = () => {
  const [darkmode, setDarkmode] = useState<boolean>();

  const ToggleNow = () => {
    setDarkmode(!darkmode);
  };

  useEffect(() => {
    if (darkmode === true) {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    }
    if (darkmode === false) {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  }, [darkmode]);

  useEffect(() => {
    if (localStorage.theme === "dark") {
      setDarkmode(true);
    }
  }, []);

  return (
    <>
      {/* <div className="form-control">
        <label className="cursor-pointer label space-x-5">
          <input
            type="checkbox"
            onChange={ToggleNow}
            className="toggle toggle-secondary"
          />
          <span className="label-text">Dark Mode</span>
        </label>
      </div> */}
        <a href="#">
        {
        darkmode === true ? 
        <MoonIcon callfunc={ToggleNow}/>
      :
      <SunIcon callfunc={ToggleNow}/>
      }
        </a>
      


    </>
  );
};

export default Toggle;
