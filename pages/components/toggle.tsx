import React, { useState } from "react";

const Toggle = () => {
  const [checked, setChecked] = useState<boolean>(true);

  const ToggleNow = () =>{
    setChecked(!checked)
  }

  return (
    <>
      <div className="form-control">
        <label className="cursor-pointer label space-x-5">
          <input type="checkbox" defaultChecked={checked} onChange={ToggleNow} className="toggle toggle-secondary" />
          <span className="label-text">Dark Mode</span>
        </label>
      </div>
    </>
  );
};

export default Toggle;
