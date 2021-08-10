import React from "react";
import Toggle from "../../toggle";
import GithubIcon from "../../icons/github";
import Link from "next/link";

const Navigation = () => {
  return (
    <div>
      <div className="ml-10 flex items-baseline space-x-4 gap-4">
        

        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>

        <div>
          <Link href="/about">
            <a>About Us</a>
          </Link>
        </div>

        {/* <div className="place-self-center">
        <a className="flex gap-1">Github <GithubIcon /></a>
          
        </div> */}
        <div className="place-self-center">
          
          <Toggle />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
