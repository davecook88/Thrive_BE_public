import React from "react";
import { PrivateClassOptionDisplayProps } from "./types";

export const PrivateClassOptionDisplay: React.FC<
  PrivateClassOptionDisplayProps
> = ({ privateClassOption }) => {
  return (
    <div className="border border-primary p-4 w-max rounded-sm">
      <h4 className="font-extrabold text-center">{privateClassOption.name}</h4>
      {privateClassOption.description && (
        <p>{privateClassOption.description}</p>
      )}
      <ul>
        <li>Price: ${(privateClassOption.credits_price / 100).toFixed(2)}</li>
        <li>Duration: {privateClassOption.length_minutes} minutes</li>
      </ul>
    </div>
  );
};
