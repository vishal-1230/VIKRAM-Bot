import Image from 'next/image'
import { Inter } from 'next/font/google'
import Navbar from '@/layouts/navbar/Navbar'
import HeroSection from '@/layouts/homepage/HeroSection'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex flex-col w-screen ${inter.className}`}
    >
        <Navbar />
        <HeroSection />
    </main>
  )
}
