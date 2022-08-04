import { useState, useEffect } from "react";
import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/layouts/header/header";
import Footer from "../components/layouts/Footer/footer";
import { store } from "../components/redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { Toast } from "../components/common/alerts/toast";

function Thrive({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="cupcake">
      <Provider store={store}>
        <Toast />
        <Header />

        <section className={"bg-base-100"}>
          <Component {...pageProps} />
        </section>

        <Footer />
      </Provider>
    </ThemeProvider>
  );
}
export default Thrive;
