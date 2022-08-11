import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { selectAdmin } from "./adminSlice";

const AdminFormErrors = () => {
  const { errors } = useAppSelector(selectAdmin);
  return (
    <div className="text-center text-error">
      {errors.map((err) => (
        <div key={err}>{err}</div>
      ))}
    </div>
  );
};

export default AdminFormErrors;
