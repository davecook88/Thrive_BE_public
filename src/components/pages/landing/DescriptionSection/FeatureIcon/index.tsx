import React from "react";
import tw from "tailwind-styled-components";
import Image from "next/image";
import { FeatureIconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconHolder = tw.div`
    flex
    justify-center
`;

export const FeatureIcon: React.FC<FeatureIconProps> = ({
  description,
  header,
  icon,
}) => {
  return (
    <div className="p-2">
      <IconHolder>
        <FontAwesomeIcon className="text-primary text-6xl" icon={icon} />
      </IconHolder>
      <div className="p-4 text-center">
        <div className="w-full flex justify-center">
          <h4 className="font-extrabold">{header}</h4>
        </div>
        <div className="w-full flex justify-center p-4 text-sm w-5/6 m-auto">
          <h5>{description}</h5>
        </div>
      </div>
    </div>
  );
};
