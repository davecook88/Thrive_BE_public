import React, { useState,useEffect } from "react";

const Toggle = () => {
  const [checked, setChecked] = useState<boolean | null>(null);

  const ToggleNow = () =>{
    setChecked(!checked)
    if(checked === true){
          localStorage.theme = 'dark';
        document.documentElement.classList.add('dark')
    } 
    if(checked === false){
              localStorage.theme = 'light';
        document.documentElement.classList.remove('dark')
    }
  }

  // useEffect(() => {
  //   // if(localStorage.theme = 'light'){
  //   //   document.documentElement.classList.remove('dark')
  //   // }
  //   if(localStorage.theme = 'dark'){
  //     document.documentElement.classList.add('dark');
  //     setChecked(true);
  //   }
  // }, [])

  // const CheckMe = () => {
  //   if(localStorage.theme = 'dark'){
  //     document.documentElement.classList.add('dark')
  //   } else {
  //     checked === false;
  //   }

  //   return checked;
 
  // }

  return (
    <>
      <div className="form-control">
        <label className="cursor-pointer label space-x-5">
          <input type="checkbox"  onChange={ToggleNow} className="toggle toggle-secondary" />
          <span className="label-text">Dark Mode</span>
        </label>
      </div>
    </>
  );
};

export default Toggle;
