import React, { useState, useEffect } from "react";
import MoonIcon from "./icons/moon";
import SunIcon from "./icons/sun";
import { useSelector, useDispatch } from "react-redux";

import { changeDarkMode } from "./redux/reducers/darkMode";

const Toggle = () => {
  const [darkmode, setDarkmode] = useState<boolean>();

  // const datasss = useSelector((state) => state.themeMode.value)
  const dispatch = useDispatch();

  const ToggleNow = () => {
    setDarkmode(!darkmode);
    // dispatch(changeDarkMode(localStorage.theme))
  };

  useEffect(() => {
    if (darkmode === true) {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      dispatch(changeDarkMode(localStorage.theme));
    }
    if (darkmode === false) {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
      dispatch(changeDarkMode(localStorage.theme));
    }
  }, [darkmode]);

  useEffect(() => {
    if (localStorage.theme === "dark") {
      setDarkmode(true);
      // dispatch(changeDarkMode(localStorage.theme))
    }
  }, []);

  return (
    <>
      <a href="#">
        {darkmode === true ? (
          <MoonIcon callfunc={ToggleNow} />
        ) : (
          <SunIcon callfunc={ToggleNow} />
        )}
      </a>
    </>
  );
};

export default Toggle;
