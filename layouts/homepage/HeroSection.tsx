import React from 'react'
import { Orbitron } from 'next/font/google'
import Button from '@/components/Button'
import Image from 'next/image'

const orbitron = Orbitron({subsets: ['latin'], weight: ["400", "500", "600", "700"]})

function HeroSection() {

  return (
    <div className='flex flex-col'>
        <span className={`text-white ${orbitron.className} font-[700] text-5xl text-center heading-text`} style={{fontWeight: 700, fontSize: "48px"}}>
            GET YOUR OWN <span className='special-gradient-text'>PERSONAL BOT</span><br />AND HAVE IT WORK FOR YOU!
        </span>
        <span className='font-normal text-center' style={{color: "#FFFFFFB2"}}>
            VIKRAM is a platform that lets you create your own bot that learns your preferences and skills. Then helps others on your behalf!!
        </span>
        <Button title="Start Asking" Icon={({extras})=>{
            return <Image src='/assets/button-arrow.svg' className={extras} alt='Arrow' width={15} height={15} priority />
        }} />
    </div>
  )
}

export default HeroSection