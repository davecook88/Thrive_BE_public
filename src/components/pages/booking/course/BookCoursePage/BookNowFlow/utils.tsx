import { ArrowBetweenPoints } from "../../../../../common/misc/ArrowBetweenDivs";
import { LineCoordinates } from "../../../../../common/misc/ArrowBetweenDivs/types";

export const createArrows = (arrowProps: LineCoordinates[]) =>
  arrowProps.map((arrowCoordinates) => (
    <ArrowBetweenPoints lineCoordinates={arrowCoordinates} curveOffset={-100} />
  ));

export const refAssigner =
  (i: number, itemsRef: React.MutableRefObject<HTMLDivElement[]>) =>
  (el: HTMLDivElement | null) => {
    if (!el) return;
    itemsRef.current[i] = el;
  };

export const isLineCoordinate = (
  coordinate: LineCoordinates | Partial<LineCoordinates>
): coordinate is LineCoordinates => {
  if (coordinate.end && coordinate.start) return true;
  return false;
};

export const calculateArrowCoordinates = (
  itemsRef: React.MutableRefObject<HTMLDivElement[]>
) =>
  itemsRef.current
    .filter((ref) => ref.parentElement?.parentElement)
    .map((ref) => {
      if (!ref.parentElement) throw new Error();
      const parentsParent = ref.parentElement.parentElement as HTMLElement;
      return {
        x: ref.offsetLeft - parentsParent.offsetLeft + ref.clientWidth / 2,
        y: ref?.offsetTop - parentsParent.offsetTop + ref.clientHeight,
      };
    });
