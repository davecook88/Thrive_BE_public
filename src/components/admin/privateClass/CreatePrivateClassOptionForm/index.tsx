import React, { useState } from "react";
import ApiAdaptor from "../../../../backend/apiAdaptor";
import Dropdown from "../../../common/forms/Dropdown";
import { StandardButton } from "../../../styled/Buttons";

import {
  FormSection,
  StandardForm,
  StandardFormBody,
} from "../../../styled/Form";
import { PrivateClassOptionBase } from "../../../types/privateClass/payloads";
import { CreatePrivateClassOptionFormProps } from "./types";

export const PRIVATE_CLASS_DURATION_OPTIONS = [30, 60];

export const CreatePrivateClassOptionForm: React.FC<
  CreatePrivateClassOptionFormProps
> = ({ teacherId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState<number>(60);
  const [price, setPrice] = useState(0);

  const onSubmit = () => {
    const payload: PrivateClassOptionBase = {
      teacher_id: teacherId,
      name,
      description,
      cents_price: price,
      credits_price: price,
      length_minutes: duration,
    };

    const response = ApiAdaptor.postPrivateClassOption(payload);
    console.log(response);
  };

  return (
    <StandardForm>
      <StandardFormBody>
        <FormSection>
          <div className="p-2">
            <label className="input-group">
              <span className="text-xs bg-primary text-base-100">
                Private Class Name
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              onChange={(t) => setDuration(t as number)}
              value={duration}
            />
          </div>
          <div className="p-2">
            <span className="">Price (cents)</span>
            <input
              value={price}
              onChange={(e) => {
                const priceVal = Number(e.target.value);
                setPrice(priceVal);
              }}
              placeholder="Set your price"
              className="input input-bordered "
            />
          </div>
          <div className="flex items-center justify-center p-2">
            <StandardButton
              className="bg-primary border-none drop-shadow-md btn-wide text-white hover:bg-secondary mx-2"
              onClick={(e: React.SyntheticEvent) => {
                e.preventDefault();
                onSubmit();
              }}
            >
              Create Private Class
            </StandardButton>
          </div>
        </FormSection>
      </StandardFormBody>
    </StandardForm>
  );
};
