import Link from "next/link";
import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex justify-between align-middle w-max">
      <div className="h-10 w-1/6 relative" id="logo-holder">
        <img className="h-10" src="/svg/thrive_circle.svg" alt="edit" />
      </div>

      <Link href="/">
        <h3 className="text-primary cursor-pointer md:text-2xl self-center w-max whitespace-nowrap	px-2 ">
          Thrive In Spanish
        </h3>
      </Link>
    </div>
  );
};

export default Logo;
