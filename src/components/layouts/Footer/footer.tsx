import React from "react";

const Footer = () => {
  return (
    <>
      <section className="footer border-t bg-skin-fill bg-primary text-base-100">
        <div className="container  mx-auto ">
          <div className="mx-auto flex flex-wrap items-center justify-between gap-4 py-4 ">
            <div className="first w-20">
              <a href="mailto:contact@lakarencita.com">
                <p className="text-skin-white hover:font-bold">Contact us!</p>
              </a>
            </div>

            <div className="last float-right text-skin-white">
              <p>La Karencita ©{new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
