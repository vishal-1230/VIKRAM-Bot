import { useEffect, useState, useContext } from "react"
import ChatList from "./ChatList"
import { ArrowOutward, ArrowOutwardOutlined, Autorenew, CancelOutlined, CheckCircle, Delete, InfoRounded, MenuOpenOutlined, MicNoneOutlined, RefreshOutlined, SendOutlined } from "@mui/icons-material"
import Dropdown from "@/components/Dropdown"
import PrimaryButton from "@/components/PrimaryButton"
import { useRouter } from "next/router"
import { Card, DialogTitle, Popover, Tooltip, selectClasses } from "@mui/material"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import OutlineButton from "@/components/OutlineButton"
import Button from "@/components/SpecialButton"
import { Inter } from "next/font/google"

const inter = Inter({subsets: ['latin']})

function ChatArea(props: {
  changeChatToNotif: string, mode: string, setMode: any, showPersonalBotDialog: boolean, setShowPersonalBotDialog: any, showBusinessBotDialog: boolean, setShowBusinessBotDialog: any, changeChatTo: string | null, setChangeChatTo: any
}) {

  const router = useRouter()

  const [userDetails, setUserDetails] = useState<any>(null)

  const [chatCategory, setChatCategory] = useState<"personal" | "personaltraining" | "business" | "business_initiator" | "initiator" | string>("personal")

  const [plugin, setPlugin] = useState<"News" | "Weather" | "IMDB" | "Google" | "YouTube" | "none">("none")
    
    const [chats, setChats] = useState<{message: string, sender: string}[]>([])
    const [personalTrainingChats, setPersonalTrainingChats] = useState<{message: string, sender: string}[]>([])
    const [trainingChats, setTrainingChats] = useState<{message: string, sender: string}[]>([])
    const [thirdChats, setThirdChats] = useState<{message: string, sender: string}[]>([])
    const [thirdBusinessChats, setThirdBusinessChats] = useState<{message: string, sender: string}[]>([])
    const [tempChats, setTempChats] = useState<{message: string, sender: string}[]>([])

    const [toConnectWith, setToConnectWith] = useState<string>("")

    const [loadingChat, setLoadingChat] = useState(false)
    const [loadingThirdMessages, setLoadingThirdMessages] = useState(false)
    const [loadingThirdBusinessMessages, setLoadingThirdBusinessMessages] = useState(false)

    const [connecting, setConnecting] = useState(false)

    const [userMessage, setUserMessage] = useState("")

    const [token, setToken] = useState<string>("")

    const [connectedBot, setConnectedBot] = useState<string | null>(null)
    const [connectedBotIcon, setConnectedBotIcon] = useState<string | undefined>(undefined)


    const [categories, setCategories] = useState<{text: string, onClick: any}[]>([
      {text: "My Personal Bot", onClick: () => {setChatCategory("personal");}},
      {text: "My Business Bot (Training)", onClick: () => {setChatCategory("business")}},
      {text: "Connect to someone's bot", onClick: () => {setChatCategory("initiator")}},
      {text: "Connect to a Business", onClick: () => {setChatCategory("business_initiator")}},
    ])

    async function getInfo() {
      const res = await fetch("https://server.vikrambots.in/ginfo", {
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
          setCategories([
            {text: "My Personal Bot", onClick: () => {setChatCategory("personal");}},
            {text: "Personal Bot (Testing)", onClick: ()=> {setChatCategory("personaltraining")}},
            {text: "My Business Bot (Training)", onClick: () => {setChatCategory("business")}},
            {text: "Connect to someone's bot", onClick: () => {setChatCategory("initiator")}},
            {text: "Connect to a Business", onClick: () => {setChatCategory("business_initiator")}},
          ])
          localStorage.getItem("token") && fetchMessage()
        } else {
          setCategories([
            {text: "My Personal Bot", onClick: () => {setChatCategory("personal");}},
            {text: "Personal Bot (Testing)", onClick: ()=> {setChatCategory("personaltraining")}},
            {text: "Connect to someone's bot", onClick: () => {setChatCategory("initiator")}},
            {text: "Connect to a Business", onClick: () => {setChatCategory("business_initiator")}},
          ])
        }
      } else if (userDetails.username_b) {
        setChatCategory("business")
        setCategories([
          {text: "My Business Bot (Training)", onClick: () => {setChatCategory("business")}},
          // {text: "Connect to someone's bot", onClick: () => {setChatCategory("initiator")}},
          // {text: "Connect to a Business", onClick: () => {setChatCategory("business_initiator")}},
        ])
        localStorage.getItem("token") && fetchTrainingMessage()
      }

    }

    async function sendMessage() {
      const message = userMessage
      setUserMessage("")
      console.log(message)
      if (chatCategory === "personal") {
        setChats([...chats, {message: message, sender: "user"}, {message: "Loading...", sender: "bot"}])
      } else if (chatCategory === "personaltraining") {
        setPersonalTrainingChats([...personalTrainingChats, {message: message, sender: "user"}, {message: "Loading...", sender: "bot"}])
      } else if (chatCategory === "business") {
        setTrainingChats([...trainingChats, {message: message, sender: "user"}, {message: "Loading...", sender: "bot"}])
      } else if (chatCategory === "initiator") {
        setThirdChats([...thirdChats, {message: message, sender: "user"}, {message: "Loading...", sender: "bot"}])
      } else if (chatCategory === "business_initiator") {
        setThirdBusinessChats([...thirdBusinessChats, {message: message, sender: "user"}, {message: "Loading...", sender: "bot"}])
      }

      let uri = ""
      if(chatCategory === "personal") {
        uri = `https://server.vikrambots.in/general/${message}`
      } else if (chatCategory === "personaltraining") {
        uri = `https://server.vikrambots.in/test_personal`
      } else if(chatCategory === "business") {
        uri = `https://server.vikrambots.in/training`
      } else if(chatCategory === "initiator") {
        if (toConnectWith === "") {
          toast.error("Please enter a VBot ID to connect to.")
        } else {
          uri = `https://server.vikrambots.in/connect-personal/${toConnectWith}/${message}`
        }
      } else if(chatCategory === "business_initiator") {
        if (toConnectWith === "") {
          toast.error("Please enter a VBot ID to connect to.")
        } else {
          uri = `https://server.vikrambots.in/connect-business/${toConnectWith.endsWith("_b") ? toConnectWith : toConnectWith+"_b"}/${message}`
        }
      }
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
              if (chatCategory === "personal") {
                setChats([
                  ...chats,
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
              toast.info("Our servers are overloaded. Please try again later.");
              if (chatCategory === "personal") {
  
              setChats([
                ...chats,
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
        fetch(`https://server.vikrambots.in/news/${message}`, {
            headers: {
                "x-access-token": localStorage.getItem("token")!
            }
        })
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
            toast.info("Our servers are overloaded. Please try again later.");
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
        fetch(`https://server.vikrambots.in/weather/${message}`, {
          headers: {
              "x-access-token": localStorage.getItem("token")!
          }
      })
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
            toast.info("Our servers are overloaded. Please try again later.");
            setChats([
              ...chats,
              { message: message, sender: "user" },
              {
                message: "Apologies, people are using our servers too much",
                sender: "bot",
              },
            ]);
          });
      } else if (plugin === "IMDB") {
        fetch(`https://server.vikrambots.in/imdb/${message}`, {
          headers: {
              "x-access-token": localStorage.getItem("token")!
          }
      })
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
            toast.info("Our servers are overloaded. Please try again later.");
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
        fetch(`https://server.vikrambots.in/google/${message}`, {
          headers: {
              "x-access-token": localStorage.getItem("token")!
          }
      })
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
            toast.info("Our servers are overloaded. Please try again later.");
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
        fetch(`https://server.vikrambots.in/yt/${message}`, {
          headers: {
              "x-access-token": localStorage.getItem("token")!
          }
      })
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
            toast.info("Our servers are overloaded. Please try again later.");
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

    async function checkBotExists (toConnectWith: string) {

      setConnecting(true)

      const message = "Hi"
      console.log("Testing", toConnectWith)


      try{
        const response = await fetch(`https://server.vikrambots.in/check-username-exists/${ chatCategory==="initiator" ? toConnectWith : toConnectWith.endsWith("_b") ? toConnectWith : toConnectWith+"_b"}`, {
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
          setConnecting(false)
        }
      } catch (err) {
        console.log(err)
        toast.error("Couldn't connect to " + toConnectWith + ". Please try again.")
        setConnecting(false)
      }
    }

    async function fetchMessage () {
      const userTemp = localStorage.getItem("user")
      const userDetails = JSON.parse(userTemp ? userTemp : "{}")

      setUserDetails(userDetails)
      console.log("Details", userDetails)
      const response = await fetch(`https://server.vikrambots.in/gchats`, {
        headers: {
          "x-access-token": localStorage.getItem("token")!,
        }
      })
      const data = await response.json()
      console.log("DATA", data)
      // data.message format is [ {Bot: "Hello", User: "bot"}, {Bot: "Hi", sendeuser: "user"}] that has to be converted to [{message: "Hello", sender: "bot"}, {message: "Hi", sender: "user"}]
      let temp:{message: string, sender: string}[] = []
      if (data.message!=false) data.message.map((item: { Bot: any; User: any })=>{
        temp.push({message: item.Bot, sender: "bot"})
        temp.push({message: item.User, sender: "user"})
      })
      console.log("TEMP", temp)
      setChats(temp.reverse())
    }

    async function fetchPersonalTrainingMessage () {
      const response = await fetch("")
      const data = await response.json()
    }

    async function pastConnections () {
      const response = await fetch("https://server.vikrambots.in/get-connections", {
        headers: {
          "x-access-token": localStorage.getItem("token")!,
        }
      })
      const data = await response.json()
      console.log("CONNxns", data)
    }

    async function fetchMyWithThemMessages () {
      setLoadingThirdMessages(true)
      const response = await fetch (`https://server.vikrambots.in/chats/${toConnectWith}/${userDetails.username}`)
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
      const response = await fetch (`https://server.vikrambots.in/chats/${userDetails.username ? userDetails.username : userDetails.username_b}/${toConnectWith}`)
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

    async function fetchBothsBusinessMessage () {
      setLoadingThirdBusinessMessages(true)
      const response = await fetch(`https://server.vikrambots.in/chats/${toConnectWith.endsWith("_b") ? toConnectWith : toConnectWith+"_b"}/${userDetails.username}`)
      const data = await response.json()
      setLoadingThirdBusinessMessages(false)

      console.log(data)
      let temp:{message: string, sender: string}[] = []
      if (data.messages.length > 0) data.messages.map((item: { Bot: any; User: any })=>{
        temp.push({message: item.Bot, sender: "bot"})
        temp.push({message: item.User, sender: "user"})
      })
      console.log("TEMP", temp)
      setThirdBusinessChats(temp)
      console.log("3rd bizz", data)
    }

    async function fetchTrainingMessage () {
      const userTemp = localStorage.getItem("user")
      const userDetails = JSON.parse(userTemp ? userTemp : "{}")

      setUserDetails(userDetails)
      const response = await fetch(`https://server.vikrambots.in/gchats`, {
        headers: {
          "x-access-token": localStorage.getItem("token")!,
        }
      })
      const data = await response.json()
      console.log(data)
      let temp:{message: string, sender: string}[] = []
      if (data.message!=false) data.message.map((item: { Bot: any; User: any })=>{
        temp.push({message: item.Bot, sender: "bot"})
        temp.push({message: item.User, sender: "user"})
      })
      setTrainingChats(temp.reverse())
    }

    const descriprions = {
      "personal": "Use this window like a regular ChatGPT interface for the same output. Your intelligence in getting the best response won't be available to ChatGPT. You don't want to make ChatGPT smarter at your expense!",
      "personaltraining": "",
      "business": "You are using your own agent. Use the below window to simulate how your bot is using the Role Description & Steps you have set to answer others. Go Back to the role description and steps and edit if you don't like what you see.",
      "initiator": "You are connecting to someone's personal bot. You can use this window to chat with them. You can also use the below window to simulate how their bot is using the Role Description & Steps they have set to answer others. Go Back to the role description and steps and edit if you don't like what you see.",
      "business_initiator": "You are connecting to some business's bot. You can use this window to chat with them. You can also use the below window to simulate how their bot is using the Role Description & Steps they have set to answer others. Go Back to the role description and steps and edit if you don't like what you see."
    }


    const [showPersonalBotDialog, setShowPersonalBotDialog] = [props.showPersonalBotDialog, props.setShowPersonalBotDialog]
    const [showBusinessBotDialog, setShowBusinessBotDialog] = [props.showBusinessBotDialog, props.setShowBusinessBotDialog]

    useEffect(()=>{
      console.log("chat", chats)
      console.log("training", trainingChats)
      console.log("third", thirdChats)
      console.log("third business", thirdBusinessChats)
    }, [chatCategory])

    useEffect(()=>{
      // delete this calling
      pastConnections()
      
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
      // if (userDetails.username){
      //   setChatCategory("personal")
      //   if (userDetails.username_b) {
      //     setCategories([
      //       {text: "My Personal Bot", onClick: () => {setChatCategory("personal");}},
      //       {text: "Personal Bot (Testing)", onClick: ()=> {setChatCategory("personaltraining")}},
      //       {text: "My Business Bot (Training)", onClick: () => {setChatCategory("business")}},
      //       {text: "Connect to someone's bot", onClick: () => {setChatCategory("initiator")}},
      //       {text: "Connect to a Business", onClick: () => {setChatCategory("business_initiator")}},
      //     ])
      //     localStorage.getItem("token") && fetchMessage()
      //   } else {
      //     setCategories([
      //       {text: "My Personal Bot", onClick: () => {setChatCategory("personal");}},
      //       {text: "Personal Bot (Testing)", onClick: ()=> {setChatCategory("personaltraining")}},
      //       {text: "Connect to someone's bot", onClick: () => {setChatCategory("initiator")}},
      //       {text: "Connect to a Business", onClick: () => {setChatCategory("business_initiator")}},
      //     ])
      //   }
      // } else if (userDetails.username_b) {
      //   setChatCategory("business")
      //   setCategories([
      //     {text: "My Business Bot (Training)", onClick: () => {setChatCategory("business")}},
      //     // {text: "Connect to someone's bot", onClick: () => {setChatCategory("initiator")}},
      //     // {text: "Connect to a Business", onClick: () => {setChatCategory("business_initiator")}},
      //   ])
      //   localStorage.getItem("token") && fetchTrainingMessage()
      // }
      
      setUserDetails(userDetails)
      
    }, [])
    
    useEffect(()=>{
      userDetails?.username ? getAllPersonalInfo() : userDetails?.username_b ? getAllBusinessInfo() : null
    }, [showPersonalBotDialog, showBusinessBotDialog])

    async function getIcon () {
      try {
        console.log("Checking", connectedBot)
        const response = await fetch(`https://server.vikrambots.in/get-pic/${connectedBot}`)
        const data = await response.text()
        console.log("Got img", data)
        const newImage = "https://server.vikrambots.in/assets/"+data
        setConnectedBotIcon(newImage)
        console.log("Got img", connectedBotIcon)
      } catch {
        console.log("Error getting img")
        setConnectedBotIcon(undefined)
      }
    }

    useEffect(()=>{
      if (chatCategory === "initiator") {
        fetchMyWithThemMessages()
      } else if (chatCategory === "business_initiator") {
        fetchBothsBusinessMessage()
      }
      connectedBot != null && connectedBot != undefined && getIcon()
    }, [connectedBot])

    useEffect(()=>{
      const changeChatTo = props.changeChatTo
      console.log("Changing", changeChatTo)
      
      if (changeChatTo?.endsWith("_b")){
        setChatCategory("business_initiator")
        setToConnectWith(changeChatTo)
        checkBotExists(changeChatTo)
        fetchBothsBusinessMessage()
      } else if (changeChatTo) {
        setChatCategory("initiator")
        setToConnectWith(changeChatTo)
        checkBotExists(changeChatTo)
        fetchMyWithThemMessages()
      }
    }, [props.changeChatTo])

    useEffect(()=>{
      const changeChatToNotif = props.changeChatToNotif
      console.log("Changing", changeChatToNotif)
      fetchTheirWithMyMessages(changeChatToNotif)
      setChatCategory(changeChatToNotif)
    }, [props.changeChatToNotif])

    const mode = props.mode
    const setMode = props.setMode

    // 
    //  PERSONAL BUSINESS STEPS EDIT BOXES AND VARS
    // 
    const [typeOfRules, setTypeOfRules] = useState<"text" | "file">("text")
    const [typeOfUserInfo, setTypeOfUserInfo] = useState<"text" | "file">("text")
    const [user_info, setUser_info] = useState<string>("")
    const [user_info_file, setUser_info_file] = useState<File | string>("")
    
    const [botRules, setBotRules] = useState<string[]>([""])
    const [botRules2, setBotRules2] = useState<string>("")
    const [botRulesFile, setBotRulesFile] = useState<File | string>("")

    const [showSampleRules, setShowSampleRules] = useState(false)
    
    const [disableSubmit, setDisableSubmit] = useState(true)
    
    // AFTER PERSONAL MOVING TO BUSINESS DIALOG
    const [companyDetails, setCompanyDetails] = useState<string>("")
    const [botBusinessSteps, setBotBusinessSteps] = useState<string[]>([""])
    const [botBusinessSteps2, setBotBusinessSteps2] = useState<string>("")
    const [roleDesciption, setRoleDescription] = useState<string>("")

    const [companyDetailsFile, setCompanyDetailsFile] = useState<File | string>("")
    const [botBusinessStepsFile, setBotBusinessStepsFile] = useState<File | string>("")
    const [roleDesciptionFile, setRoleDescriptionFile] = useState<File | string>("")

    const [showSampleRoleDescription, setShowSampleRoleDescription] = useState(false)
    const [showSampleBusinessSteps, setShowSampleBusinessSteps] = useState(false)
    
    const [userInfoLoading, setUserInfoLoading] = useState(false)
    const [botRulesLoading, setBotRulesLoading] = useState(false)
    const [companyDetailsLoading, setCompanyDetailsLoading] = useState(false)
    const [roleDescriptionLoading, setRoleDescriptionLoading] = useState(false)
    const [botBusinessStepsLoading, setBotBusinessStepsLoading] = useState(false)


    async function getAllPersonalInfo () {
      // 2 functions, user info, rules
      setUserInfoLoading(true)
      setBotRulesLoading(true)
      const response1 = await fetch("https://server.vikrambots.in/load_user_info", {
        headers: {
          "x-access-token": localStorage.getItem("token")!
        }
      })
      const data1 = await response1.json()

      const reponse2 = await fetch("https://server.vikrambots.in/load_rules", {
        headers: {
          "x-access-token": localStorage.getItem("token")!
        }
      })
      const data2 = await reponse2.json()

      setUserInfoLoading(false)
      setBotRulesLoading(false)

      console.log(data1, data2)
      if (data1.success === true){
        setUser_info(data1.message)
      } else {
        setUser_info("")
      }

      if (data2.success === true){
        setBotRules2(data2.message)
      } else {
        setBotRules2("")
      }
    }

    async function getAllBusinessInfo () {
      // 3 functions, company details, role description, steps
      setCompanyDetailsLoading(true)
      setRoleDescriptionLoading(true)
      setBotBusinessStepsLoading(true)
      console.log("Getting all business info")
      const response3 = await fetch("https://server.vikrambots.in/cinfo", {
        headers: {
          "x-access-token": localStorage.getItem("token")!
        }
      })
      const data3 = await response3.json()

      const response4 = await fetch("https://server.vikrambots.in/load_botrole", {
        headers: {
          "x-access-token": localStorage.getItem("token")!
        }
      })
      const data4 = await response4.json()

      const response5 = await fetch("https://server.vikrambots.in/load_steps", {
        headers: {
          "x-access-token": localStorage.getItem("token")!
        }
      })
      const data5 = await response5.json()

      setCompanyDetailsLoading(false)
      setRoleDescriptionLoading(false)
      setBotBusinessStepsLoading(false)

      console.log(data3, data4, data5)
      if (data3.success === true){
        setCompanyDetails(data3.message)
      } else {
        setCompanyDetails("")
      }

      if (data4.success === true){
        setRoleDescription(data4.message)
      } else {
        setRoleDescription("")
      }

      if (data5.success === true) {
        setBotBusinessSteps2(data5.message)
      } else {
        setBotBusinessSteps2("")
      }
    }

    const [updatingUserInfo, setUpdatingUserInfo] = useState<boolean>(false)
    const [updatingRules, setUpdatingRules] = useState<boolean>(false)
    const [updatingCompanyDetails, setUpdatingCompanyDetails] = useState<boolean>(false)
    const [updatingRoleDescription, setUpdatingRoleDescription] = useState<boolean>(false)
    const [updatingSteps, setUpdatingSteps] = useState<boolean>(false)
    

    async function updateInfo (type: string) {
      let title: string = ""
      let uri: string = ""
      let body: {[property: string]: string} = {}

      switch (type) {
        case "user_info":
          title = "User Info"
          uri = "https://server.vikrambots.in/edit_user_info"
          body = {info: user_info}
          setUpdatingUserInfo(true)
          break;
        case "rules":
          title = "Rules"
          uri = "https://server.vikrambots.in/edit_rules"
          body = {rules: botRules2}
          setUpdatingRules(true)
          break;
        case "company_details":
          title = "Company Details"
          uri = "https://server.vikrambots.in/edit_company_info"
          body = {company_details: companyDetails}
          setUpdatingCompanyDetails(true)
          break;
        case "role_description":
          title = "Role Description"
          uri = "https://server.vikrambots.in/edit_botrole"
          body = {role_description: roleDesciption}
          setUpdatingRoleDescription(true)
          break;
        case "steps":
          title = "Steps"
          uri = "https://server.vikrambots.in/edit_steps"
          body = {new_steps: botBusinessSteps2}
          setUpdatingSteps(true)
          break;
        default:
          break;
      }

      const reponse = await fetch(uri, {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem("token")!,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      const data = await reponse.json()
      console.log(data)
      setUpdatingUserInfo(false)
      setUpdatingRules(false)
      setUpdatingCompanyDetails(false)
      setUpdatingRoleDescription(false)
      setUpdatingSteps(false)

      if (data.success === true) {
        toast.success(title + " updated successfully!")
      } else {
        toast.error("Something went wrong. Please try again.")
      }

    }

    const [showFileUploadDialog, setShowFileUploadDialog] = useState(false)
    const [knowledgebaseFile, setKnowledgebaseFile] = useState<File | string>("")
    const [knowledgebaseLoading, setKnowledgebaseLoading] = useState(false)

    async function uploadKnowledgebase () {
      setShowFileUploadDialog(true)
      setKnowledgebaseLoading(true)

      let uri = ""
      if (chatCategory === "personaltraining") {
        uri = `https://server.vikrambots.in/test_personal`
      } else if(chatCategory === "business") {
        uri = `https://server.vikrambots.in/training`
      }

      if (knowledgebaseFile === "") {
        toast.error("Please select a file to upload.")
      } else {
        const formData = new FormData()
        formData.append("typeOfFile", "file")
        formData.append("file", knowledgebaseFile)
        const response = await fetch(uri, {
          method: "POST",
          headers: {
            "x-access-token": localStorage.getItem("token")!,
          },
          body: formData
        })
        const data = await response.json()
        setKnowledgebaseLoading(false)
        console.log("UPLOAD", data)
        if (data.success === true) {
          setShowFileUploadDialog(false)
          toast.success("Knowledgebase uploaded successfully!")
        } else {
          toast.error("Something went wrong. Please try again.")
        }
      }
    }

  return (
    <div className={`flex flex-col h-screen pb-64 grow relative duration-200 ${mode == "day" ? "bg-neutral-300 text-bg-500" : "bg-bg-700 text-white"}`}>
        <ToastContainer position="bottom-right" autoClose={2500} />
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
        {/* Personal bot user_info & rules */}
        <div className={`flex flex-col items-center mt-8 fixed top-0 left-0 z-[1000] h-screen w-screen bg-black bg-opacity-60 justify-center gap-5 ${showPersonalBotDialog === true ? "block" : "hidden"}`}>
            <Card className='!bg-bg-800 max-h-[90vh] max-w-[85vw] p-6 md:p-8 h-[87vh] rounded-lg !text-neutral-400 flex flex-col items-center relative'>
            <DialogTitle className='text-xl md:text-2xl font-semibold text-center'>Update Interaction Rules
              <span className="absolute h-fit cursor-pointer top-10 right-5 md:right-10" onClick={()=>{ setShowPersonalBotDialog(false) }}>
                <CancelOutlined />
              </span>
            </DialogTitle>
            <span className="md:text-lg text-center">Update the rules which your bot needs to follow when others use it.</span>
                <div className="grid lg:grid-cols-2 overflow-y-auto gap-3 mt-3">
                    <div className="flex flex-col h-full items-center md:border-r border-t border-t-neutral-800 md:border-t-0 border-r-gray-200 gap-2 lg:px-6 py-5">
                        <span className="text-semibold text-center">Enter a Role description</span>
                        <span className="text-xs font-light mb-4">Your bot will interact with others with this Persona.</span>
                        {
                            userInfoLoading === true ? <img src="/assets/loading-circle.svg" alt="loading..." /> : <textarea placeholder='Amit is a software developer with 5 years of exprerience. His areasof expertise are...' rows={4} cols={4} value={user_info} onChange={(e)=>{setUser_info(e.target.value)}} className="text-sm text-neutral-50 bg-transparent p-2 py-1 outline-none border-[1px] border-[#DDD6D6] rounded-md w-full h-full" />
                        }

                        {/* <span className="text-semibold mb-2 mt-8 justify-self-end">or Simply upload your Resume PDF</span> */}
                        {/* <input type="file" name="" id="" className='self-center text-center text-sm text-neutral-50 p-1 pb-5 outline-none rounded-md' onChange={(e)=>{
                            e?.target?.files && setUser_info_file(e?.target?.files[0])
                        }} /> */}
                        {/* <label htmlFor="images" className="drop-container" onDragOver={(e)=>{
                            e.preventDefault()
                        }} onDrop={(e)=>{
                            e.preventDefault()
                            setUser_info_file(e?.dataTransfer?.files[0])
                            console.log(e?.dataTransfer?.files[0])
                            console.log(typeof e?.dataTransfer?.files[0])
                        }}>
                        <span className="drop-title">Drop files here</span>
                        <span className='-mb-2'>
                            or
                        </span>
                        <input type="file" name="" id="images" className='self-center text-center text-sm text-neutral-50 p-1 outline-none rounded-md'
                        // value={typeof user_info_file === "object" ? user_info_file?.name : user_info_file}
                        onChange={(e)=>{
                            e?.target?.files && setUser_info_file(e?.target?.files[0])
                        }} />
                        </label> */}
                        <Button title="Update my Info" buttonStyle='w-full font-semibold mt-10 mb-0 lg:w-fit mx-auto' onClick={()=>{ 
                        // trainBotRules()
                        updateInfo("user_info")
                          }}
                          Icon={()=> {return updatingUserInfo === true ? <img src="/assets/loading-circle.svg" alt="loading..." className="w-5 h-5 self-center ml-2" /> : <></>}}
                        />
                    </div>
                    <div className="flex flex-col h-full items-center border-t border-t-neutral-800 md:border-t-0 gap-2 px-6 py-5">
                        <span className='text-semibold'>Edit rules manually</span>
                        <span className="text-xs font-light mb-4">Your bot will follow these rules when interacting with others. You can add upto 10 rules.</span>
                        {/* 
                        {
                            botRules.map((rule, index) => {
                                return <div className="flex flex-row gap-2 items-center">
                                    <span className="text-sm font-medium min-w-max">Rule #{index+1}.</span>
                                    <input type="text" placeholder='Enter rule' className="text-sm text-black p-2 py-1 outline-none border-[1px] border-[#DDD6D6] rounded-md" value={rule} onChange={(e)=>{
                                        let temp = [...botRules]
                                        temp[index] = e.target.value
                                        setBotRules(temp)
                                    }} />
                                    <AddCircleRounded className='cursor-pointer w-5 text-green-400' onClick={()=>{
                                        setBotRules([...botRules, ""])
                                    }} />
                                    <CancelRounded className={`cursor-pointer w-5 text-red-400 ${botRules.length===1 && "hidden"}`} onClick={()=>{
                                        let temp = botRules
                                        temp = temp.filter((item, i) => i !== index)
                                        setBotRules(temp)
                                    }} />
                                </div>
                            })
                        }
                        */}
                        {
                            botRulesLoading === true ? <img src="/assets/loading-circle.svg" alt="loading..." /> : <textarea placeholder='Type the rules that your bot will follow while interacting' rows={6} cols={4} value={botRules2} onChange={(e)=>{setBotRules2(e.target.value)}} className="text-sm text-white bg-transparent p-2 py-1 outline-none border-[1px] border-[#DDD6D6] rounded-md w-full h-full" />
                        }
                        {/* <textarea placeholder='Type the rules that your bot will follow while interacting' rows={6} cols={4} value={botRules2} onChange={(e)=>{setBotRules2(e.target.value)}} className="text-sm text-white bg-transparent p-2 py-1 outline-none border-[1px] border-[#DDD6D6] rounded-md w-full h-full" /> */}
                        {/* <span className="text-semibold mb-2 mt-8 justify-self-end">or Upload Rules PDF</span> */}
                        {/* <input type="file" name="" id="" className='self-center text-center text-sm text-neutral-50 p-3 outline-none rounded-md' onChange={(e)=>{
                            e?.target?.files && setBotRulesFile(e?.target?.files[0])
                        }} /> */}
                        {/* <label htmlFor="images" className="drop-container" onDragOver={(e)=>{ e.preventDefault() }} onDrop={(e)=>{ e.preventDefault(); setBotRulesFile(e?.dataTransfer?.files[0]) }}>
                        <span className="drop-title">Drop files here</span>
                        <span className='-mb-2'>
                            or
                        </span>
                        <input type="file" name="" id="images" className='self-center text-center text-sm text-neutral-50 p-3 outline-none rounded-md' onChange={(e)=>{
                            e?.target?.files && setBotRulesFile(e?.target?.files[0])
                        }} />
                        </label> */}
                        <Button title="Update bot rules" buttonStyle='w-full font-semibold mt-10 mb-0 lg:w-fit mx-auto' onClick={()=>{ 
                        // trainBotRules()
                            updateInfo("rules")
                          }}
                          Icon={()=> {return updatingRules === true ? <img src="/assets/loading-circle.svg" alt="loading..." className="w-5 h-5 self-center ml-2"  /> : <></>}}
                        />
                    </div>
                </div>
                <div className=" flex flex-col items-center gap-1 md:gap-2 mt-3 lg:gap-0 lg:grid lg:grid-cols-3 lg:mt-auto justify-between">
                    <OutlineButton title="Show sample rules" buttonStyle='text-sm w-full lg:w-fit mr-auto' onClick={()=>{ setShowSampleRules(true) }} />
                    {/* <Button title="Submit" buttonStyle='w-full font-semibold mt-2 mb-0 lg:w-fit mx-auto' onClick={()=>{ 
                        // trainBotRules()
                    }} /> */}
                    <div></div>
                    <OutlineButton title="Continue with normal rules!" buttonStyle='text-sm w-full lg:w-fit ml-auto' onClick={()=>{
                        setBotRules2("Verify the identity of the person initiating contact. Confirm their name and organization Ask the person to briefly state the purpose of the interaction or the problem they want to solve Try responding to the problem to the best of your ability Politely decline the interaction appears negative, abusive or harmful After every interaction, ask for feedback")
                    }} />
                </div>
            </Card>
        </div>

            {/* Business bot steps etc */}
          <div className={`flex flex-col items-center mt-8 fixed top-0 left-0 z-[1000] h-screen w-screen bg-black bg-opacity-60 justify-center gap-5 ${showBusinessBotDialog === true ? "block" : "hidden"}`}>
              <Card className='!bg-bg-900 max-h-[85vh] md:max-h-[90vh] p-6 md:p-8 px-5 max-w-[85vw] md:max-w-[95vw] rounded-lg !text-neutral-50 flex flex-col relative'>
                  <DialogTitle className='text-xl md:text-2xl font-semibold text-center'>Update Agent Interaction Rules
                    <span className="absolute h-fit cursor-pointer top-10 right-10" onClick={()=>{ setShowBusinessBotDialog(false) }}>
                      <CancelOutlined />
                    </span>
                  </DialogTitle>
                  <span className="md:text-lg text-center -mt-2">Update the rules which your bot needs to follow when others use it.</span>
                  <div className="grid overflow-y-auto grid-cols-1 lg:grid-cols-3 gap-3 mt-3 mb-4">
                    <div className="flex flex-col h-full border-t border-t-neutral-800 md:border-t-0 items-center gap-2 py-8 px-3 md:px-6">
                        <span className="text-semibold mb-4">Edit information about your business or company (optional)</span>
                        {
                            companyDetailsLoading === true ? <img src="/assets/loading-circle.svg" alt="loading..." /> : <textarea placeholder='Enter role description' rows={5} cols={4} value={companyDetails} onChange={(e)=>{setCompanyDetails(e.target.value)}} className="text-sm text-neutral-50 bg-transparent p-2 outline-none border-[1px] border-[#DDD6D6] rounded-md w-full h-full" />
                        }
                        {/* <textarea placeholder='Enter role description' rows={5} cols={4} onChange={(e)=>{setCompanyDetails(e.target.value)}} className="text-sm text-neutral-50 bg-transparent p-2 outline-none border-[1px] border-[#DDD6D6] rounded-md w-full" /> */}
                        {/* <div className="flex gap-3 items-center"> */}
                            {/* <span className="text-neutral-50 mt-4">Or upload any document containing details of your bsuiness or company</span> */}
                            
                            {/* <label htmlFor="images" className="drop-container" onDragOver={(e)=>{
                            e.preventDefault()
                        }} onDrop={(e)=>{
                            e.preventDefault()
                            setCompanyDetailsFile(e?.dataTransfer?.files[0])
                            console.log(e?.dataTransfer?.files[0])
                            console.log(typeof e?.dataTransfer?.files[0])
                        }}>
                        <span className="drop-title">Drop files here</span>
                        <span className='-mb-2'>
                            or
                        </span>
                        <input type="file" name="" id="images" className='self-center text-center text-sm text-neutral-50 p-1 outline-none rounded-md w-full' onChange={(e)=>{ e?.target?.files && setCompanyDetailsFile(e?.target?.files[0]) }} />

                        </label> */}
                        <Button title="Update company info" buttonStyle='mx-auto font-semibold mt-8' onClick={()=>{
                            // trainBotSteps()
                            updateInfo("company_details")
                        }}
                        Icon={()=> {return updatingCompanyDetails === true ? <img src="/assets/loading-circle.svg" alt="loading..." className="w-5 h-5 self-center ml-2" /> : <></>}}
                        />

                        {/* </div> */}
                        {/* <div className="flex gap-3 items-center"> */}
                            {/* <span className="text-neutral-50 mt-4">Or give the link to your business LinkedIn Page (optional)</span>
                            <input type="text" name="" id="" placeholder='https://www.linkedin.com/company/arthlex-limited/' onChange={(e)=>{setCompanyDetails(e.target.value)}} className='self-start text-center text-sm w-full text-white p-3 min-h-fit outline-none border-2 border-[#DDD6D6] rounded-md' /> */}
                        {/* </div> */}
                    </div>
                      <div className="flex flex-col h-full border-t border-t-neutral-800 md:border-t-0 md:border-l md:border-l-neutral-50 items-center gap-2 px-3 md:px-6 py-8">
                          <span className='text-semibold -mb-1 text-center'>Edit Role Description
                          <OutlineButton title='Check sample description' buttonStyle='md:ml-3 mb-3 text-xs !p-1 !px-1.5' onClick={()=>{setShowSampleRoleDescription(true)}} />
                          </span>
                          {
                              roleDescriptionLoading === true ? <img src="/assets/loading-circle.svg" alt="loading..." /> : <textarea placeholder='Enter role description' rows={5} cols={4} value={roleDesciption} onChange={(e)=>{setRoleDescription(e.target.value)}} className="text-sm text-neutral-50 bg-transparent p-2 outline-none border-[1px] border-[#DDD6D6] rounded-md w-full h-full" />
                          }
                          {/* <textarea placeholder='Enter role description' rows={5} onChange={(e)=>{setRoleDescription(e.target.value)}} className="text-sm text-neutral-50 bg-transparent p-2 outline-none border-[1px] border-neutral-50 rounded-md w-full" /> */}
                          {/* <div className="flex"> */}
                            {/* <span className="text-neutral-50 mt-4 px-2">Or upload Resume to get a bot role description</span> */}
                            {/* <label htmlFor="images" className="drop-container" onDragOver={(e)=>{
                            e.preventDefault()
                        }} onDrop={(e)=>{
                            e.preventDefault()
                            setRoleDescriptionFile(e?.dataTransfer?.files[0])
                            console.log(e?.dataTransfer?.files[0])
                            console.log(typeof e?.dataTransfer?.files[0])
                        }}>
                        <span className="drop-title">Drop files here</span>
                        <span className='-mb-2'>
                            or
                        </span>
                            <input type="file" name="" id="" className='self-center text-center text-sm text-white p-1 min-h-fit outline-none rounded-md' onChange={(e)=>{e?.target?.files && setRoleDescriptionFile(e?.target?.files[0])}} />

                        </label> */}
                            <Button title="Update Bot Role" buttonStyle='mx-auto font-semibold mt-8' onClick={()=>{
                                // trainBotSteps()
                                updateInfo("role_description")
                            }}
                            Icon={()=> {return updatingRoleDescription === true ? <img src="/assets/loading-circle.svg" alt="loading..." className="w-5 h-5 self-center ml-2" /> : <></>}}
                            />
                          {/* </div> */}
                      </div>
                      <div className="flex flex-col h-full border-t border-t-neutral-800 md:border-t-0 md:border-l md:border-l-neutral-50 items-center gap-2 px-3 md:px-8 py-8">
                          <span className="!text-semibold mb-0 text-center">Edit Steps
                          <OutlineButton title='Check sample Steps' buttonStyle='md:ml-3 mb-3 text-xs !p-1 !px-1.5' onClick={()=>{setShowSampleBusinessSteps(true)}} />
                          </span>
                          {/* {
                              botBusinessSteps.map((step, index) => {
                                  return <div className="flex flex-row gap-2 items-center">
                                      <span className="text-sm font-medium min-w-max">Step #{index + 1}.</span>
                                      <input type="text" placeholder='Enter step' className="text-sm text-black p-2 py-1 outline-none border-[1px] border-[#DDD6D6] rounded-md" value={step} onChange={(e) => {
                                          let temp = [...botBusinessSteps]
                                          temp[index] = e.target.value
                                          setBotBusinessSteps(temp)
                                      }} />
                                      <AddCircleRounded className='cursor-pointer w-5 text-green-400' onClick={() => {
                                          setBotBusinessSteps([...botBusinessSteps, ""])
                                      }} />
                                      <CancelRounded className='cursor-pointer w-5 text-red-400' onClick={() => {
                                          let temp = botBusinessSteps
                                          temp = temp.filter((item, i) => i !== index)
                                          setBotBusinessSteps(temp)
                                      }} />
                                  </div>
                              })
                          } */}
                          {
                              botBusinessStepsLoading === true ? <img src="/assets/loading-circle.svg" alt="loading..." /> : <textarea placeholder='Type the steps that your bot will follow while interacting' rows={5} cols={1} value={botBusinessSteps2} onChange={(e)=>{setBotBusinessSteps2(e.target.value)}} className="text-sm text-white bg-transparent p-2 mx-28 outline-none border-[1px] border-[#DDD6D6] rounded-md w-full max-w-full h-full" />
                          }
                            {/* <textarea placeholder='Type the steps that your bot will follow while interacting' rows={5} cols={1} onChange={(e)=>{setBotBusinessSteps2(e.target.value)}} className="text-sm text-white bg-transparent p-2 mx-28 outline-none border-[1px] border-[#DDD6D6] rounded-md w-full max-w-full h-full" /> */}
                            {/* <span className="text-semibold mb-2 mt-8 justify-self-end text-sm">or Upload Steps PDF</span> */}
                            {/* <label htmlFor="images" className="drop-container" onDragOver={(e)=>{
                            e.preventDefault()
                        }} onDrop={(e)=>{
                            e.preventDefault()
                            setBotBusinessStepsFile(e?.dataTransfer?.files[0])
                            console.log(e?.dataTransfer?.files[0])
                            console.log(typeof e?.dataTransfer?.files[0])
                        }}>
                        <span className="drop-title">Drop files here</span>
                        <span className='-mb-2'>
                            or
                        </span>
                            <input type="file" name="" id="" className='self-center text-center text-sm text-neutral-50 p-1 outline-none rounded-md' onChange={(e)=>{e?.target?.files && setBotBusinessStepsFile(e?.target?.files[0])}} />
                        </label> */}
                            <Button title="Update Steps" buttonStyle='mx-auto font-semibold mt-8' onClick={()=>{
                                // trainBotSteps()
                                updateInfo("steps")
                            }}
                            Icon={()=> {return updatingSteps === true ? <img src="/assets/loading-circle.svg" alt="loading..." className="w-5 h-5 self-center ml-2" /> : <></>}}
                            />
                          {/* <input type="file" name="" id="" className='self-center text-center text-sm text-bg-dark-blue p-3 outline-none border-2 border-bg-dark-blue rounded-md' /> */}
                      </div>
                  </div>
                  <div className="flex flex-col items-center md:grid md:grid-cols-3 mt-auto justify-between">
                      <div className="hidden md:block"></div>
                        {/* <Link href='/auth/login'> */}
                            {/* <Button title="Submit" buttonStyle='mx-auto font-semibold' onClick={console.log} /> */}
                        {/* </Link> */}
                        <div></div>
                        <OutlineButton title="Continue with normal rules!" buttonStyle='text-sm w-fit md:ml-auto' onClick={() => {
                          setBotBusinessSteps2("Do not use abusive language. Do not spam. Do not use the bot for illegal purposes. Do not use the bot for spreading fake news. Do not use the bot for spreading hate speech.")
                      }} />
                  </div>
              </Card>
          </div>

      <span className="p-2 py-1 text-xs flex md:hidden items-center text-center justify-center bg-teal-600 text-white font-medium mt-2">
        For Full Experience, use the Desktop Version.
      </span>

      <div className={`w-full relative md:mt-2 py-2 flex ${chatCategory === "personal" ? "flex-row" : "flex-col md:flex-row flex-start md:justify-between items-start"} justify-between z-50 backdrop-blur-md`}>
        <Dropdown mode={mode} title="Select a bot" className="ml-2 md:ml-5 min-w-max z-50" list={categories} selectedChatCategory={chatCategory} setSelectedChatCategory={setChatCategory} />
        {
          chatCategory === "personal" || chatCategory === "personaltraining" || chatCategory === "business" || chatCategory === "initiator" || chatCategory === "business_initiator" && <Tooltip title={descriprions[chatCategory]} placement="right">
          <InfoRounded className="w-5 h-5 fill-neutral-500 cursor-pointer hover:fill-neutral-700 focus:fill-neutral-400 mr-auto self-center mt-2 ml-1" />
        </Tooltip>
        }
        {
          (chatCategory === "initiator" || chatCategory === "business_initiator") && 
        <div className="flex p-1.5 border-b border-b-gray-500 mr-auto mt-2 md:mt-0 ml-3 z-40 self-end">
          <input type="text" className="bg-transparent z-50 outline-none text-sm text-neutral-400 w-fit" placeholder="Enter any VBot ID" value={toConnectWith} onChange={(e)=>{setToConnectWith(e.target.value)}} />
          <PrimaryButton buttonStyle="md:ml-5 text-xs" title={connecting ? "Connecting" : (connectedBot===toConnectWith && connectedBot!=null) ? "Connected" : "Connect"} onClick={()=>{return (connectedBot===toConnectWith && connectedBot!=null) ? console.log() : checkBotExists(toConnectWith)}} showIcon Icon={
            ()=>{return connectedBot !== null && (connectedBot===toConnectWith ? <CheckCircle className="w-4 h-4 fill-green-500" /> : <Autorenew className={`w-4 h-4 fill-white ${connecting && "animate-spin"}`} />)}
          } />
        </div>
        }
        {
        chatCategory==="personal" && <Dropdown mode={mode} title="Plugin" className="mr-2 md:mr-5" list={[
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
        }
        {
          (chatCategory === "personaltraining" || chatCategory === "business") && <div className="flex relative align-center md:self-center ml-2 md:ml-0 mt-1.5 mr-5">
            {/* knowledgebase pdf upload dropdown upload */}
            <span className="bg-neutral-400 p-2 px-3 select-none text-bg-900 text-sm md:text-base rounded-lg font-medium cursor-pointer hover:bg-neutral-200" onClick={()=>{ setShowFileUploadDialog(!showFileUploadDialog) }}>Upload some Knowledgebase?</span>
            <div className={`flex flex-col gap-3 bg-bg-dark-blue backdrop-blur-md absolute top-12 max-w-[90vw] rounded-xl mt-2 md:right-0 bg-[rgba(255, 255, 255, 0.4)] p-4 ${showFileUploadDialog ? "block" : "hidden"}`}>
              <input type="file" name="file" id="" placeholder="File" onChange={(e)=>{ setKnowledgebaseFile(e.target.files![0]) }} />
              <CancelOutlined className="w-6 h-6 fill-neutral-500 cursor-pointer hover:fill-neutral-700 focus:fill-neutral-400 absolute top-4 right-5" onClick={()=>{ setShowFileUploadDialog(false); setKnowledgebaseFile(""); setKnowledgebaseLoading(false) }} />
              {/* <Delete className="w-6 h-6 fill-neutral-500 cursor-pointer hover:fill-neutral-700 focus:fill-neutral-400 absolute top-7 right-5" onClick={()=>{ setKnowledgebaseFile("") }} /> */}
              <span className="text-xs text-neutral-500">Upload a PDF file containing the knowledgebase for your bot. The bot will use this knowledgebase to answer questions asked by others.</span>
              <Button title="Upload" buttonStyle="w-full" onClick={uploadKnowledgebase} Icon={()=>{ return knowledgebaseLoading === true ? <img src="/assets/loading-circle.svg" alt="loading..." className="w-5 h-5 self-center ml-2" /> : <ArrowOutwardOutlined className="w-5 h-5 self-center ml-1" /> }} />
            </div>
          </div>
        }
      </div>

        <ChatList
          botIcon={chatCategory =="initiator" || chatCategory == "business_initiator" ? connectedBotIcon : undefined}
          chats={ chatCategory != "personal" ? 
          chatCategory != "personaltraining" ? 
          chatCategory != "business" ? 
          chatCategory != "initiator" ? 
          chatCategory != "business_initiator" ?
          tempChats
          : thirdBusinessChats 
          : thirdChats 
          : trainingChats 
          : personalTrainingChats 
          : chats }
          mode={mode}
          setMode={setMode}
        />
        
        <div className={`${(chatCategory !== "personal" && chatCategory !== "personaltraining" && chatCategory !== "business" && chatCategory !== "initiator" && chatCategory !== "business_initiator") ? "hidden" : "flex"} flex-col gap-5 absolute w-full px-4 md:px-32 bottom-0 z-50 py-6 pt-16 duration-200 ${mode == "day" ? ((chatCategory === "personal" && chats.length != 0) || (chatCategory === "business" && trainingChats.length!=0) || (chatCategory === "personaltraining" && personalTrainingChats.length != 0) || (chatCategory === "initiator" && thirdChats.length != 0) || (chatCategory === "business_initiator" && thirdBusinessChats.length != 0)) && "bg-gradient-to-t from-white via-white to-transparent" : ((chatCategory === "personal" && chats.length != 0) || (chatCategory === "business" && trainingChats.length!=0) || (chatCategory === "personaltraining" && personalTrainingChats.length != 0) || (chatCategory === "initiator" && thirdChats.length != 0) || (chatCategory === "business_initiator" && thirdBusinessChats.length != 0)) && "bg-gradient-to-t from-bg-700 via-bg-700 to-transparent"}`}>
          
          <button className={`py-3 px-4 flex min-w-max items-center w-fit gap-2 text-sm self-center font-medium bg-transparent rounded border duration-200 ${mode === "day" ? "border-bg-50 text-bg-50" : "border-neutral-700 text-neutral-700"} `} onClick={()=>{ setChats([]); setPersonalTrainingChats([]); setTrainingChats([]); setThirdChats([]); setThirdBusinessChats([]) }}>
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
                  sendMessage()
                }
              }}
              onChange={(e) => {
                setUserMessage(e.target.value)
              }}
            />
            <div className="icons flex gap-5">
              {/* <MicNoneOutlined className="w-5 h-5 fill-bg-50 cursor-pointer hover:fill-neutral-700 focus:fill-neutral-400" /> */}
              <SendOutlined onClick={()=> {console.log(chats); (chats.length>0 && chats[chats?.length-1]?.message==="Loading...") ? console.log('l') : sendMessage()}} className={`w-5 h-5 ${chats[chats?.length-1]?.message==="Loading..." ? "fill-bg-300" : "fill-bg-50"} fill-bg-50 cursor-pointer ${chats[chats?.length-1]?.message==="Loading..." ? "" : "hover:fill-neutral-700 focus:fill-neutral-400"}`} />
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