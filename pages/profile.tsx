import PrimaryButton from '@/components/PrimaryButton'
import SpecialText from '@/components/SpecialText'
import TrendingBots from '@/layouts/explore-more/TrendingBots'
import { ArrowLeft, ChatBubble } from '@mui/icons-material'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { RiInstagramFill, RiLinkedinBoxFill, RiLinkedinFill, RiWhatsappFill } from 'react-icons/ri'
import { TbMessageShare } from 'react-icons/tb'

const inter = Inter({ subsets: ['latin']})

function Profile() {

    const router = useRouter()

  return (
    <div className={`${inter.className} bg-bg-700 text-neutral-50 p-5 md:p-8 flex flex-col gap-12 py-8`}>
        
        {/* <Link href="/explore-bots"> */}
            <span className="py-2 px-5 rounded-full flex items-center gap-1.5 w-fit bg-bg-300 bg-opacity-50 hover:bg-opacity-75 active:opacity-95 text-neutral-50 -mb-12 cursor-pointer" onClick={()=>{
                router.back()
            }}>
                <ArrowLeft className="inline-block" />
                Go Back
            </span>
        {/* </Link> */}

        <div className="flex flex-col lg:flex-row gap-2 lg:gap-12 justify-start items-stretch p-0 lg:p-4 lg:pl-6 pt-8 md:pt-2">
            <img src="/assets/avatar.jpg" alt="" className="w-[95vw] lg:w-96 aspect-square lg:h-96 object-cover rounded-none lg:rounded-full" />

            <div className="flex flex-col justify-between gap-1 py-2 px-1 md:px-0">
                <SpecialText extra="text-4xl lg:text-5xl font-bold py-1">Vikram Singh</SpecialText>
                <span className="text-lg lg:text-xl text-gray-400 font-medium">@Vikram324</span>
                <span className="text-gray-400 mt-1 text-sm font-medium flex items-center">
                    <ChatBubble className="inline w-5 h-5" />&nbsp;
                    1.3M
                </span>
                <PrimaryButton title='Chat' buttonStyle='mt-8 md:mt-auto w-fit !py-1.5 text-base !px-5' showIcon Icon={()=>{
                    return <TbMessageShare className="inline w-5 h-5" />
                }} />
                <span className="text-base lg:text-lg mt-1 text-gray-400 font-normal">
                    <a href="mailto:vikramsingh123@gmail.com" className='font-semibold'>Email: </a>
                    vikramsingh123@gmail.com
                </span>
                <span className="lg:mt-0.5 text-base lg:text-lg text-gray-400 font-normal flex gap-2 items-center">
                    <span className='font-semibold'>Connects: </span>
                    <RiLinkedinBoxFill className="inline-block w-7 h-7 cursor-pointer hover:text-blue-500" />
                    <RiInstagramFill className="inline-block w-7 h-7 cursor-pointer hover:text-[#dc2fff]" />
                    <RiWhatsappFill className="inline-block w-7 h-7 cursor-pointer hover:text-green-500" />
                </span>
                <span className="mt-0.5 text-gray-400 font-normal text-base lg:text-lg md:pr-14">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum error nihil repellendus quisquam ipsum accusantium, tenetur exercitationem ullam quidem non ut alias repellat nobis possimus iste, eligendi id consequatur molestiae quae iure. Dignissimos, impedit?
                </span>
            </div>
        </div>

        <TrendingBots title='Other Trending Bots' className='pb-8' textClassName='ml-2' />
    </div>
  )
}

export default Profile