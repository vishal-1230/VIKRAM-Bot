import FadedAboutBox from '@/components/FadedAboutBox'
import SpecialText from '@/components/SpecialText'
import Image from 'next/image'
import { Orbitron } from 'next/font/google'
import React from 'react'
import Button from '@/components/Button'

const orbitron = Orbitron({ subsets: ['latin'] })

function AboutSection() {
  return (
    <div className='text-white flex flex-col items-center'>
      <FadedAboutBox>
        <span className={`${orbitron.className} text-4xl font-semibold`}>What is </span><SpecialText extra={`${orbitron.className} text-4xl font-semibold`}>V.I.K.R.A.M.</SpecialText><br /><br />
        <div className='flex flex-row gap-12 mt-4'>
          <div className='grow'>
        <span className='text-lg text-[#FFFFFFCC]'>They say that ChatGpt is going to take away jobs. Well if that happens, the world will surely be a drab place! Every person is brings in unique perspectives. If we leave aside the most empirical tasks, the methods and outputs produced by different individuals is different. There is no one “right way” for every task given by an AI God.</span><br /><br></br>
        <span className='text-lg text-[#FFFFFFCC]'>VIKRAM or Variable Inference Knowledge & Response Model is a revolutionary AI framework which leverages on this beautiful variance of human beings. Built over chatgpt, it gives you an opportunity to get your own bot and train it the way you see fit. And then you can lend these bots to others who can use your expertise through your bot while you sit back and watch the bot make money for you!</span><br /><br></br>
        <span className='text-lg text-[#FFFFFFCC]'>And our foolproof security architecture ensures that the bot keeps the information, knowledge and skills learnt from you to itself.</span><br /><br></br>
          </div>
          <Image src="/assets/about-robot.svg" alt="About Robot" width={400} height={400} />
        </div>
        <Button title="So, Go Ahead and Get your Bot" buttonStyle='mt-10' />
      </FadedAboutBox>      
    </div>
  )
}

export default AboutSection