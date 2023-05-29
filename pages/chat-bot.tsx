import ChatArea from "@/layouts/chat-bot/ChatArea"
import LeftPanel from "@/layouts/chat-bot/LeftPanel"
import { Inter } from "next/font/google"
import { useState } from "react"

const inter = Inter({ subsets: ['latin'] })

function ChatBot() {

  const [mode, setMode] = useState<"day" | "night">("night")

  return (
    <div className={`flex absolute top-0 left-0 w-screen h-screen -z-10 flex-row ${inter.className}`}>

        <div className="absolute top-20 left-0 w-6 h-6 bg-white block md:hidden"></div>
        
        <LeftPanel mode={mode} setMode={setMode} />

        <ChatArea mode={mode} setMode={setMode} />

    </div>
  )
}

export default ChatBot