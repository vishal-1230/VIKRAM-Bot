import BotCard from '@/components/BotCard'
import SpecialText from '@/components/SpecialText'
import React from 'react'

function LikedBots() {
  return (
    <div className='flex flex-col gap-5 px-2'>
      <SpecialText extra='text-[42px] font-semibold'>Your Liked Bots</SpecialText>

      <div className="flex flex-row overflow-auto gap-5 p-4 pb-6">
        <BotCard />
        <BotCard name="Tony Stark" userName='Stark62' interactions={2} logo="https://www.lensmen.ie/wp-content/uploads/2015/02/Profile-Portrait-Photographer-in-Dublin-Ireland..jpg" />
        <BotCard name="Heath Ledger" userName='GreatGuy' interactions={252} logo="https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" />
        {/* <BotCard name="Paul Walker" userName='WalkerMe' interactions={64} logo="https://bestprofilepictures.com/wp-content/uploads/2021/04/Cool-Profile-Picture-For-Youtube-960x1024.jpg" /> */}
        <BotCard />
      </div>
      
    </div>
  )
}

export default LikedBots