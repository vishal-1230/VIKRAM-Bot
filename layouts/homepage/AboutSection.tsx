import FadedAboutBox from '@/components/FadedAboutBox'
import SpecialText from '@/components/SpecialText'
import Image from 'next/image'
import { Orbitron } from 'next/font/google'
import React from 'react'
import Button from '@/components/SpecialButton'
import Link from 'next/link'

const orbitron = Orbitron({ subsets: ['latin'] })

function AboutSection() {
  return (
    <div className='text-white flex flex-col items-center'>
      <FadedAboutBox>
        <span className={`${orbitron.className} text-3xl md:text-4xl font-semibold`}>What is <SpecialText extra={`${orbitron.className}`}>V.I.K.R.A.M.</SpecialText></span><br /><br />
        <div className='flex flex-col-reverse md:flex-row gap-12 mt-4'>
          <div className='grow text-justify'>
            <span className='text-base text-[#FFFFFFCC]'>No one can do a job the way you. Least of all, an AI tool. Because you are unique and people value your work for the the touch you bring in.</span><br /><br></br>
            <span className='text-base text-[#FFFFFFCC]'>VIKRAM or Variable Inference Knowledge & Response Model is a revolutionary AI framework which leverages on this beautiful variance of human beings. Built over chatgpt, it gives you an opportunity to get your own bot and train it the way you see fit. And then you can lend these bots to others who can use your expertise through your bot while you sit back and watch the bot make money for you!</span><br /><br></br>
            <span className='text-base text-[#FFFFFFCC]'>And our foolproof security architecture ensures that the bot keeps the information, knowledge and skills learnt from you to itself.</span><br /><br></br>
          </div>
          <img src="/assets/about-robot.svg" alt="About Robot" className='w-48 ml-5 md:ml-0 md:w-96 self-center' />
        </div>
        <Link href="/chat-bot" className='self-center z-20'>
          <Button title="So, Go Ahead and Get your Bot" buttonStyle='mt-10' />
        </Link>
      </FadedAboutBox>      
    </div>
  )
}

export default AboutSection