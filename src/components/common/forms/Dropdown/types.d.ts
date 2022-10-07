import { UseFormRegister, RegisterOptions, FieldValues } from "react-hook-form";

export interface DropdownOptions {
  onChange?: (val: string | number) => void;
  options: { id: string | number; name: string }[];
  defaultOption?: string;
  value?: string | number;
  register?: UseFormRegister<FieldValues<Register>>;
  rules?: RegisterOptions;
  name?: string;
}
