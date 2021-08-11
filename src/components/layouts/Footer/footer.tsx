import React from "react";

const Footer = () => {
  return (
    <>
     <div className="container footer mx-auto bg-skin-fill border-t dark:bg-skin-bgdark dark:border-opacity-10">
        <div className="flex flex-wrap items-center justify-between py-4 mx-auto gap-4 ">
                <div className="first">
                    <p className="text-skin-white">© 2021 GitHub, Inc.</p>
                </div>

                <div className="last float-right text-skin-white">
                    <p>© 2021 GitHub, Inc.</p>
                </div>
        </div>
     </div>
    </>
  );
};

export default Footer;
