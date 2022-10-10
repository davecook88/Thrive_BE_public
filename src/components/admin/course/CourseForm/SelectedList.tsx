import React from "react";
import { DeleteButton } from "../../../common/buttons/DeleteButton";
interface SelectedListProps {
  items: { id: string | number; name: string }[];
  onRemove?: (id: string | number) => void;
}
const SelectedList: React.FC<SelectedListProps> = ({ items, onRemove }) => {
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="m-4/6 flex justify-between border-b-2 p-1"
        >
          <div>{item.name}</div>
          <div>
            {onRemove && (
              <DeleteButton
                clickHandler={() => {
                  onRemove(item.id);
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedList;
