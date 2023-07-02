import PrimaryButton from '@/components/PrimaryButton'
import { Instagram, Twitter } from '@mui/icons-material'
import { Inter, Orbitron } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const orbitron = Orbitron({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

function Footer(props: {invertColor?: boolean}) {
  return (
    <div className={`flex flex-col px-8 pl-4 md:pl-0 items-center lg:items-start lg:flex-row justify-evenly py-8 lg:py-14 ${props.invertColor ? "bg-bg-900 text-white" : "bg-white text-bg-900"}`}>
      
      {/* ShortAbout */}
      <div className="flex flex-col md:px-0 w-full md:w-72">
        {/* <Image src="/assets/logo2.svg" alt="Logo" width={100} height={100} className='fill-black text-black' /> */}
        <img src={props.invertColor ? "/assets/navlogo1.png" : "/assets/botBlack.png"} alt="" className="w-fit h-20 mb-2 md:mb-0 md:h-24" />
        <span className={`${inter.className} font-semibold text-base pt-4 pb-5`}>V.I.K.R.A.M. <span className={`${inter.className} font-normal`}>is a platform that lets you create your own bot that learns your preferences and skills. And then helps others on your behalf!!</span></span>
        <div className="socials w-fit flex-row grid grid-cols-4 gap-4">
          {/* <Image src="/assets/fb.svg" alt="Facebook" width={30} height={30} className='fill-black' />
          <Image src="/assets/insta.svg" alt="Instagram" width={30} height={30} />
          <Image src="/assets/dc.svg" alt="Discord" width={30} height={30} />
          <Image src="/assets/twitter.svg" alt="Twitter" width={30} height={30} /> */}
          <Instagram className={`${props.invertColor ? "fill-white" : "fill-black"} w-8 h-8`} />
          <Twitter className={`${props.invertColor ? "fill-white" : "fill-black"} w-8 h-8`} />
        </div>
        <div className="flex flex-row mt-5">
          <span className="font-semibold text-sm">Terms and Conditions</span>
          <span className={`font-semibold text-sm border-l-[1px] ml-3 pl-3 ${props.invertColor ? "border-l-bg-white" : "border-l-bg-900"}`}>Privacy Policy</span>
        </div>
      </div>

      {/* Common Links */}
      <div className={`flex flex-col ${inter.className} self-start text-sm`}>
        <span className={`${inter.className} font-semibold text-2xl py-5 mt-3`}>Common Links</span>
        <Link href="/" className='my-1'>Home</Link>
        <Link href="/about-us" className='my-1'>About Us</Link>
        <Link href="/#features" className='my-1'>Features</Link>
        <Link href="/#use-cases" className='my-1'>Use Cases</Link>
        <Link href="/blogs" className='my-1'>Blogs</Link>
      </div>

      {/* Contact */}
      <div className="flex flex-col self-start">
      <div className={`flex flex-col ${inter.className} text-sm`}>
        <span className={`${inter.className} font-semibold text-2xl py-5 mt-3`}>Contact Us</span>
        <span className='my-1'>info@arthlex.com</span>
        {/* <span className='my-1'>+</span> */}
        <span className='my-1'>Web Interface Team</span>
      </div>
        
      {/* Newsletter */}
      {/* <div className={`flex flex-col ${inter.className} text-sm`}>
        <span className={`${inter.className} font-semibold text-2xl py-5 mt-3`}>Subscribe to Newsletter</span>
        <div className='flex flex-col md:flex-row gap-3'>
          <input type="email" className='py-2 px-3 bg-[#fff] text-white border-[1px] border-neutral-500 rounded outline-none font-medium' placeholder='Email Id' />
          <PrimaryButton title='Subscribe' />
        </div>
      </div> */}
      </div>

    </div>
  )
}

export default Footer