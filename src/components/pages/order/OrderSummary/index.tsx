import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { StandardButton } from "../../../styled/Buttons";
import { useOrderSummary } from "./hook";

export const OrderSummary = () => {
  const { invoice } = useOrderSummary();
  return (
    <>
      <section>
        <div className=" w-full bg-primary p-8">
          <div className="flex w-full justify-center p-4 text-4xl text-base-100">
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>
          <div className="w-full p-4 text-center text-base-100">
            <h1 className="p-2 text-2xl font-extrabold">
              Your payment was successful!
            </h1>
            <h2>Thank you very much for your order</h2>
          </div>
        </div>
        <div id="order-confirmation-section"></div>{" "}
      </section>{" "}
      <section className="w-full">
        <div className="m-auto -mt-6 w-5/6 rounded-sm border-2 border-black bg-base-100 p-12 md:w-2/6">
          <div className="w-full text-center">
            <h3 className="text-xl font-bold">You ordered:</h3>

            <hr className="m-4 border border-black" />
          </div>
          <table className="mb-8">
            <tbody>
              {invoice?.line_items.map((item) => (
                <tr>
                  <td>{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr className=" border border-black" />
          <div className="w-full p-4 text-center">
            <p className="">
              See all of your account details on your profile page.
            </p>
          </div>
          <div className="flex w-full justify-center">
            <Link href="/user/me">
              <StandardButton className="btn-info">
                See my profile
              </StandardButton>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
