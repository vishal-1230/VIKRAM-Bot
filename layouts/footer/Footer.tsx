import { Inter, Orbitron } from 'next/font/google'
import Image from 'next/image'
import React from 'react'

const orbitron = Orbitron({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

function Footer() {
  return (
    <div className='text-white flex flex-row justify-evenly bg-footer-bg py-14'>
      
      {/* ShortAbout */}
      <div className="flex flex-col w-72">
        <Image src="/assets/logoTemp.svg" alt="Logo" width={100} height={100} />
        <span className={`${orbitron.className} font-bold pt-1 pb-6`}>V.I.K.R.A.M. <span className={`${inter.className} font-normal`}>is a  variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.</span></span>
        <div className="socials flex-row grid grid-cols-4">
          <Image src="/assets/fb.svg" alt="Facebook" width={30} height={30} className='fill-white' />
          <Image src="/assets/insta.svg" alt="Instagram" width={30} height={30} />
          <Image src="/assets/dc.svg" alt="Discord" width={30} height={30} />
          <Image src="/assets/twitter.svg" alt="Twitter" width={30} height={30} />
        </div>
      </div>

      {/* Our Team */}
      <div className={`flex flex-col ${inter.className} text-sm`}>
        <span className={`${orbitron.className} font-bold text-lg py-5 mt-3`}>Our Team</span>
        <span className='my-1'>The Algorithm Team</span>
        <span className='my-1'>Design Team</span>
        <span className='my-1'>Web Interface Team</span>
      </div>

      {/* Contact */}
      <div className={`flex flex-col ${inter.className} text-sm`}>
        <span className={`${orbitron.className} font-bold text-lg py-5 mt-3`}>Contact Us</span>
        <span className='my-1'>mail@vikram.ai</span>
        <span className='my-1'>+91 9999999999</span>
        <span className='my-1'>Web Interface Team</span>
      </div>
        
      {/* Newsletter */}
      <div className={`flex flex-col ${inter.className} text-sm`}>
        <span className={`${orbitron.className} font-bold text-lg py-5 mt-3`}>Subscribe to Newsletter</span>
        <div className='flex flex-row gap-3'>
          <input type="email" className='py-2 px-3 bg-[#d9d9d92f] text-white outline-none font-medium placeholder-[#FFFFFFD9]' placeholder='Email Id' />
          <button className={`${orbitron.className} font-medium bg-black text-white py-3.5 px-5`}>Subscribe</button>
        </div>
      </div>

    </div>
  )
}

export default Footer