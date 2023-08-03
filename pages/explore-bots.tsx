import LikedBots from '@/layouts/explore-more/LikedBots'
import TrendingBots from '@/layouts/explore-more/TrendingBots'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin']})

function ExploreBots() {
  return (
    <div className={`${inter.className} bg-bg-700 p-5 md:p-8 flex flex-col gap-12 py-7 pb-16 md:py-12`}>
        
        <TrendingBots />

        <LikedBots />

    </div>
  )
}

export default ExploreBots