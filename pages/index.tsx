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
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  async function getInfo() {
    if (localStorage.getItem("token") === null) {
      return null
    } else {
      const res = await fetch("https://server.vikrambots.in/ginfo", {
        headers: {
          "x-access-token": localStorage.getItem("token")!
        }
      })
      const data = await res.json()
      console.log(data)
      if (data.username === data.username_b) {
        localStorage.setItem("user", JSON.stringify({username_b: data.username, name: data.name, phone: data.phone, email: data.email}))
      } else if (data.username_b === "None") {
        localStorage.setItem("user", JSON.stringify({username: data.username, name: data.name, phone: data.phone, email: data.email}))
      } else {
        localStorage.setItem("user", JSON.stringify(data))
      }
    }
  }

  useEffect(()=>{
    if (localStorage.getItem("token")) {
      console.log("token found")
      getInfo()
    } else {
      console.log("token not found")
    }
  }, [])

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
