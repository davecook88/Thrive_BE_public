import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './layouts/header/header'
import Footer from './layouts/Footer/footer'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Header />
    <Component {...pageProps} />
    <Footer />
    </>
  )
}
export default MyApp
