import BotCard from '@/components/BotCard'
import SpecialText from '@/components/SpecialText'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

function LikedBots() {

  const [bots, setBots] = React.useState<any[]>([])

  async function getLikedBots() {
    console.log("Getting liked for", localStorage.getItem("token"))
    const response = await fetch("https://server.vikrambots.in/get-fav", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token")!
      }
    })
    const data = await response.json()
    console.log("DAta", data)

    if (data.success) {
      setBots(data.details)
    } else {
      toast.error("Error fetching liked bots!")
    }
  }

  useEffect(()=>{
    getLikedBots()
  }, [])

  return (
    <div className='flex flex-col gap-5 px-2'>
      <SpecialText extra='text-[32px] lg:text-[42px] font-semibold'>Your Liked Bots</SpecialText>

      {
        bots.length === 0 ? <span className="font-medium text-base lg:text-lg text-neutral-800 ml-2 mt-4">
          You haven't liked any bots yet!
        </span>
        : null
      }
      <div className="flex flex-row overflow-auto gap-5 p-4 pb-6">
        {
          bots.map((bot, index) => {
            return <BotCard liked key={index} name={bot.name} userName={bot.username} interactions={bot.interactions} logo={`https://server.vikrambots.in/assets/${bot.pic}`} description={bot.description} />
          })
        }
      </div>
      
    </div>
  )
}

export default LikedBots