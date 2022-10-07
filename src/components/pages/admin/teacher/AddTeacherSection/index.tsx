import React, { useState } from "react";
import ApiAdaptor from "../../../../../backend/apiAdaptor";
import { StandardButton } from "../../../../styled/Buttons";

export const AddTeacherSection = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const clickHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    const res = await ApiAdaptor.createTeacher(email);
    if (res.detail) {
      setError(String(res.detail));
      return;
    }
  };

  return (
    <div className="border border-primary p-4 w-full rounded">
      <h2 className="font-bold text-lg">Add a teacher</h2>
      <form className="form-control w-full ">
        <span className="label-text p-2">Enter user email</span>
        <input
          type="email"
          placeholder="Enter email"
          className="input input-bordered w-full w-full invalid:border-error valid:border-info"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StandardButton
          className="mx-4 my-2 bg-secondary border-secondary text-black hover:bg-base-100"
          onClick={clickHandler}
        >
          Create Teacher
        </StandardButton>
        <span className="label-text text-error">{error}</span>
      </form>
    </div>
  );
};
