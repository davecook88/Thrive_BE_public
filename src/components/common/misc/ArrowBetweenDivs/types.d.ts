export type LineCoordinatesEntry = { x: number; y: number };
export type LineCoordinates = {
  start: LineCoordinatesEntry;
  end: LineCoordinatesEntry;
};

export type ArrowBetweenDivsProps = {
  lineCoordinates: LineCoordinates;
  curveOffset: number;
};
