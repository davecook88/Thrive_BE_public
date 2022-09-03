export interface DropdownOptions {
  onChange: (val: string | number) => void;
  options: { id: string | number; name: string }[];
  defaultOption?: string;
  value?: string | number;
}
