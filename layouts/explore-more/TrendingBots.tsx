import BotCard from '@/components/BotCard'
import SpecialText from '@/components/SpecialText'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

function TrendingBots() {

  const [bots, setBots] = React.useState<any[]>([])

  async function getBots() {
    const res = await fetch("https://server.vikrambots.in/get-bots")
    const data = await res.json()
    console.log(data)

    if (data.success) {
      setBots(data.message)
    } else {
      console.log("Error")
      toast.error("Error fetching bots!")
    }
  }

  useEffect(()=>{
    getBots()
  }, [])

  return (
    <div className='flex flex-col gap-5 px-2'>
      <SpecialText extra='text-[42px] font-semibold pb-2'>Trending Bots</SpecialText>

      <div className="flex flex-row gap-5 overflow-x-auto p-4 pb-6">
        {
          bots.map((bot, index) => {
            return <BotCard key={index} name={bot.name} userName={bot.username} interactions={bot.interactions} logo={`https://server.vikrambots.in/assets/${bot.pic}`} description={bot.description} />
          })
        }
      </div>
      
    </div>
  )
}

export default TrendingBots