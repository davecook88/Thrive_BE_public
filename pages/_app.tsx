import { useEffect } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './layouts/header/header'
import Footer from './layouts/Footer/footer'
import { useRouter } from 'next/router'


function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log("checkme")
    // return () => {
    //   cleanup
    // }
  }, [pageProps])
  return (
    <>
    <Header />
    <Component {...pageProps} />
    <Footer />
    </>
  )
}
export default MyApp
