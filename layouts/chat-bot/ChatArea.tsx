import { useState } from "react"
import ChatList from "./ChatList"
import { MicNoneOutlined, RefreshOutlined, SendOutlined } from "@mui/icons-material"

function ChatArea(props: {mode: string, setMode: any}) {
    
    const [chats, setChats] = useState<{message: string, sender: string}[]>([])

    const [userMessage, setUserMessage] = useState("")

    async function sendMessage() {
      const message = userMessage
      setUserMessage("")
      console.log(message)
      await setChats([...chats, {message: message, sender: "user"}])

      console.log(`http://localhost:5000/general-tab/Ria/${message}`)
      fetch(`http://localhost:5000/general-tab/Ria/${message}`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setChats([...chats, {message: message, sender: "user"}, {message: data.message, sender: "bot"}])
        })
    }



    const mode = props.mode
    const setMode = props.setMode

  return (
    <div className={`flex flex-col h-screen pb-64 grow relative duration-200 ${mode == "day" ? "bg-white text-bg-500" : "bg-bg-700 text-white"}`}>
      {
        chats.length === 0 && <img src="/assets/chat-screen-top-left.svg" alt="" className="duration-200 absolute -left-72 -top-10" />
      }
      {
        chats.length === 0 && <img src="/assets/chat-screen-top-right.png" alt="" className="duration-200 absolute top-0 right-52" />
      }
      {
        chats.length === 0 && <img src="/assets/chat-screen-bottom-right.png" alt="" className="duration-200 absolute bottom-0 right-0" />
      }
      {
        chats.length === 0 && <img src="/assets/chat-screen-bottom-left.png" alt="" className="duration-200 absolute bottom-0 -left-24" />
      }
        
        <ChatList chats={chats} mode={mode} setMode={setMode} />
        
        <div className={`flex flex-col gap-5 absolute w-full px-4 md:px-32 bottom-0 z-50 py-6 pt-16 duration-200 ${mode == "day" ? chats.length != 0 && "bg-gradient-to-t from-white via-white to-transparent" : chats.length != 0 && "bg-gradient-to-t from-bg-700 via-bg-700 to-transparent"}`}>
          
          <button className={`py-3 px-4 flex min-w-max items-center w-fit gap-2 text-sm self-center font-medium bg-transparent rounded border duration-200 ${mode === "day" ? "border-bg-50 text-bg-50" : "border-neutral-700 text-neutral-700"} `}>
            <RefreshOutlined className="w-5 h-5" />
            Reset chat
          </button>

          <span className={`${mode === "day" ? "text-bg-50" : "text-neutral-500"} duration-200 text-sm font-medium`}>Current search category: Ticket booking</span>

          <div className={`flex flex-row justify-between p-3 rounded duration-200 ${mode === "day" ? "bg-white" : "bg-bg-600"} border ${mode === "user" ? "border-bg-50" : "border-bg-500"}`}>
            <input
              type="text"
              className="bg-transparent grow max-w-fit text-sm border-none outline-none text-neutral-500"
              placeholder="Text area"
              value={userMessage}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  sendMessage()
                }
              }}
              onChange={(e) => {
                setUserMessage(e.target.value)
              }}
            />
            <div className="icons flex gap-5">
              <MicNoneOutlined className="w-5 h-5 fill-bg-50 cursor-pointer hover:fill-neutral-700 focus:fill-neutral-400" />
              <SendOutlined onClick={sendMessage} className="w-5 h-5 fill-bg-50 cursor-pointer hover:fill-neutral-700 focus:fill-neutral-400" />
            </div>
          </div>

        </div>

    </div>
  )
}

ChatArea.defaultProps = {
    mode: "night",
    setMode: () => {}
}

export default ChatArea