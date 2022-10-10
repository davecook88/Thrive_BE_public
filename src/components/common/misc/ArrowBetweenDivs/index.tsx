import React, { useEffect, useMemo, useState } from "react";
import { ArrowBetweenDivsProps, LineCoordinates } from "./types";

export const ArrowBetweenPoints: React.FC<ArrowBetweenDivsProps> = ({
  lineCoordinates,
  curveOffset,
}) => {
  const [curve, setCurve] = useState("M0 0");
  // mid-point of line:

  const calculateCurve = () => {
    const { end, start } = lineCoordinates;
    var mpx = (end.x + start.x) * 0.5;
    var mpy = (end.y + start.y) * 0.5;
    var theta = Math.atan2(end.y - start.y, end.x - start.x) - Math.PI / 2;
    // location of control point:
    var c1x = mpx + curveOffset * Math.cos(theta);
    var c1y = mpy + curveOffset * Math.sin(theta);
    setCurve(
      `M ${Math.round(start.x)} ${Math.round(start.y)} Q ${Math.round(
        c1x
      )} ${Math.round(c1y)} ${Math.round(end.x)} ${Math.round(end.y)}`
    );
  };

  // distance of control point from mid-point of line:

  // construct the command to draw a quadratic curve

  useEffect(() => {
    calculateCurve();
  }, [lineCoordinates]);

  return (
    <svg className="absolute z-0 hidden h-96 w-full md:block">
      <path
        d={curve}
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        fill="transparent"
        strokeDasharray="3,10"
      ></path>
    </svg>
  );
};
