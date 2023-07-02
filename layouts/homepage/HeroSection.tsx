import React, { useEffect } from 'react'
import { Orbitron } from 'next/font/google'
import Button from '@/components/SpecialButton'
import Image from 'next/image'
import SpecialText from '@/components/SpecialText'
import PrimaryButton from '@/components/PrimaryButton'
import Link from 'next/link'

const orbitron = Orbitron({subsets: ['latin'], weight: ["400", "500", "600", "700"]})

function HeroSection() {

  const [loggedIn, setLoggedIn] = React.useState<boolean>(false)

  useEffect(()=>{
    if (localStorage.getItem("token")) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [])

  return (
    <div className='flex flex-col'>
        <span className={`text-white px-4 md:px-0 ${orbitron.className} font-semibold text-3xl md:text-5xl text-center heading-text mt-10 md:mt-24`}>
            Get Your Own <SpecialText>PERSONAL BOT</SpecialText><br />To Interact with The World!
        </span>
        <span className='font-normal px-4 md:px-0 text-sm md:text-lg text-center mt-5 text-[#FFFFFFB2]'>
        You may have a number and an email id or even a website. But do you have a bot with a bot id?<br /> Vikram is a platform that lets you create your own bot with a unique VBot id. Use this <br/>as a communication medium or train it with your skills to help others. 
        </span>
        {/* <Button title="Start Asking" buttonStyle='mt-10' Icon={({extras} : {extras : string})=>{
            return <Image src='/assets/button-arrow.svg' className={extras} alt='Arrow' width={15} height={15} priority />
        }} /> */}
        <Link href={loggedIn ? "/chat-bot" : "/auth/login"} className='self-center z-20'>
          <PrimaryButton title="Get Your VBot" buttonStyle='mt-10 z-20 w-fit self-center cursor-pointer' showIcon />
        </Link>
        <div className='flex flex-row justify-between relative md:-mt-24'>
          <Image src='/assets/gradient-pink-left.png' alt='Gradient Pink' width={800} height={320} className='mt-2 md:-mt-0 w-2/3 md:w-fit object-cover absolute left-0 bg-gradient-to-r from-current' />
          <Image src='/assets/macbook3.png' alt='Macbook' width={900} height={320} className='mt-8 md:mt-36 px-4 md:px-0 z-10 ml-auto mr-auto' />
          <Image src='/assets/gradient-blue-right.png' alt='Gradient Blue' width={1000} height={340} className='-mt-3 md:-mt-16 w-2/3 md:w-fit object-cover absolute right-0' />
        </div>
    </div>
  )
}

export default HeroSection