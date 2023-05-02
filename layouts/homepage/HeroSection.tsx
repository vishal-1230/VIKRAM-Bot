import React from 'react'
import { Orbitron } from 'next/font/google'
import Button from '@/components/Button'
import Image from 'next/image'
import SpecialText from '@/components/SpecialText'

const orbitron = Orbitron({subsets: ['latin'], weight: ["400", "500", "600", "700"]})

function HeroSection() {

  return (
    <div className='flex flex-col'>
        <span className={`text-white ${orbitron.className} font-bold text-[3.4rem] text-center heading-text mt-24`}>
            GET YOUR OWN <SpecialText>PERSONAL BOT</SpecialText><br />AND HAVE IT WORK FOR YOU!
        </span>
        <span className='font-normal text-[17px] text-center mt-5 text-[#FFFFFFB2]'>
            VIKRAM is a platform that lets you create your own bot that learns your preferences and skills. Then helps others on your behalf!!
        </span>
        <Button title="Start Asking" buttonStyle='mt-10' Icon={({extras} : {extras : string})=>{
            return <Image src='/assets/button-arrow.svg' className={extras} alt='Arrow' width={15} height={15} priority />
        }} />
        <div className='flex flex-row justify-between relative -mt-32'>
          <Image src='/assets/gradient-pink-left.png' alt='Gradient Pink' width={800} height={320} className='-mt-0 absolute left-0' />
          <Image src='/assets/macbook.png' alt='Macbook' width={900} height={320} className='mt-44 z-10 ml-auto mr-auto' />
          <Image src='/assets/gradient-blue-right.png' alt='Gradient Blue' width={800} height={320} className='-mt-20 absolute right-0' />
        </div>
    </div>
  )
}

export default HeroSection