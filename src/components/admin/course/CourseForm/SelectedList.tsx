import React from "react";
import { DeleteButton } from "../../../common/buttons/DeleteButton";
interface SelectedListProps {
  items: { id: string | number; name: string }[];
  onRemove: (id: string | number) => void;
}
const SelectedList: React.FC<SelectedListProps> = ({ items, onRemove }) => {
  return (
    <div>
      {items.map((item) => (
        <div className="flex justify-between m-4/6 p-1 border-b-2">
          <div>{item.name}</div>
          <div>
            <DeleteButton
              clickHandler={() => {
                onRemove(item.id);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedList;
