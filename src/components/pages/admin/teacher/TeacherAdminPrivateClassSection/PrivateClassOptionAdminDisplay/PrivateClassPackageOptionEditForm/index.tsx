import React, { useEffect } from "react";
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
> = ({ privateClassOptionId, refresh, packageOption, closeModal }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PrivateClassPackageOptionEditFormInputs>();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setValue("active", packageOption?.active || false);
    setValue("classCount", packageOption?.class_count || 5);
    setValue("discountPercentage", packageOption?.discount_percentage || 0.1);
  }, [packageOption]);

  const onSubmit: SubmitHandler<
    PrivateClassPackageOptionEditFormInputs
  > = async (data) => {
    console.log(data);
    if (!packageOption) {
      await ApiAdaptor.createPrivateClassPackage(privateClassOptionId, {
        class_count: data.classCount,
        discount_percentage: data.discountPercentage,
        active: data.active,
      });
    } else {
      await ApiAdaptor.putPrivateClassPackage(packageOption.id, {
        class_count: data.classCount,
        discount_percentage: data.discountPercentage,
        active: data.active,
      });
    }

    dispatch(
      showToast({
        message: packageOption ? "Package updated" : "Package created",
      })
    );
    refresh();
    closeModal();
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
      {errors.classCount && (
        <div className="text-info text-xs p-2">
          <span>This field must be a number between 1 and 100.</span>
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
          min: 0,
        })}
      />
      {/* errors will return when field validation fails  */}
      {errors.discountPercentage && (
        <div className="text-info text-xs p-2">
          <span>This field must be a number between 0 and 1.</span>
        </div>
      )}
      <div className="form-control w-20 m-auto my-2">
        <label className="label cursor-pointer">
          <span className="label-text">Active</span>
          <input
            type="checkbox"
            {...register("active")}
            className="checkbox checkbox-primary"
          />
        </label>
      </div>
      <div className="p-4 flex w-full justify-center">
        <input className="btn btn-primary" type="submit" />
      </div>
    </form>
  );
};
