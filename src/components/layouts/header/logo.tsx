import Link from "next/link";
import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex justify-between align-middle w-max">
      <div className="h-10 w-1/6 relative" id="logo-holder">
        <Image
          src="/karen1.webp"
          layout={"fill"}
          className="cursor-pointer"
          style={{ objectFit: "contain" }}
        />
      </div>

      <Link href="/">
        <h3 className="text-primary cursor-pointer md:text-2xl font-extrabold self-center w-72 md:w-96 ">
          Thrive In Spanish
        </h3>
      </Link>
    </div>
  );
};

export default Logo;
