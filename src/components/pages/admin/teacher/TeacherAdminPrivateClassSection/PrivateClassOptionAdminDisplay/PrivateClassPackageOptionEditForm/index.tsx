import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ApiAdaptor from "../../../../../../../backend/apiAdaptor";
import { showToast } from "../../../../../../common/alerts/toastSlice";
import { useAppDispatch } from "../../../../../../redux/hooks";

import {
  PrivateClassPackageOptionEditFormInputs,
  PrivateClassPackageOptionEditFormProps,
} from "./type";

export const PrivateClassPackageOptionEditForm: React.FC<
  PrivateClassPackageOptionEditFormProps
> = ({ privateClassOptionId, refresh }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PrivateClassPackageOptionEditFormInputs>();

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<
    PrivateClassPackageOptionEditFormInputs
  > = async (data) => {
    console.log(data);
    const res = await ApiAdaptor.createPrivateClassPackage(
      privateClassOptionId,
      {
        class_count: data.classCount,
        discount_percentage: data.discountPercentage,
      }
    );

    if (!res) return;
    dispatch(
      showToast({
        message: "Package created",
      })
    );
    refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      {/* include validation with required or other standard HTML validation rules */}
      <label className="label">
        <span className="label-text">How many classes? </span>
      </label>
      <input
        className="input input-bordered w-full max-w-xs"
        {...register("classCount", {
          required: true,
          valueAsNumber: true,
          value: 5,
          max: 100,
          min: 1,
        })}
      />
      {/* errors will return when field validation fails  */}
      {errors.discountPercentage && (
        <div className="text-info text-xs p-2">
          <span>This field must be a number between 0.01 and 1.</span>
        </div>
      )}
      {/* include validation with required or other standard HTML validation rules */}
      <label className="label">
        <span className="label-text">
          What percentage discount will you offer?
        </span>
      </label>
      <input
        className="input input-bordered w-full max-w-xs"
        {...register("discountPercentage", {
          required: true,
          valueAsNumber: true,
          value: 0.1,
          max: 1,
          min: 0.01,
        })}
      />
      {/* errors will return when field validation fails  */}
      {errors.discountPercentage && (
        <div className="text-info text-xs p-2">
          <span>This field must be a number between 0.01 and 1.</span>
        </div>
      )}
      <div className="p-4 flex w-full justify-center">
        <input className="btn btn-primary" type="submit" />
      </div>
    </form>
  );
};
