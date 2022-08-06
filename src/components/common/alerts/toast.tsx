import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../../redux/hooks";
import { selectToast } from "./toastSlice";

export const Toast = () => {
  // TODO: style toast. Make use of promise settings to show request in progresss
  const toastState = useAppSelector(selectToast);

  useEffect(() => {
    if (!toastState.message) return;
    toast(toastState.message);
  }, [toastState.message]);

  return <ToastContainer />;
};
