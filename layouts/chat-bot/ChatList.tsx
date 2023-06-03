import Message from "@/components/Message"
import { useEffect, useRef } from "react"

function ChatList(props: ChatListProps) {

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [props.chats]);

  return (
    <div className="overflow-y-scroll grow max-h-full w-full px-0 absolute pt-20 pb-48">
        {
            props.chats.map((chat, index) => {
                return (
                    <Message ref={messagesEndRef} mode={props.mode} sender={chat.sender} key={index}>{chat.message}</Message>
                )
            })
        }
    </div>
  )
}

interface ChatListProps {
    chats: Chats[],
    mode: string,
    setMode: any
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