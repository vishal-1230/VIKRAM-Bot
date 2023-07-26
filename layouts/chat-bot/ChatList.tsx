import Message from "@/components/Message"
import { useEffect, useRef } from "react"

function ChatList(props: ChatListProps) {

  const messagesEndRef = useRef<null | HTMLDivElement>(null)


  const scrollToBottom = () => {
    // messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" })
    // messagesEndRef?.current?.focus()
    messagesEndRef.current && (messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight)
    
  }

  useEffect(() => {
    scrollToBottom()
    console.log(props.botIcon)
  }, [props.chats]);

  return (
    <div ref={messagesEndRef} className="overflow-y-scroll grow max-h-full w-full px-0 absolute pt-48 md:pt-40 pb-48">
        {
            props.chats.map((chat, index) => {
                return (
                    <Message mode={props.mode} sender={chat.sender} botIcon={chat.sender=="bot" ? props.botIcon ? props.botIcon : undefined : undefined} key={index}>{chat.message}</Message>
                )
            })
        }
    </div>
  )
}

interface ChatListProps {
    chats: Chats[],
    mode: string,
    setMode: any,
    botIcon?: string
}

interface Chats {
    message: string,
    sender: string
}

ChatList.defaultProps = {
    chats: [
      {
        message: "Hello, I am VIKRAM. How can I help you?",
        sender: "bot"
      },
      {
        message: "I want to book a ticket",
        sender: "user"
      },
      {
        message: "Okay, please tell me the source and destination",
        sender: "bot"
      }
    ],
    mode: "night",
    setMode: () => {}
}

export default ChatList