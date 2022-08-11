import React from "react";
import { BorderedSection } from "../../../styled/Containers";

import { UnitResponse } from "../../../types/level/response";
import { UnitDetails } from "./DisplayUnitDetails";

interface DisplayUnitListProps {
  units: UnitResponse[];
}

export const DisplayUnitList: React.FC<DisplayUnitListProps> = ({
  units = [],
}) => {
  return (
    <div className="p-4 w-full">
      <BorderedSection>
        <h2 className="uppercase text-lg font-bold">Units</h2>
        <div className="flex">
          {units.length ? (
            units.map((u) => <UnitDetails key={u.id} unit={u} />)
          ) : (
            <div></div>
          )}
        </div>
      </BorderedSection>
    </div>
  );
};
