import React from 'react'
import { Orbitron } from 'next/font/google'
import Button from '@/components/SpecialButton'
import Image from 'next/image'
import SpecialText from '@/components/SpecialText'
import PrimaryButton from '@/components/PrimaryButton'

const orbitron = Orbitron({subsets: ['latin'], weight: ["400", "500", "600", "700"]})

function HeroSection() {

  return (
    <div className='flex flex-col'>
        <span className={`text-white ${orbitron.className} font-semibold text-5xl text-center heading-text mt-24`}>
            Get Your Own <SpecialText>PERSONAL BOT</SpecialText><br />And Have It Work For You!
        </span>
        <span className='font-normal text-xl text-center mt-5 text-[#FFFFFFB2]'>
            VIKRAM is a platform that lets you create your own bot that learns your preferences and<br /> skills. Then helps others on your behalf!!
        </span>
        {/* <Button title="Start Asking" buttonStyle='mt-10' Icon={({extras} : {extras : string})=>{
            return <Image src='/assets/button-arrow.svg' className={extras} alt='Arrow' width={15} height={15} priority />
        }} /> */}
        <PrimaryButton title="Start Asking" buttonStyle='mt-10 z-20 w-fit self-center cursor-pointer' />
        <div className='flex flex-row justify-between relative -mt-24'>
          <Image src='/assets/gradient-pink-left.png' alt='Gradient Pink' width={800} height={320} className='-mt-0 absolute left-0' />
          <Image src='/assets/macbook.png' alt='Macbook' width={900} height={320} className='mt-36 z-10 ml-auto mr-auto' />
          <Image src='/assets/gradient-blue-right.png' alt='Gradient Blue' width={1000} height={340} className='-mt-[6.2rem] absolute right-0' />
        </div>
    </div>
  )
}

export default HeroSection