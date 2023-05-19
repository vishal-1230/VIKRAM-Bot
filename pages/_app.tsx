import Footer from '@/layouts/footer/Footer'
import Navbar from '@/layouts/navbar/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


export default function App({ Component, pageProps }: AppProps) {
  
  const router = useRouter()

  const [isAuthPage, setIsAuthPage] = useState(false)
  const [invertColors, setInvertColors] = useState(false)

  useEffect(() => {
    console.log(router.pathname)

    if (router.pathname.startsWith('/auth')) {
      setIsAuthPage(true)
    } else {
      setIsAuthPage(false)
    }
    if (router.pathname.startsWith('/contact-us')) {
      setInvertColors(true)
    }
  }, [router.pathname])

  return <>
  {/* <Navbar /> */}
  {
    !isAuthPage && <Navbar />
  }
  <Component {...pageProps} />
  {
    !isAuthPage && <Footer invertColor={invertColors} />
  }
  </>
}
