import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  LineCoordinates,
  LineCoordinatesEntry,
} from "../../../../../common/misc/ArrowBetweenDivs/types";
import Image from "next/image";
import { onSuccessCallback } from "../../../../../auth/utils";
import GoogleLogin from "react-google-login";
import { useAuth } from "../../../../../../hooks/useAuth";
import clsx from "clsx";
import {
  calculateArrowCoordinates,
  createArrows,
  isLineCoordinate,
  refAssigner,
} from "./utils";

export const BookCoursePageBookNowFlow = () => {
  const [arrowCoordinates, setArrowCoordinates] = useState<
    LineCoordinatesEntry[]
  >([]);
  const { googleProfile, user } = useAuth();
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const arrowProps: LineCoordinates[] = useMemo(() => {
    const props: Partial<LineCoordinates>[] = [];
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

  const setItemCoordinates = () => {
    const coordinates = calculateArrowCoordinates(itemsRef);
    setArrowCoordinates(coordinates);
  };

  useEffect(() => {
    setItemCoordinates();
  }, [itemsRef]);

  useEffect(() => {
    window.addEventListener("resize", setItemCoordinates);
  }, []);

  return (
    <section className="p-4">
      <div className="m-auto md:w-3/6">
        {createArrows(arrowProps)}
        <div className="w-max p-4">
          <h3 className="text-xl font-bold">Book Now!</h3>

          <div className="my-2">
            <hr className="w-4/6 border-2 border-primary" />
          </div>

          <h4 className="text-xl">Don't miss your place</h4>
        </div>
        <div className="grid md:grid-cols-3">
          <div
            className={clsx(
              "px8 rounded-full border-4 border-base-100 p-4 text-center md:md:w-[110%] md:px-8",
              googleProfile
                ? "bg-neutral text-black"
                : "bg-primary text-base-100"
            )}
            ref={refAssigner(0, itemsRef)}
            id="testid"
          >
            <h4 className={clsx("text-xl font-bold md:m-2")}>Sign in</h4>

            <div className="relative m-auto  my-4 h-8  w-24 cursor-pointer">
              {googleProfile ? (
                `You are already signed in as ${user?.details.name}`
              ) : (
                <>
                  <p>Sign in with your Google account or create one here.</p>
                  <GoogleLogin
                    clientId={
                      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string
                    }
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
                </>
              )}
            </div>
          </div>

          <div
            className="h-min rounded-full border-4 border-base-100 bg-primary p-4 text-center text-base-100 md:-mt-10 md:mb-10 md:w-[110%] md:px-8"
            ref={refAssigner(1, itemsRef)}
          >
            <h4 className="m-auto my-2 w-4/6 font-bold md:text-xl">
              Pay for your course
            </h4>
            <p>Make a card payment on this page using Stripe.</p>
          </div>
          <div
            className="h-min rounded-full border-4 border-base-100 bg-primary p-4 text-center text-base-100 md:-mt-20 md:mb-20 md:w-[110%] md:p-6 md:px-8"
            ref={refAssigner(2, itemsRef)}
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
