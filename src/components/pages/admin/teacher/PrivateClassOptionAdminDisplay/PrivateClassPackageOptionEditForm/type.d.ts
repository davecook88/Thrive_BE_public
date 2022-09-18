import { PrivateClassPackageOption } from "../../../../../types/privateClass/responses";

export type PrivateClassPackageOptionEditFormProps = {
  packageOption?: PrivateClassPackageOption;
  privateClassOptionId: number;
  refresh: () => void;
};

type PrivateClassPackageOptionEditFormInputs = {
  classCount: number;
  discountPercentage: number;
};
