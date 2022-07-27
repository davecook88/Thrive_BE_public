import React from "react";
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
            <button
              className="btn btn-error text-white btn-sm"
              onClick={(e) => {
                e.preventDefault();
                onRemove(item.id);
              }}
            >
              X
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedList;
