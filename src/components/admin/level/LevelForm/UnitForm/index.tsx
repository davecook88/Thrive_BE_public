import React, { useEffect, useState } from "react";
import ApiAdaptor from "../../../../../backend/apiAdaptor";
import { showToast } from "../../../../common/alerts/toastSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import { StandardButton } from "../../../../styled/Buttons";
import {
  FormSection,
  StandardForm,
  StandardFormBody,
} from "../../../../styled/Form";
import { CreateUnitPayload } from "../../../../types/level/payloads";
import { LevelResponse, UnitResponse } from "../../../../types/level/response";
import InputSlider from "../../../course/CourseForm/InputSlider";

interface UnitFormProps {
  level: LevelResponse;
  unitNumber: number;
  unit?: UnitResponse;
  refresh: () => void;
}

export const UnitForm: React.FC<UnitFormProps> = ({
  level,
  unit,
  unitNumber,
  refresh,
}) => {
  const [name, setName] = useState(`Unit ${unitNumber}`);
  const [description, setDescription] = useState<string | undefined>();

  const [position, setPosition] = useState(unitNumber);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    // Update states with selected courseClass if it exists
    const _name = unit ? unit.name : `Unit ${unitNumber}`;
    setName(_name);
    const _description = unit?.description;
    if (_description) setDescription(_description);
    const _position = unit?.position || unitNumber;
    setPosition(_position);
  }, [unit]);

  const dispatch = useAppDispatch();

  const displayToast = (message: string) => {
    dispatch(
      showToast({
        message,
      })
    );
  };

  const validateInput = () => {
    const _errors = [];
    if (!name) _errors.push("Give this unit a name");
    setErrors(_errors);
    return _errors.length > 0;
  };

  const onSubmitUnit = () => {
    const invalidInput = validateInput();
    if (invalidInput) return;
    if (!unit) {
      createUnit({
        position,
        name: name,
        description,
        level_id: level.id,
      });
    } else {
      updateUnit(unit.id, {
        position,
        name: name,
        description,
        level_id: level.id,
      });
    }
    refresh();
  };

  const deleteUnit = async (unitId: number, unitName: string) => {
    await ApiAdaptor.deleteUnit(unitId);
    displayToast(`Unit ${unitName} deleted`);

    refresh();
  };

  const createUnit = async (payload: CreateUnitPayload) => {
    await ApiAdaptor.postUnit(payload);
    displayToast("Unit created!");
  };

  const updateUnit = async (unitId: number, payload: CreateUnitPayload) => {
    await ApiAdaptor.putUnit(unitId, payload);
    displayToast("Unit updated!");
  };

  const displayErrors = () => {
    return (
      <div className="text-center text-error">
        {errors.map((err) => (
          <div>{err}</div>
        ))}
      </div>
    );
  };

  return (
    <StandardForm>
      <StandardFormBody>
        <FormSection className="md:col-start-2">
          <div className="p-2">
            <label className="input-group">
              <span className="text-xs bg-secondary">Unit Name</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name your unit"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="p-2">
            <label className="input-group  h-25">
              <span className="text-xs bg-secondary">Description</span>
              <textarea
                rows={10}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="This unit focuses on..."
                className="input input-bordered w-full h-25"
              />
            </label>
          </div>
          <InputSlider
            onChange={(val) => setPosition(val)}
            value={position}
            title="Position"
          />
        </FormSection>
      </StandardFormBody>
      <div className="flex items-center w-full justify-center p-2">
        {unit && (
          <StandardButton
            className="bg-error border-none drop-shadow-md btn-wide mx-2 text-white"
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault();
              deleteUnit(unit.id, unit.name);
            }}
          >
            Delete Unit
          </StandardButton>
        )}
        <StandardButton
          className="bg-primary border-none drop-shadow-md btn-wide mx-2 text-white hover:bg-secondary"
          onClick={(e: React.SyntheticEvent) => {
            e.preventDefault();
            onSubmitUnit();
          }}
        >
          {unit ? "Update Unit" : "Create Unit"}
        </StandardButton>
      </div>
      {displayErrors()}
    </StandardForm>
  );
};
