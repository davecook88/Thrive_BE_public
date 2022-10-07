import { MutableRefObject } from "react";

export type CreatePrivateClassOptionFormProps = {
  teacherId: number;
  formRef?: MutableRefObject<HTMLDivElement | undefined>;
};

export type PrivateClassOptionEditFormInputs = {
  name: string;
  description: string;
  duration: number;
  price: number;
  active: bool;
};
