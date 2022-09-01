import React, { useState } from "react";
import NavIcon from "../../icons/navicon";
import Logo from "./logo";
import Navigation from "./navigation";

const Header = () => {
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState<boolean>(false);

  return (
    <section className="header bg-base-100 fixed w-full shadow-sm z-50 top-0">
      <div className="container mx-auto ">
        <div className="flex flex-wrap items-center justify-between py-4 mx-auto gap-4">
          <div className="flex-none z-10	">
            <Logo />
          </div>

          <div
            className="flex-none  gap-4 lg:hidden"
            onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}
          >
            <NavIcon color="#ff4b00" />
          </div>

          <div
            className={`lg:flex flex-col lg:flex-row lg:items-center lg:justify-center text-sm w-full lg:w-auto z-0	${
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
