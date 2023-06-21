import { useEffect, useState } from "react"
import ChatList from "./ChatList"
import { MicNoneOutlined, RefreshOutlined, SendOutlined } from "@mui/icons-material"
import Dropdown from "@/components/Dropdown"
import PrimaryButton from "@/components/PrimaryButton"
import { useRouter } from "next/router"
import { Popover } from "@mui/material"

function ChatArea(props: {mode: string, setMode: any}) {

  const router = useRouter()

  const [userDetails, setUserDetails] = useState<any>(null)

  const [chatCategory, setChatCategory] = useState<"personal" | "business" | "business_initiator" | "initiator">(userDetails?.username ? "personal" : "business")

  const [plugin, setPlugin] = useState<"News" | "Weather" | "IMDB" | "Google" | "YouTube" | "none">("none")
    
    const [chats, setChats] = useState<{message: string, sender: string}[]>([])
    const [trainingChats, setTrainingChats] = useState<{message: string, sender: string}[]>([])
    const [thirdChats, setThirdChats] = useState<{message: string, sender: string}[]>([])
    const [thirdBusinessChats, setThirdBusinessChats] = useState<{message: string, sender: string}[]>([])

    const [toConnectWith, setToConnectWith] = useState<string>("")

    const [loadingChat, setLoadingChat] = useState(false)

    const [userMessage, setUserMessage] = useState("")


    const [categories, setCategories] = useState<{text: string, onClick: any}[]>([
      {text: "My Personal Bot", onClick: () => {setChatCategory("personal");}},
      {text: "My Business Bot (Training)", onClick: () => {setChatCategory("business")}},
      {text: "Connect to someone's bot", onClick: () => {setChatCategory("initiator")}},
      {text: "Connect to a Business", onClick: () => {setChatCategory("business_initiator")}},
    ])

    async function sendMessage() {
      const message = userMessage
      setUserMessage("")
      console.log(message)
      if (chatCategory === "personal") {
        setChats([...chats, {message: message, sender: "user"}, {message: "Loading...", sender: "bot"}])
      } else if (chatCategory === "business") {
        setTrainingChats([...trainingChats, {message: message, sender: "user"}, {message: "Loading...", sender: "bot"}])
      } else if (chatCategory === "initiator") {
        setThirdChats([...thirdChats, {message: message, sender: "user"}, {message: "Loading...", sender: "bot"}])
      } else if (chatCategory === "business_initiator") {
        setThirdBusinessChats([...thirdBusinessChats, {message: message, sender: "user"}, {message: "Loading...", sender: "bot"}])
      }

      let uri = ""
      if(chatCategory === "personal") {
        uri = `https://server.vikrambots.in/general/${userDetails?.username}/${message}`
      } else if(chatCategory === "business") {
        uri = `https://server.vikrambots.in/training/${userDetails?.username_b}/${message}`
      } else if(chatCategory === "initiator") {
        if (toConnectWith === "") {
          alert("Please enter a VBot ID to connect to.")
        } else {
          if (userDetails.username) {
            uri = `https://server.vikrambots.in/connect-personal/${toConnectWith}/${userDetails?.username}/${message}`
          } else {
            uri = `https://server.vikrambots.in/connect-personal/${toConnectWith}/${userDetails?.username_b}/${message}`
          }
        }
      } else if(chatCategory === "business_initiator") {
        if (toConnectWith === "") {
          alert("Please enter a VBot ID to connect to.")
        } else {
          if (userDetails.username) {
            uri = `https://server.vikrambots.in/connect-business/${toConnectWith}/${userDetails?.username}/${message}`
          } else {
            uri = `https://server.vikrambots.in/connect-business/${toConnectWith}/${userDetails?.username_b}/${message}`
          }
        }
      }
      console.log("URI=>", uri)

      if (plugin === "none") {
        fetch(uri)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (chatCategory === "personal") {
              setChats([
                ...chats,
                { message: message, sender: "user" },
                { message: data.message, sender: "bot" },
              ]);
            } else if (chatCategory === "business") {
              setTrainingChats([
                ...trainingChats,
                { message: message, sender: "user" },
                { message: data.message, sender: "bot" },
              ]);
            } else if (chatCategory === "initiator") {
              setThirdChats([
                ...thirdChats,
                { message: message, sender: "user" },
                { message: data.message, sender: "bot" },
              ]);
            } else if (chatCategory === "business_initiator") {
              setThirdBusinessChats([
                ...thirdBusinessChats,
                { message: message, sender: "user" },
                { message: data.message, sender: "bot" },
              ]);
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Our servers are overloaded. Please try again later.");
            if (chatCategory === "personal") {

            setChats([
              ...chats,
              { message: message, sender: "user" },
              {
                message: "Apologies, people are using my servers too much. Please try again later.",
                sender: "bot",
              },
            ]);
            } else if (chatCategory === "business") {
              setTrainingChats([
                ...trainingChats,
                { message: message, sender: "user" },
                {
                  message: "Apologies, people are using my servers too much. Please try again later.",
                  sender: "bot",
                },
              ]);
            } else if (chatCategory === "initiator") {
              setThirdChats([
                ...thirdChats,
                { message: message, sender: "user" },
                {
                  message: "Apologies, people are using my servers too much. Please try again later.",
                  sender: "bot",
                },
              ]);
            } else if (chatCategory === "business_initiator") {
              setThirdBusinessChats([
                ...thirdBusinessChats,
                { message: message, sender: "user" },
                {
                  message: "Apologies, people are using my servers too much. Please try again later.",
                  sender: "bot",
                },
              ]);
            }
          });
      } else if (plugin === "News") {
        fetch(`https://server.vikrambots.in/news/${userDetails.username ? userDetails?.username : userDetails?.username_b}/${message}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setChats([
              ...chats,
              { message: message, sender: "user" },
              { message: data.message, sender: "bot" },
            ]);
          })
          .catch((err) => {
            console.log(err);
            alert("Our servers are overloaded. Please try again later.");
            setChats([
              ...chats,
              { message: message, sender: "user" },
              {
                message: "Apologies, people are using my servers too much",
                sender: "bot",
              },
            ]);
          });
      } else if (plugin === "Weather") {
        fetch(`https://server.vikrambots.in/weather/${userDetails.username ? userDetails?.username : userDetails?.username_b}/${message}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setChats([
              ...chats,
              { message: message, sender: "user" },
              { message: data.message, sender: "bot" },
            ]);
          })
          .catch((err) => {
            console.log(err);
            alert("Our servers are overloaded. Please try again later.");
            setChats([
              ...chats,
              { message: message, sender: "user" },
              {
                message: "Apologies, people are using my servers too much",
                sender: "bot",
              },
            ]);
          });
      } else if (plugin === "IMDB") {
        fetch(`https://server.vikrambots.in/imdb/${userDetails.username ? userDetails?.username : userDetails?.username_b}/${message}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setChats([
              ...chats,
              { message: message, sender: "user" },
              { message: data.message, sender: "bot" },
            ]);
          })
          .catch((err) => {
            console.log(err);
            alert("Our servers are overloaded. Please try again later.");
            setChats([
              ...chats,
              { message: message, sender: "user" },
              {
                message: "Apologies, people are using my servers too much",
                sender: "bot",
              },
            ]);
          });
      } else if (plugin === "Google") {
        fetch(`https://server.vikrambots.in/google/${userDetails.username ? userDetails?.username : userDetails?.username_b}/${message}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setChats([
              ...chats,
              { message: message, sender: "user" },
              { message: data.message, sender: "bot" },
            ]);
          })
          .catch((err) => {
            console.log(err);
            alert("Our servers are overloaded. Please try again later.");
            setChats([
              ...chats,
              { message: message, sender: "user" },
              {
                message: "Apologies, people are using my servers too much",
                sender: "bot",
              },
            ]);
          });
      } else if (plugin === "YouTube") {
        fetch(`https://server.vikrambots.in/yt/${userDetails.username ? userDetails?.username : userDetails?.username_b}/${message}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setChats([
              ...chats,
              { message: message, sender: "user" },
              { message: data.message, sender: "bot" },
            ]);
          })
          .catch((err) => {
            console.log(err);
            alert("Our servers are overloaded. Please try again later.");
            setChats([
              ...chats,
              { message: message, sender: "user" },
              {
                message: "Apologies, people are using my servers too much",
                sender: "bot",
              },
            ]);
          });
      }
    }

    async function fetchMessage () {
      const userTemp = localStorage.getItem("user")
      const userDetails = JSON.parse(userTemp ? userTemp : "{}")

      setUserDetails(userDetails)
      console.log("Details", userDetails)
      const response = await fetch(`https://server.vikrambots.in/gchats/${userDetails.username}`)
      const data = await response.json()
      console.log("DATA", data)
      // data.message format is [ {Bot: "Hello", User: "bot"}, {Bot: "Hi", sendeuser: "user"}] that has to be converted to [{message: "Hello", sender: "bot"}, {message: "Hi", sender: "user"}]
      let temp:{message: string, sender: string}[] = []
      data.message.map((item: { Bot: any; User: any })=>{
        temp.push({message: item.Bot, sender: "bot"})
        temp.push({message: item.User, sender: "user"})
      })
      console.log("TEMP", temp)
      setChats(temp.reverse())
    }

    async function fetchTrainingMessage () {
      const userTemp = localStorage.getItem("user")
      const userDetails = JSON.parse(userTemp ? userTemp : "{}")

      setUserDetails(userDetails)
      console.log(userDetails.username_b)
      const response = await fetch(`https://server.vikrambots.in/gchats/${userDetails?.username_b}`)
      const data = await response.json()
      let temp:{message: string, sender: string}[] = []
      data.message.map((item: { Bot: any; User: any })=>{
        temp.push({message: item.Bot, sender: "bot"})
        temp.push({message: item.User, sender: "user"})
      })
      setTrainingChats(temp.reverse())
    }

    useEffect(()=>{
      console.log("chat", chats)
      console.log("training", trainingChats)
      console.log("third", thirdChats)
      console.log("third business", thirdBusinessChats)
    }, [chatCategory])

    useEffect(()=>{
      const userTemp = localStorage.getItem("user")
      let userDetails = JSON.parse(userTemp ? userTemp : "{}")

      if (userDetails.username){
        if (userDetails.username_b) {
          setCategories([
            {text: "My Personal Bot", onClick: () => {setChatCategory("personal");}},
            {text: "My Business Bot (Training)", onClick: () => {setChatCategory("business")}},
            {text: "Connect to someone's bot", onClick: () => {setChatCategory("initiator")}},
            {text: "Connect to a Business", onClick: () => {setChatCategory("business_initiator")}},
          ])
          localStorage.getItem("user") && fetchMessage()
        } else {
          setCategories([
            {text: "My Personal Bot", onClick: () => {setChatCategory("personal");}},
            {text: "Connect to someone's bot", onClick: () => {setChatCategory("initiator")}},
            {text: "Connect to a Business", onClick: () => {setChatCategory("business_initiator")}},
          ])
        }
      } else if (userDetails.username_b) {
        setCategories([
          {text: "My Business Bot (Training)", onClick: () => {setChatCategory("business")}},
          {text: "Connect to someone's bot", onClick: () => {setChatCategory("initiator")}},
          {text: "Connect to a Business", onClick: () => {setChatCategory("business_initiator")}},
        ])
        localStorage.getItem("user") && fetchTrainingMessage()
      } else {
        router.replace("/auth/login")
      }

      setUserDetails(userDetails)

    }, [])

    const mode = props.mode
    const setMode = props.setMode

  return (
    <div className={`flex flex-col h-screen pb-64 grow relative duration-200 ${mode == "day" ? "bg-white text-bg-500" : "bg-bg-700 text-white"}`}>
      {
        (chatCategory==="personal" ? chats.length === 0 : trainingChats.length===0) &&
        <img src="/assets/chat-screen-top-left.svg" alt="" className="duration-200 absolute -left-72 -top-10" />
      }
      {
        (chatCategory==="personal" ? chats.length === 0 : trainingChats.length===0) &&
        <img src="/assets/chat-screen-top-right.png" alt="" className="duration-200 absolute top-0 right-52" />
      }
      {
        (chatCategory==="personal" ? chats.length === 0 : trainingChats.length===0) &&
        <img src="/assets/chat-screen-bottom-right.png" alt="" className="duration-200 absolute bottom-0 right-0" />
      }
      {
        (chatCategory==="personal" ? chats.length === 0 : trainingChats.length===0) &&
        <img src="/assets/chat-screen-bottom-left.png" alt="" className="duration-200 absolute bottom-0 -left-24" />
      }
      <br /><br /><br />

      <div className="w-fit md:w-full mt-2 py-2 flex flex-col md:flex-row justify-between z-50 backdrop-blur-sm">
        <Dropdown title="Select a bot" className="md:ml-5" list={categories} />
        {
          (chatCategory === "initiator" || chatCategory === "business_initiator") && 
        <div className="flex p-1.5 border-b border-b-gray-500 mr-auto ml-3 z-50 self-end">
          <input type="text" className="bg-transparent z-50 outline-none text-sm text-neutral-400 w-fit" placeholder="Enter any VBot ID" value={toConnectWith} onChange={(e)=>{setToConnectWith(e.target.value)}} />
          <PrimaryButton buttonStyle="ml-5 text-xs" title="Connect" onClick={()=>{alert("Connected to "+toConnectWith+" successfully!")}} />
        </div>
        }
        <Dropdown title="Plugin" className="mr-5" list={[
          {
            text: "None",
            onClick: () => { setPlugin("none") }
          },
          {
            text: "News",
            onClick: () => { setPlugin("News") }            
          },
          {
            text: "Weather",
            onClick: () => { setPlugin("Weather") }
          },
          {
            text: "IMDB",
            onClick: () => { setPlugin("IMDB") }
          },
          {
            text: "Google",
            onClick: () => { setPlugin("Google") }
          },
          {
            text: "YouTube",
            onClick: () => { setPlugin("YouTube") }
          }          
        ]} />
      </div>
        
        <ChatList
          chats={ chatCategory != "personal" ? chatCategory != "business" ? chatCategory != "initiator" ? thirdBusinessChats : thirdChats : trainingChats : chats }
          mode={mode}
          setMode={setMode}
        />
        
        <div className={`flex flex-col gap-5 absolute w-full px-4 md:px-32 bottom-0 z-50 py-6 pt-16 duration-200 ${mode == "day" ? chats.length != 0 && "bg-gradient-to-t from-white via-white to-transparent" : chats.length != 0 && "bg-gradient-to-t from-bg-700 via-bg-700 to-transparent"}`}>
          
          <button className={`py-3 px-4 flex min-w-max items-center w-fit gap-2 text-sm self-center font-medium bg-transparent rounded border duration-200 ${mode === "day" ? "border-bg-50 text-bg-50" : "border-neutral-700 text-neutral-700"} `}>
            <RefreshOutlined className="w-5 h-5" />
            Reset chat
          </button>

          {/* <span className={`${mode === "day" ? "text-bg-50" : "text-neutral-500"} duration-200 text-sm font-medium`}>Current search category: Ticket booking</span> */}

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