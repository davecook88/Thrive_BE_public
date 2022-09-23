import { PrivateClassPackageOption } from "../../../../../types/privateClass/responses";

export interface BookClassModelCallToActionProps {
  privateClassId: number;
  startTime: Date;
  endTime: Date;
  price: number;
  onBookNowClick: () => void;
  packageOptions: PrivateClassPackageOption[];
  setSelectedPackage: (package: PrivateClassPackageOption) => void;
}
