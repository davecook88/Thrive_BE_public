import { PrivateClassOption } from "../../../../types/privateClass/responses";

interface PrivateClassOptionsProps {
  privateClassOptions: PrivateClassOption[];
  onSelectOption: (optionId: number) => void;
}
