import ChatArea from "@/layouts/chat-bot/ChatArea"
import LeftPanel from "@/layouts/chat-bot/LeftPanel"
import { MenuBook, MenuOpenOutlined, MenuSharp } from "@mui/icons-material"
import { MenuList } from "@mui/material"
import { Inter } from "next/font/google"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const inter = Inter({ subsets: ['latin'] })

function ChatBot() {

  const [mode, setMode] = useState<"day" | "night">("night")

  const [showPersonalBotDialog, setShowPersonalBotDialog] = useState(false)
  const [showBusinessBotDialog, setShowBusinessBotDialog] = useState(false)

  const [changeChatTo, setChangeChatTo] = useState<string | null>(null)
  const [changeChatToNotif, setChangeChatToNotif] = useState<string | null>(null)

  const [showSettingsInMobile, setShowSettingsInMobile] = useState<boolean>(false)

  const router = useRouter()

  useEffect(()=>{
    if (localStorage.getItem("token") || localStorage.getItem("temptoken")) {
      console.log("token found")
    } else {
      console.log("token not found")
      router.replace("auth/login")
    }
  }, [])

  return (
    <div className="bg-transparent">
      <MenuOpenOutlined className="block md:!hidden w-8 h-8 text-neutral-50 fill-neutral-50 cursor-pointer absolute top-6 z-[10000000] right-7" onClick={()=>{setShowSettingsInMobile(true)}} />
    <div
      className={`flex absolute top-0 left-0 w-screen h-screen -z-10 flex-row ${inter.className}`}
    >
      <div className="absolute top-20 left-0 w-6 h-6 bg-white block md:hidden"></div>

      <LeftPanel
        mode={mode}
        setMode={setMode}
        showPersonalBotDialog={showPersonalBotDialog}
        setShowPersonalBotDialog={setShowPersonalBotDialog}
        showBusinessBotDialog={showBusinessBotDialog}
        setShowBusinessBotDialog={setShowBusinessBotDialog}
        changeChatTo={changeChatTo}
        setChangeChatTo={setChangeChatTo}
        changeChatToNotif={changeChatToNotif!}
        setChangeChatToNotif={setChangeChatToNotif}
        showSettingsInMobile={showSettingsInMobile}
        setShowSettingsInMobile={setShowSettingsInMobile}
      />

      <ChatArea
        mode={mode}
        setMode={setMode}
        showPersonalBotDialog={showPersonalBotDialog}
        setShowPersonalBotDialog={setShowPersonalBotDialog}
        showBusinessBotDialog={showBusinessBotDialog}
        setShowBusinessBotDialog={setShowBusinessBotDialog}
        changeChatTo={changeChatTo}
        setChangeChatTo={setChangeChatTo}
        changeChatToNotif={changeChatToNotif!}
      />
    </div>
    </div>
  );
}

export default ChatBot