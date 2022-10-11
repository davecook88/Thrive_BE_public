import React, { useState } from "react";
import NavIcon from "../../icons/navicon";
import Logo from "./logo";
import Navigation from "./Navigation";

const Header = () => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState<boolean>(false);

  return (
    <section className="header fixed top-0 z-50 w-full bg-base-100 shadow-sm">
      <div className="container mx-auto ">
        <div className="mx-auto flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="z-10 flex-none	">
            <Logo />
          </div>

          <div
            className="flex-none  gap-4 lg:hidden"
            onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
          >
            <NavIcon color="#ff4b00" />
          </div>

          <div
            className={`z-0 w-full flex-col text-sm lg:flex lg:w-auto lg:flex-row lg:items-center lg:justify-center	${
              mobileMenuIsOpen ? `block animate-slideIn` : `hidden`
            }`}
          >
            <div className={`${mobileMenuIsOpen ? `p-2 	` : ` float-right`}`}>
              <Navigation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
