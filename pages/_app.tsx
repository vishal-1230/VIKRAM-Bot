import Footer from '@/layouts/footer/Footer'
import Navbar from '@/layouts/navbar/Navbar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <>
  <Navbar />
  <Component {...pageProps} />
  <Footer />
  </>
}
