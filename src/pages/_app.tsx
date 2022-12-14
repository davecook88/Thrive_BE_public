import "react-big-calendar/lib/css/react-big-calendar.css";

import "../../styles/calendar.scss";
import "../../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import type { AppProps } from "next/app";
import Header from "../components/layouts/header/header";
import Footer from "../components/layouts/Footer/footer";
import { store } from "../components/redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { Toast } from "../components/common/alerts/toast";

function Thrive({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="lakarencita">
      <Provider store={store}>
        <Toast />
        <Header />

        <section className={"bg-base-100 mt-20 min-h-screen"}>
          <Component {...pageProps} />
        </section>

        <Footer />
      </Provider>
    </ThemeProvider>
  );
}
export default Thrive;
