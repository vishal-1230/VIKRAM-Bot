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
            <span className='text-base text-[#FFFFFFCC]'>VIKRAM or Variable Inference Knowledge & Response Model is a the first of its kind personal bot network. It lets you create a bot with your own AI identity. Just follow the below steps:</span><br /><br></br>
            <span className='text-base text-[#FFFFFFCC]'>    1. Give a brief description about yourself in less than 500 words (or simply upload your resume)
                <br />2. Put in the instructions for the bot on how to interact with others.
                <br />3.  If you have any additional knowledge base which you want the bot to refer, you can upload that as well.</span><br /><br></br>
            <span className='text-base text-[#FFFFFFCC]'>You will get a bot with a unique bot id. Share this with your friends, family, potential employers or anyone else. They can connect with your bot by registering themselves and putting in your bot id.</span><br /><br></br>
            <span className='text-base text-[#FFFFFFCC]'>If you area company or a freelancer, you can create an agent which will act as a spokesperson for your company to potential customers, employees, candidates or any other relevant stakeholder. A perfect marketing tool!</span><br /><br></br>
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