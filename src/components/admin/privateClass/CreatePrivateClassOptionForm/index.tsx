import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ApiAdaptor from "../../../../backend/apiAdaptor";
import Dropdown from "../../../common/forms/Dropdown";
import { usePrivateClassAdmin } from "../../../pages/admin/teacher/TeacherAdminPrivateClassSection/hooks/usePrivateClassAdmin";
import { useTeacherAdmin } from "../../../pages/admin/teacher/hooks/useTeacherAdmin";
import { StandardButton } from "../../../styled/Buttons";

import {
  FormSection,
  StandardForm,
  StandardFormBody,
} from "../../../styled/Form";
import { PrivateClassOptionBase } from "../../../types/privateClass/payloads";
import {
  CreatePrivateClassOptionFormProps,
  PrivateClassOptionEditFormInputs,
} from "./types";
import tw from "tailwind-styled-components";

export const PRIVATE_CLASS_DURATION_OPTIONS = [30, 60];

export const CreatePrivateClassOptionForm: React.FC<
  CreatePrivateClassOptionFormProps
> = ({ teacherId, formRef }) => {
  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
  } = useForm<PrivateClassOptionEditFormInputs>();

  const { refreshTeacher } = useTeacherAdmin();

  const { selectedPrivateClassOption, clearSelectedPrivateClass } =
    usePrivateClassAdmin();

  useEffect(() => {
    setValue("name", selectedPrivateClassOption?.name || "");
    setValue("description", selectedPrivateClassOption?.description || "");
    setValue("duration", selectedPrivateClassOption?.length_minutes || 30);
    setValue("price", selectedPrivateClassOption?.cents_price || 0);
    setValue("active", selectedPrivateClassOption?.active || false);
  }, [selectedPrivateClassOption]);

  const onSubmit: SubmitHandler<PrivateClassOptionEditFormInputs> = async (
    data
  ) => {
    const payload: PrivateClassOptionBase = {
      teacher_id: teacherId,
      name: data.name,
      description: data.description,
      cents_price: data.price,
      credits_price: data.price,
      length_minutes: data.duration,
      active: data.active,
    };
    if (selectedPrivateClassOption) {
      await ApiAdaptor.putPrivateClassOption(
        selectedPrivateClassOption.id,
        payload
      );
    } else {
      await ApiAdaptor.postPrivateClassOption(payload);
    }
    clearSelectedPrivateClass();
    refreshTeacher();
  };

  const FormBody = tw.div`
  w-max
  p-4
  rounded-sm
  shadow-sm
  border
  border-primary
  m-auto`;
  return (
    <StandardForm onSubmit={handleSubmit(onSubmit)}>
      <FormBody ref={formRef}>
        <div className="p-2">
          <label className="input-group">
            <span className="text-xs bg-primary text-base-100">
              Private Class Name
            </span>
            <input
              {...register("name", {
                required: true,
                value: selectedPrivateClassOption?.name,
              })}
              type="text"
              placeholder="Name your private class"
              className="input input-bordered w-full"
            />
          </label>
        </div>
        <div className="p-2">
          <label className="input-group">
            <span className="text-xs bg-primary text-base-100">
              Private Class Description
            </span>
            <input
              type="text"
              {...register("description", {
                required: true,
              })}
              placeholder="Describe your private class"
              className="input input-bordered w-full"
            />
          </label>
        </div>
        <div className="p-2">
          <label>Set class duration (minutes)</label>
          <Dropdown
            options={PRIVATE_CLASS_DURATION_OPTIONS.map((t) => ({
              name: String(t),
              id: t,
            }))}
            name="duration"
            rules={{
              required: true,
            }}
            register={register}
          />
        </div>
        <div className="p-2">
          <span className="">Price (cents)</span>
          <input
            {...register("price", {
              required: true,
              valueAsNumber: true,
            })}
            placeholder="Set your price"
            className="input input-bordered "
          />
        </div>
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
        <div className="flex items-center justify-center p-2">
          <StandardButton
            className="bg-primary border-none drop-shadow-md btn-wide text-white hover:bg-secondary mx-2"
            type="submit"
          >
            {selectedPrivateClassOption
              ? "Edit Private Class"
              : "Create Private Class"}
          </StandardButton>
        </div>
      </FormBody>
    </StandardForm>
  );
};
