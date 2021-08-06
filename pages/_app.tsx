import { useState, useEffect } from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from './layouts/header/header'
import Footer from './layouts/Footer/footer'
import { useRouter } from 'next/router'


function MyApp({ Component, pageProps }: AppProps) {

  const [loading,setLoading] = useState<boolean>(true);

  useEffect(() => {

    setTimeout(function(){ setLoading(false); }, 500);

    return () => {
      setLoading(true)
    }

  }, [pageProps])


  return (
    <>
    <Header />
    <div className={loading === true ? 'animate-Loading' : ''}>
    <Component {...pageProps} />
    </div>
    
    <Footer />
    </>
  )
}
export default MyApp
