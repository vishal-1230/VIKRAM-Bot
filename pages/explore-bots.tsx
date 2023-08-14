import LikedBots from '@/layouts/explore-more/LikedBots'
import TrendingBots from '@/layouts/explore-more/TrendingBots'
import { ArrowLeft } from '@mui/icons-material'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin']})

function ExploreBots() {

  return (
    <div className={`${inter.className} bg-bg-700 p-5 md:p-8 flex flex-col gap-12 py-7 !pt-0 pb-16`}>
        <ToastContainer autoClose={1000} position="bottom-right" />

      <Link href="/chat-bot">
        <span className="py-2 px-5 rounded-full flex items-center gap-1.5 w-fit bg-bg-300 bg-opacity-50 hover:bg-opacity-75 active:opacity-95 text-neutral-50 -mb-6 lg:-mb-4 cursor-pointer">
          <ArrowLeft className="inline-block" />
          Go Back to your Bot
        </span>
      </Link>

        <TrendingBots />

        <LikedBots />

    </div>
  )
}

export default ExploreBots