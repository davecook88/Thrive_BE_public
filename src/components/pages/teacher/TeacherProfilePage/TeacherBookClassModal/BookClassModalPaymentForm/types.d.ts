import {
  PrivateClassOption,
  PrivateClassPackageOption,
} from "../../../../../types/privateClass/responses";

export interface TeacherBookClassModalPaymentFormProps {
  privateClassOption: PrivateClassOption;
  privateClassPackage: PrivateClassPackageOption | null;
  startTime: Date;
}
