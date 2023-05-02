import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/layouts/navbar/Navbar'
import HeroSection from '@/layouts/homepage/HeroSection'
import AboutSection from '@/layouts/homepage/AboutSection'
import Features from '@/layouts/homepage/Features'
import FAQs from '@/layouts/homepage/FAQs'
import Footer from '@/layouts/footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex flex-col w-screen ${inter.className}`}
    >
        <Navbar />
        <HeroSection />
        <div className='mt-48'>
          <AboutSection />
        </div>
        <Features />
        <FAQs />
        <Footer />
    </main>
  )
}
