import HeroSection from "@/layouts/about-us/HeroSection"
import Makers from "@/layouts/about-us/Makers"
import MissionVision from "@/layouts/about-us/MissionVision"
import Tribute from "@/layouts/about-us/Tribute"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

function AboutUs() {
  return (
    <div className={`${inter.className}`}>
        
        <HeroSection />

        <Tribute />

        <MissionVision />

        <Makers />

    </div>
  )
}

export default AboutUs