import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/layouts/navbar/Navbar'
import HeroSection from '@/layouts/homepage/HeroSection'
import AboutSection from '@/layouts/homepage/AboutSection'
import Features from '@/layouts/homepage/Features'
import FAQs from '@/layouts/homepage/FAQs'
import Footer from '@/layouts/footer/Footer'
import UseCases from '@/layouts/homepage/UseCases'
import ExpertiseProtection from '@/layouts/homepage/ExpertiseProtection'
import ContactForm from '@/layouts/contact-box/ContactForm'
import SubscribeBox from '@/components/SubscribeBox'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`bg-bg-900 flex flex-col w-screen ${inter.className}`}
    >
        <HeroSection />

        <div className='mt-28 md:mt-48 px-4 md:px-0'>
          <AboutSection />
        </div>

        <div className='mt-36 px-4 md:px-24' id="features">
          <Features />
        </div>

        <UseCases />

        <FAQs />

        <ExpertiseProtection />

        <div className="flex flex-col bg-white pb-24">
          <ContactForm showDescription showMail showTitle />
          <SubscribeBox />
        </div>
        {/* <Footer /> */}
    </main>
  )
}
