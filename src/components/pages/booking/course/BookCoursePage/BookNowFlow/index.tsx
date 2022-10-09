import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { ArrowBetweenPoints } from "../../../../../common/misc/ArrowBetweenDivs";
import {
  LineCoordinates,
  LineCoordinatesEntry,
} from "../../../../../common/misc/ArrowBetweenDivs/types";
import Image from "next/image";
import { useAppDispatch } from "../../../../../redux/hooks";
import { onSuccessCallback } from "../../../../../auth/utils";
import GoogleLogin from "react-google-login";

export const isLineCoordinate = (
  coordinate: LineCoordinates | Partial<LineCoordinates>
): coordinate is LineCoordinates => {
  if (coordinate.end && coordinate.start) return true;
  return false;
};
export const BookCoursePageBookNowFlow = () => {
  const [arrowCoordinates, setArrowCoordinates] = useState<
    LineCoordinatesEntry[]
  >([]);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const refAssigner = (i: number) => (el: HTMLDivElement | null) => {
    if (!el) return;
    itemsRef.current[i] = el;
  };

  const arrowProps: LineCoordinates[] = useMemo(() => {
    const props: Partial<LineCoordinates>[] = [];
    console.log({ props });
    arrowCoordinates.forEach((coordinate, index) => {
      const lastEntry = props.length === 0 ? null : props[props.length - 1];
      const nextEntry: Partial<LineCoordinates> | null =
        index === arrowCoordinates.length - 1 ? null : { start: coordinate };
      if (lastEntry) lastEntry.end = coordinate;
      if (nextEntry) props.push(nextEntry);
    });
    const result: LineCoordinates[] = props.filter((prop) =>
      isLineCoordinate(prop)
    ) as LineCoordinates[];

    return result;
  }, [arrowCoordinates]);

  const createArrows = () =>
    arrowProps.map((arrowCoordinates) => (
      <ArrowBetweenPoints
        lineCoordinates={arrowCoordinates}
        curveOffset={-100}
      />
    ));

  useEffect(() => {
    const coordinates = itemsRef.current
      .filter((ref) => ref.parentElement?.parentElement)
      .map((ref) => {
        if (!ref.parentElement) throw new Error();
        const parentsParent = ref.parentElement.parentElement as HTMLElement;
        return {
          x: ref.offsetLeft - parentsParent.offsetLeft + ref.clientWidth / 2,
          y: ref?.offsetTop - parentsParent.offsetTop + ref.clientHeight,
        };
      });
    console.log({ itemsRef, coordinates });
    setArrowCoordinates(coordinates);
  }, [itemsRef]);

  useEffect(() => {
    if (!window) return;
    createArrows();
  }, [arrowCoordinates]);

  return (
    <section className="p-4">
      <div className="m-auto md:w-3/6">
        {createArrows()}
        <div className="w-max p-4">
          <h3 className="text-xl font-bold">Book Now!</h3>

          <div className="my-2">
            <hr className="w-4/6 border-2 border-primary" />
          </div>

          <h4 className="text-xl">Don't miss your place</h4>
        </div>
        <div className="grid md:grid-cols-3">
          <div
            className="px8 rounded-full border-4 border-base-100 bg-primary p-4 text-center text-base-100 md:md:w-[110%] md:px-8"
            ref={refAssigner(0)}
            id="testid"
          >
            <h4 className="text-xl font-bold md:m-2">Sign in</h4>
            <p>Sign in with your Google account or create one here.</p>

            <div className="relative m-auto  my-4 h-8  w-24 cursor-pointer">
              <GoogleLogin
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
                buttonText="Login"
                render={(renderProps) => (
                  <Image
                    onClick={renderProps.onClick}
                    layout="fill"
                    src="/btn_google_signin_light_normal_web.png"
                  />
                )}
                onSuccess={onSuccessCallback}
                onFailure={console.log}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              />
            </div>
          </div>

          <div
            className="h-min rounded-full border-4 border-base-100 bg-primary p-4 text-center text-base-100 md:-mt-10 md:mb-10 md:w-[110%] md:px-8"
            ref={refAssigner(1)}
          >
            <h4 className="m-auto my-2 w-4/6 font-bold md:text-xl">
              Pay for your course
            </h4>
            <p>Make a card payment on this page using Stripe.</p>
          </div>
          <div
            className="h-min rounded-full border-4 border-base-100 bg-primary p-4 text-center text-base-100 md:-mt-20 md:mb-20 md:w-[110%] md:p-8"
            ref={refAssigner(2)}
          >
            <h4 className="m-auto my-2 w-4/6 font-bold md:text-xl">
              Start studying!
            </h4>
            <p>
              You will be invited to your Google Classrooms group straight away.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
