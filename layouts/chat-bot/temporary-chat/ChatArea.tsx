import { useEffect, useState, useContext } from "react"
import ChatList from "../ChatList"
import { RefreshOutlined, SendOutlined } from "@mui/icons-material"
import Dropdown from "@/components/Dropdown"
import { useRouter } from "next/router"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function ChatArea(props: {
  usernameToConnect: string, 
  mode: string, 
  setMode: any, 
}) {

  const router = useRouter()

  const [userDetails, setUserDetails] = useState<any>(null)

  const [chatCategory, setChatCategory] = useState<"personal" | "personaltraining" | "business" | "business_initiator" | "initiator" | string>("personal")

  const [plugin, setPlugin] = useState<"News" | "Weather" | "IMDB" | "Google" | "YouTube" | "none">("none")
    
    const [personalTrainingChats, setPersonalTrainingChats] = useState<{message: string, sender: string}[]>([])
    const [trainingChats, setTrainingChats] = useState<{message: string, sender: string}[]>([])
    const [thirdChats, setThirdChats] = useState<{message: string, sender: string}[]>([])
    const [thirdBusinessChats, setThirdBusinessChats] = useState<{message: string, sender: string}[]>([])
    const [tempChats, setTempChats] = useState<{message: string, sender: string}[]>([])

    const [loadingThirdMessages, setLoadingThirdMessages] = useState(false)

    const [connecting, setConnecting] = useState(false)

    const [userMessage, setUserMessage] = useState("")

    const [token, setToken] = useState<string>("")

    const [connectedBot, setConnectedBot] = useState<string | null>(null)
    const [connectedBotIcon, setConnectedBotIcon] = useState<string | undefined>(undefined)

    async function getInfo() {
      const res = await fetch("http://localhost:5000/ginfo", {
        headers: {
          "x-access-token": localStorage.getItem("token")!
        }
      })
      const data = await res.json()
      console.log(data)

      // if (data.success === false) {
      //   toast.error("You are not logged in. Please login to continue.", {
      //     autoClose: 1000
      //   })
      //   // router.replace("/auth/login")
      // }
      let userDetails: {username?: string, username_b?: string, email: string, name: string, phone: number} = {
        username: "",
        username_b: "",
        name: "",
        phone: 0,
        email: ""
      }
      if (data.username === data.username_b) {
        userDetails = {
          username_b: data.username,
          name: data.name,
          phone: data.phone,
          email: data.email
        }
        // localStorage.setItem("user", JSON.stringify({username_b: data.username, name: data.name, phone: data.phone, email: data.email}))
      } else if (data.username_b === "None") {
        userDetails = {
          username: data.username,
          name: data.name,
          phone: data.phone,
          email: data.email
        }
        // localStorage.setItem("user", JSON.stringify({username: data.username, name: data.name, phone: data.phone, email: data.email}))
      } else {
        userDetails = data
      }
      localStorage.setItem("user", JSON.stringify(userDetails))

      if (userDetails.username){
        setChatCategory("personal")
        if (userDetails.username_b) {
          localStorage.getItem("token")
        }
      } else if (userDetails.username_b) {
        localStorage.getItem("token")
      }

    }

    async function sendMessage() {
      const message = userMessage
      setUserMessage("")
      console.log(message)
        setThirdChats([...thirdChats, {message: message, sender: "user"}, {message: "Loading...", sender: "bot"}])


      let uri = ""
      
      uri = `http://localhost:5000/connect-personal/${props.usernameToConnect}/${message}`
      console.log("URI=>", uri)

      if (plugin === "none") {
        if (chatCategory === "personal" || chatCategory === "initiator" || chatCategory === "business_initiator") {
          fetch(uri, {
            headers: {
              "x-access-token": localStorage.getItem("token")!,
            }
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
                setThirdChats([
                  ...thirdChats,
                  { message: message, sender: "user" },
                  { message: data.message, sender: "bot" },
                ]);
            })
            .catch((err) => {
              console.log(err);
              toast.info("Our servers are overloaded. Please try again later.");
                setThirdChats([
                  ...thirdChats,
                  { message: message, sender: "user" },
                  {
                    message: "Apologies, people are using my servers too much. Please try again later.",
                    sender: "bot",
                  },
                ]);
            });
        } else {
          const formData = new FormData()
          formData.append("typeOfFile", "text")
          formData.append("userinput", message)
          fetch(uri, {
            method: "POST",
            headers: {
              "x-access-token": localStorage.getItem("token")!,
            },
            body: formData
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              if (chatCategory === "personaltraining") {
                setPersonalTrainingChats([
                  ...personalTrainingChats,
                  { message: message, sender: "user" },
                  { message: data.message, sender: "bot" },
                ]);
              } else if (chatCategory === "business") {
                setTrainingChats([
                  ...trainingChats,
                  { message: message, sender: "user" },
                  { message: data.message, sender: "bot" },
                ])
              }
            })
            .catch((err) => {
              console.log(err);
              toast.info("Our servers are overloaded. Please try again later.");
              if (chatCategory === "business") {
                setTrainingChats([
                  ...trainingChats,
                  { message: message, sender: "user" },
                  {
                    message: "Apologies, people are using my servers too much. Please try again later.",
                    sender: "bot",
                  },
                ]);
              } else if (chatCategory === "personaltraining") {
                setPersonalTrainingChats([
                  ...thirdChats,
                  { message: message, sender: "user" },
                  {
                    message: "Apologies, people are using my servers too much. Please try again later.",
                    sender: "bot",
                  },
                ]);
              }
            });
        }
      } else if (plugin === "News") {
        fetch(`http://localhost:5000/news/${message}`, {
            headers: {
                "x-access-token": localStorage.getItem("token")!
            }
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setThirdChats([
              ...thirdChats,
              { message: message, sender: "user" },
              { message: data.message, sender: "bot" },
            ]);
          })
          .catch((err) => {
            console.log(err);
            toast.info("Our servers are overloaded. Please try again later.");
            setThirdChats([
              ...thirdChats,
              { message: message, sender: "user" },
              {
                message: "Apologies, people are using my servers too much",
                sender: "bot",
              },
            ]);
          });
      } else if (plugin === "Weather") {
        fetch(`http://localhost:5000/weather/${message}`, {
          headers: {
              "x-access-token": localStorage.getItem("token")!
          }
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setThirdChats([
              ...thirdChats,
              { message: message, sender: "user" },
              { message: data.message, sender: "bot" },
            ]);
          })
          .catch((err) => {
            console.log(err);
            toast.info("Our servers are overloaded. Please try again later.");
            setThirdChats([
              ...thirdChats,
              { message: message, sender: "user" },
              {
                message: "Apologies, people are using our servers too much",
                sender: "bot",
              },
            ]);
          });
      } else if (plugin === "IMDB") {
        fetch(`http://localhost:5000/imdb/${message}`, {
          headers: {
              "x-access-token": localStorage.getItem("token")!
          }
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setThirdChats([
              ...thirdChats,
              { message: message, sender: "user" },
              { message: data.message, sender: "bot" },
            ]);
          })
          .catch((err) => {
            console.log(err);
            toast.info("Our servers are overloaded. Please try again later.");
            setThirdChats([
              ...thirdChats,
              { message: message, sender: "user" },
              {
                message: "Apologies, people are using my servers too much",
                sender: "bot",
              },
            ]);
          });
      } else if (plugin === "Google") {
        fetch(`http://localhost:5000/google/${message}`, {
          headers: {
              "x-access-token": localStorage.getItem("token")!
          }
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setThirdChats([
              ...thirdChats,
              { message: message, sender: "user" },
              { message: data.message, sender: "bot" },
            ]);
          })
          .catch((err) => {
            console.log(err);
            toast.info("Our servers are overloaded. Please try again later.");
            setThirdChats([
              ...thirdChats,
              { message: message, sender: "user" },
              {
                message: "Apologies, people are using my servers too much",
                sender: "bot",
              },
            ]);
          });
      } else if (plugin === "YouTube") {
        fetch(`http://localhost:5000/yt/${message}`, {
          headers: {
              "x-access-token": localStorage.getItem("token")!
          }
      })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setThirdChats([
              ...thirdChats,
              { message: message, sender: "user" },
              { message: data.message, sender: "bot" },
            ]);
          })
          .catch((err) => {
            console.log(err);
            toast.info("Our servers are overloaded. Please try again later.");
            setThirdChats([
              ...thirdChats,
              { message: message, sender: "user" },
              {
                message: "Apologies, people are using my servers too much",
                sender: "bot",
              },
            ]);
          });
      }
    }

    async function checkBotExists (toConnectWith: string) {

      console.log("Testing", toConnectWith)


      try{
        const response = await fetch(`http://localhost:5000/check-username-exists/${ toConnectWith}`, {
          headers: {
            "x-access-token": localStorage.getItem("token")!,
          }
        })
        const data = await response.json()
        console.log(data)
  
        if (data.success == true) {
          toast.success("Connected to "+toConnectWith+" successfully!")
          setConnectedBot(toConnectWith)
          setConnecting(false)
        } else {
          toast.error("The VBot ID you entered does not exist. Please try again.")
          router.replace("/")
          setConnecting(false)
        }
      } catch (err) {
        console.log(err)
        toast.error("Couldn't connect to " + toConnectWith + ". Please try again.")
        setConnecting(false)
      }
    }

    // async function pastConnections () {
    //   const response = await fetch("http://localhost:5000/get-connections", {
    //     headers: {
    //       "x-access-token": localStorage.getItem("token")!,
    //     }
    //   })
    //   const data = await response.json()
    //   console.log("CONNxns", data)
    // }

    async function fetchMyWithThemMessages () {
      alert(props.usernameToConnect)
      setLoadingThirdMessages(true)
      const response = await fetch (`http://localhost:5000/thirdChats/${props.usernameToConnect}/${userDetails.username}`)
      const data = await response.json()
      setLoadingThirdMessages(false)

      console.log(data)
      let temp:{message: string, sender: string}[] = []
      if (data.messages.length > 0) data.messages.map((item: { Bot: any; User: any })=>{
        temp.push({message: item.Bot, sender: "bot"})
        temp.push({message: item.User, sender: "user"})
      })
      console.log("TEMP", temp)
      setThirdChats(temp)
    }

    async function fetchTheirWithMyMessages (toConnectWith: string) {
      if (userDetails !== null) {
      setLoadingThirdMessages(true)
      const response = await fetch (`http://localhost:5000/thirdChats/${userDetails.username ? userDetails.username : userDetails.username_b}/${toConnectWith}`)
      const data = await response.json()
      setLoadingThirdMessages(false)

      console.log(data)
      let temp:{message: string, sender: string}[] = []
      if (data.messages.length > 0) data.messages.map((item: { Bot: any; User: any })=>{
        temp.push({message: item.Bot, sender: "bot"})
        temp.push({message: item.User, sender: "user"})
      })
      console.log("TEMP", temp)
      setTempChats(temp)
    }
    }

    // const descriprions = {
    //   "personal": "Use this window like a regular ChatGPT interface for the same output. Your intelligence in getting the best response won't be available to ChatGPT. You don't want to make ChatGPT smarter at your expense!",
    //   "personaltraining": "",
    //   "business": "You are using your own agent. Use the below window to simulate how your bot is using the Role Description & Steps you have set to answer others. Go Back to the role description and steps and edit if you don't like what you see.",
    //   "initiator": "You are connecting to someone's personal bot. You can use this window to chat with them. You can also use the below window to simulate how their bot is using the Role Description & Steps they have set to answer others. Go Back to the role description and steps and edit if you don't like what you see.",
    //   "business_initiator": "You are connecting to some business's bot. You can use this window to chat with them. You can also use the below window to simulate how their bot is using the Role Description & Steps they have set to answer others. Go Back to the role description and steps and edit if you don't like what you see."
    // }

    // useEffect(()=>{
    //   console.log("third", thirdChats)
    //   checkBotExists(props.usernameToConnect)
    // }, [])

    useEffect(()=>{
      // delete this calling
    //   pastConnections()
      
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token") as string)
        getInfo()
      } else {
        toast.error("You are not logged in. Please login to continue.", {
          autoClose: 1000
        })
        router.replace("/auth/login")
      }
      const userTemp = localStorage.getItem("user")
      console.log("TEMPUSER", userTemp)
      let userDetails = JSON.parse(userTemp ? userTemp : "{}")

      console.log("User Details", userDetails)
      setUserDetails(userDetails)
      // fetchMyWithThemMessages()
      getIcon()
    }, [])

    async function getIcon () {
      try {
        console.log("Checking", connectedBot)
        const response = await fetch(`http://localhost:5000/get-pic/${connectedBot}`)
        const data = await response.text()
        console.log("Got img", data)
        const newImage = "http://localhost:5000/assets/"+data
        setConnectedBotIcon(newImage)
        console.log("Got img", connectedBotIcon)
      } catch {
        console.log("Error getting img")
        setConnectedBotIcon(undefined)
      }
    }

    const mode = props.mode
    const setMode = props.setMode

  return (
    <div className={`flex flex-col h-screen pb-64 grow relative duration-200 ${mode == "day" ? "bg-neutral-300 text-bg-500" : "bg-bg-700 text-white"}`}>
        <ToastContainer position="bottom-right" autoClose={2500} />
      {
        (thirdChats.length===0) &&
        <img src="/assets/chat-screen-top-left.svg" alt="" className="duration-200 absolute -left-72 -top-10" />
      }
      {
        (thirdChats.length===0) &&
        <img src="/assets/chat-screen-top-right.png" alt="" className="duration-200 absolute top-0 right-52" />
      }
      {
        (thirdChats.length===0) &&
        <img src="/assets/chat-screen-bottom-right.png" alt="" className="duration-200 absolute bottom-0 right-0" />
      }
      {
        (thirdChats.length===0) &&
        <img src="/assets/chat-screen-bottom-left.png" alt="" className="duration-200 absolute bottom-0 -left-24" />
      }
      <br /><br /><br />

      <span className="p-2 py-1 text-xs flex md:hidden items-center text-center justify-center bg-teal-600 text-white font-medium mt-2">
        For Full Experience, use the Desktop Version.
      </span>

      <div className={`w-full  relative md:mt-2 py-2 flex "flex-row" justify-between z-50 backdrop-blur-md`}>
        <Dropdown mode={mode} title="Plugin" className="mr-2 md:mr-5 ml-auto" list={[
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
        ]} selectedChatCategory={plugin} />
      </div>

        <ChatList
          botIcon={connectedBotIcon ? connectedBotIcon : undefined}
          chats={ thirdChats }
          mode={mode}
          setMode={setMode}
        />
        
        <div className={`flex flex-col gap-5 absolute w-full px-4 md:px-32 bottom-0 z-50 py-6 pt-16 duration-200 ${mode == "day" ? (chatCategory === "initiator" && thirdChats.length != 0) && "bg-gradient-to-t from-white via-white to-transparent" : (chatCategory === "initiator" && thirdChats.length != 0) && "bg-gradient-to-t from-bg-700 via-bg-700 to-transparent"}`}>
          
          <button className={`py-3 px-4 flex min-w-max items-center w-fit gap-2 text-sm self-center font-medium bg-transparent rounded border duration-200 ${mode === "day" ? "border-bg-50 text-bg-50" : "border-neutral-700 text-neutral-700"} `} onClick={()=>{ setThirdChats([]) }}>
            <RefreshOutlined className="w-5 h-5" />
            Reset chat
          </button>

          {/* <span className={`${mode === "day" ? "text-bg-50" : "text-neutral-500"} duration-200 text-sm font-medium`}>Current search category: Ticket booking</span> */}

          <div className={`flex flex-row justify-between p-3 rounded duration-200 ${mode === "day" ? "bg-white" : "bg-bg-600"} border ${mode === "user" ? "border-bg-50" : "border-bg-500"}`}>
            <input
              type="text"
              className={`bg-transparent grow text-sm border-none outline-none ${mode === "day" ? "text-bg-50" : "text-neutral-500"}}`}
              placeholder="Text area"
              value={userMessage}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                    (thirdChats.length>0 && thirdChats[thirdChats?.length-1]?.message==="Loading...") ? console.log('l') : sendMessage()
                }
              }}
              onChange={(e) => {
                setUserMessage(e.target.value)
              }}
            />
            <div className="icons flex gap-5">
              {/* <MicNoneOutlined className="w-5 h-5 fill-bg-50 cursor-pointer hover:fill-neutral-700 focus:fill-neutral-400" /> */}
              <SendOutlined onClick={()=> { (thirdChats.length>0 && thirdChats[thirdChats?.length-1]?.message==="Loading...") ? console.log('l') : sendMessage()}} className={`w-5 h-5 ${thirdChats[thirdChats?.length-1]?.message==="Loading..." ? "fill-bg-300" : "fill-bg-50"} fill-bg-50 cursor-pointer ${thirdChats[thirdChats?.length-1]?.message==="Loading..." ? "" : "hover:fill-neutral-700 focus:fill-neutral-400"}`} />
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