import React from "react";
import NavIcon from "../../icons/navicon";
import Logo from "./logo";
import Navigation from "./navigation";

const Header = () => {
  return (
    <>
      <section className="header bg-gray-10 border-b dark:bg-gray-900">
        <div className="flex items-center justify-between h-16 max-w-screen-lg mx-auto gap-4">
          <div className="flex-none">
            <Logo />
          </div>

          <div className="flex-grow float-right	place-self-center">
              <div className="float-right">
              <Navigation  />
              </div>
            
          </div>

          <div className="flex-none  gap-4">
            <NavIcon />
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
