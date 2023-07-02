import { Orbitron } from 'next/font/google'
import React, { useEffect } from 'react'
import { Card, Dialog, DialogTitle, Icon } from '@mui/material'
import { AddCircleRounded, CancelRounded, RemoveCircleRounded, RemoveRedEyeOutlined } from '@mui/icons-material'
import Link from 'next/link'
import PrimaryButton from '@/components/PrimaryButton'
import InputGroup from '@/components/InputGroup'
import RightAuthContainer from '@/layouts/auth/RightAuthContainer'
import OutlineButton from '@/components/OutlineButton'
import Button from '@/components/SpecialButton'
import { Router, useRouter } from 'next/router'
// import { auth } from '../../../config/firebase'
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import OtpInput from 'react-otp-input';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import firebase from '../../../config/firebase'

const orbitron = Orbitron({ subsets: ['latin'] })

declare global {
    interface Window {
      recaptchaVerifier?: any;
    confirmationResult?: any;
    }
  }

function CreateAccountForm(props: any) {

    const router = useRouter()

    // FUNCTION USED BY FIREBASE TO SEND OTP
    // function onCaptchaVerify () {
    //     if (!(window.recaptchaVerifier)) {
    //         window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
    //             'size': 'invisible',
    //             'callback': () => {
    //             //   reCAPTCHA solved, allow signInWithPhoneNumber.
    //               onSignInSubmit();
    //             }
    //           }, auth);
    //     }
    // }

    // FIREBASE READY CODE FOR SENDING OTP
    // function onSignInSubmit () {
    //     onCaptchaVerify();

    //     const appVerifier = window.recaptchaVerifier;

    //     signInWithPhoneNumber(auth, "+91"+phoneNumber, appVerifier)
    // .then((confirmationResult) => {
    //   // SMS sent. Prompt user to type the code from the message, then sign the
    //   // user in with confirmationResult.confirm(code).
    //   window.confirmationResult = confirmationResult;
    //   setOtpSent(true)
    //   toast("OTP sent successfully!")
    //   // ...
    // }).catch((error) => {
    //     console.log(error)
    //     toast("Error sending OTP")
    //   // Error; SMS not sent
    //   // ...
    // });
    // }

    // FIREBASE READY CODE FOR VERIFY
    // function onOTPVerify () {
    //     window.confirmationResult.confirm(otp).then((result: { user: any }) => {
    //         // User signed in successfully.
    //         const firebaseUser = result.user;
    //         console.log(firebaseUser)
    //         toast("OTP verified successfully!")
    //         setOtpVerified(true)
    //         // window.recaptchaVerifier.clear()
    //         // ...
    //       }
    //     ).catch((error: any) => {
    //         console.log(error)
    //         toast("Invalid OTP")
    //       // User couldn't sign in (bad verification code?)
    //       // ...
    //     });
    // }

    const [othersSelected, setOthersSelected] = React.useState(false)
    const [name, setName] = React.useState(undefined)
    const [username, setUsername] = React.useState<string | undefined>(undefined)
    const [email, setEmail] = React.useState(undefined)
    const [phoneNumber, setPhoneNumber] = React.useState(undefined)
    const [password, setPassword] = React.useState(undefined)
    const [confirmPassword, setConfirmPassword] = React.useState(undefined)
    const [purpose, setPurpose] = React.useState<"personal" | "business" | "personalandbusiness">("personal")
    const [b_username, setB_username] = React.useState<string | undefined>(undefined)
    const [checkboxInputs, setCheckboxInputs] = React.useState<string[]>([])
    const [otpSent, setOtpSent] = React.useState(false)
    const [otp, setOtp] = React.useState<string>("")
    const [otpVerified, setOtpVerified] = React.useState(false)

    const [checkboxChecked, setCheckboxChecked] = React.useState(false)

    const [accountCreated, setAccountCreated] = React.useState(false)

    const [loading, setLoading] = React.useState(false)


    async function createAccount() {
        setLoading(true)
        // Fixing the data to become valid
        username != undefined && setUsername(username?.charAt(0)?.toUpperCase() + username.slice(1))
        console.log(username)

        console.log(name, email, phoneNumber, password, confirmPassword, checkboxInputs)
        const response = await fetch('https://server.vikrambots.in/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: purpose === "personal" ? JSON.stringify({
                name: name,
                username: username,
                email_id: email,
                phone: phoneNumber,
                password: password,
                confirmPassword: confirmPassword,
            }) : purpose === "personalandbusiness" ? JSON.stringify({
                name: name,
                username: username,
                email_id: email,
                phone: phoneNumber,
                password: password,
                confirmPassword: confirmPassword,
                business_username: b_username+"_b"
            }) : JSON.stringify({
                name: name,
                email_id: email,
                phone: phoneNumber,
                password: password,
                confirmPassword: confirmPassword,
                business_username: b_username+"_b"
            })
        })
            const data = await response.json()
            console.log(data)
            if (data.message.startsWith("Account created successfully")) {

                localStorage.setItem("token", data.token)

                username!=b_username ? b_username != "None" ?
                localStorage.setItem("user", JSON.stringify(
                    {
                        name: name,
                        username: username,
                        email_id: email,
                        phone: phoneNumber,
                        username_b: b_username
                    }
                )) : 
                localStorage.setItem("user", JSON.stringify(
                    {
                        name: name,
                        username: username,
                        email_id: email,
                        phone: phoneNumber,
                    }
                )) :
                localStorage.setItem("user", JSON.stringify(
                    {
                        name: name,
                        email_id: email,
                        phone: phoneNumber,
                        username_b: b_username
                    }
                ))
                setAccountCreated(true)
                setLoading(false)
                setAccountCreated(true)
            } else if (data.message.startsWith("HTTPSConnectionPool")) {
                toast.info("Our servers are overloaded. You can retry now or after some time.")
                setLoading(false)
            } else if (data.message.startsWith("Create class")) {
                toast.error("Username already exists")
                setLoading(false)
            } else if (data.message.endsWith("already registered.")) {
                toast.error("Username already exists")
                setLoading(false)
            } else {
                toast(data?.message)
                console.log(data)
                setLoading(false)
            }
    }

    async function trainBotRules () {

        setLoading(true)

        const data = new FormData()
        username && data.append("username", username)
        data.append("typeOfFile", botRulesFile ? "file" : "text")
        // data.append("typeOfFile", "text")
        data.append("rules", botRules2)
        data.append("rules_file", botRulesFile)
        // data.append()
        data.append("typeOfFile2", user_info_file ? "file" : "text")
        // data.append("typeOfFile2", user_info!="" ? "text" : "file")
        data.append("user_info", user_info)
        data.append("info_file", user_info_file)


        const response = await fetch("https://server.vikrambots.in/store-rules", {
            method: "POST",
            body: data,
            headers: {
                "x-access-token": localStorage.getItem("token")!
            }
        })

        const data2 = await response.json()
        console.log(data2)
        setLoading(false)

        if (data2.message.startsWith("Saved successfully")) {
            toast.success("Rules stored successfully!")
            setShowPersonalBotDialog(false)
            if (purpose == "business" || purpose === "personalandbusiness") {
                setAccountCreated(false)
                setShowBusinessBotDialog(true)
            } else {
                setAccountCreated(false)
                setShowPersonalBotDialog(true)
                router.replace("/chat-bot")
            }

        } else {
            toast.error("Error storing rules")
        }
    }

    // AFTER AUTHORIZING, THE BOT ROLE & STEPS HE'S TO FOLLOW
    const [showPersonalBotDialog, setShowPersonalBotDialog] = React.useState(false)
    const [showBusinessBotDialog, setShowBusinessBotDialog] = React.useState(false)

    const [typeOfRules, setTypeOfRules] = React.useState<"text" | "file">("text")
    const [typeOfUserInfo, setTypeOfUserInfo] = React.useState<"text" | "file">("text")
    const [user_info, setUser_info] = React.useState<string>("")
    const [user_info_file, setUser_info_file] = React.useState<File | string>("")
    
    const [botRules, setBotRules] = React.useState<string[]>([""])
    const [botRules2, setBotRules2] = React.useState<string>("")
    const [botRulesFile, setBotRulesFile] = React.useState<File | string>("")

    const [showSampleRules, setShowSampleRules] = React.useState(false)
    
    const [disableSubmit, setDisableSubmit] = React.useState(true)
    
    // AFTER PERSONAL MOVING TO BUSINESS DIALOG
    const [companyDetails, setCompanyDetails] = React.useState<string>("")
    const [botBusinessSteps, setBotBusinessSteps] = React.useState<string[]>([""])
    const [botBusinessSteps2, setBotBusinessSteps2] = React.useState<string>("")
    const [roleDesciption, setRoleDescription] = React.useState<string>("")

    const [companyDetailsFile, setCompanyDetailsFile] = React.useState<File | string>("")
    const [botBusinessStepsFile, setBotBusinessStepsFile] = React.useState<File | string>("")
    const [roleDesciptionFile, setRoleDescriptionFile] = React.useState<File | string>("")

    const [showSampleRoleDescription, setShowSampleRoleDescription] = React.useState(false)
    const [showSampleBusinessSteps, setShowSampleBusinessSteps] = React.useState(false)

    async function trainBusinessBot () {
            
            setLoading(true)
    
            const data = new FormData()
            b_username && data.append("username_b", b_username)
            data.append("typeOfFile", roleDesciptionFile ? "file" : "text")
            data.append("botrole", roleDesciption)
            data.append("botrole_file", roleDesciptionFile)
            data.append("typeOfFile2", botBusinessStepsFile ? "file" : "text")
            data.append("steps", botBusinessSteps2)
            data.append("steps_file", botBusinessStepsFile)
            data.append("typeOfFile3", companyDetailsFile ? "file" : "text")
            data.append("company_info", companyDetails)
            data.append("company_file", companyDetailsFile)
    
            try {
                const response = await fetch("https://server.vikrambots.in/store-role-steps-info", {
                    method: "POST",
                    body: data,
                    headers: {
                        "x-access-token": localStorage.getItem("token")!
                    }
                })
    
                const data2 = await response.json()
                console.log(data2)
                setLoading(false)
        
                if (data2.message.startsWith("Saved successfully")) {
                    toast.success("Rules stored successfully")
                    setShowBusinessBotDialog(false)
                    router.replace("/chat-bot")
                } else {
                    toast.error("Error storing rules")
                }
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
    }

    async function sendOtp () {
        const phone = phoneNumber;

        if (phone === undefined || phone === null || phone === "") {
            // toast("Please enter a valid phone number")
            toast.error('Please enter a valid phone number', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }

        const response = await fetch(`https://server.vikrambots.in/get-otp/${phone}`)
        const data = await response.json()
        console.log(data)

        if (data.return === true) {
            // toast("OTP sent successfully")
            toast.success('OTP sent successfully', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setOtpSent(true)
        } else {
            // toast("Error sending OTP")
            toast.error('Error sending OTP', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setOtpSent(false)
        }
    }

    function verifyOtp () {
        const phone = phoneNumber;;

        fetch(`https://server.vikrambots.in/verify-otp/${phone}/${otp}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.success === true) {
                toast.success("OTP verified successfully")
                setOtpVerified(true)
                setOtpSent(false)
            } else {
                toast.error("Invalid OTP")
                setOtpVerified(false)
            }
        })
    }

    function validate (field: string, value: any) {
        switch (field) {
            case "name":
                return true;
            case "username":
                if (value === undefined || value === null || value === "") {
                    return true;
                }
                // username must not contain special characters, and must start with capital letter
                else if (value?.match(/^[A-Z][a-zA-Z0-9]*$/)) {
                    return true;
                } else {
                    setDisableSubmit(true)
                    return "Must start with a capital letter and must not contain special characters."
                }
            case "email":
                if (value === undefined || value === null || value === "") {
                    return true;
                }
                else if (value?.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
                    return true;
                } else {
                    setDisableSubmit(true)
                    return "Invalid email address."
                }
            case "phone":
                if (value?.match(/^[0-9]{10}$/)) {
                    return true;
                } else {
                    setDisableSubmit(true)
                    return "Invalid phone number."
                }
            case "password":
                if (value === undefined || value === null || value === "") {
                    return true;
                }
                else if (value?.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)) {
                    return true;
                } else {
                    setDisableSubmit(true)
                    return "Password should contain atleast number, capital letter, small letter and symbol."
                }
            case "confirmPassword":
                if (value === password) {
                    return true;
                } else {
                    setDisableSubmit(true)
                    return "Passwords do not match."
                }
        }
    }


  return (
    <RightAuthContainer title='Create Account'>

        <ToastContainer position="top-right" autoClose={2500} />

        <Dialog open={loading}>
            <div className="flex flex-col gap-2 p-6 items-center justify-center">
                <span className="font-medium text-lg">Creating your account...</span>
                <img src="/assets/loading1.svg" alt="" className="w-20 h-20" />
            </div>
        </Dialog>

        <Dialog open={accountCreated} onClose={()=>{setAccountCreated(false)}} className='flex flex-col items-center justify-center gap-5'>
            <DialogTitle className='text-2xl font-semibold text-center'>Account created successfully!</DialogTitle>
            <div className="p-6 pt-2 flex flex-col w-full">
            <img src="/assets/success1.svg" alt="" className='h-36 my-6 self-center' />
            <PrimaryButton title={purpose === "personal" || purpose === "personalandbusiness" ? "Train your bot with some rules" : "Train your business bot with some rules"} buttonStyle='w-full' onClick={()=>{
                if (purpose === "personal" || purpose === "personalandbusiness") {
                    setAccountCreated(false)
                    setShowPersonalBotDialog(true)
                } else {
                    setAccountCreated(false)
                    setShowBusinessBotDialog(true)
                }
            }} />
            </div>
        </Dialog>

        <Dialog open={otpSent} onClose={()=>{setOtpSent(false)}} className='flex flex-col !p-4 items-center justify-center gap-5'>
            <DialogTitle className='text-2xl font-semibold text-center'>Enter the OTP sent to your phone</DialogTitle>
            <div className="p-6 pt-2 gap-2 flex flex-col w-full">
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={<span>-</span>}
                    shouldAutoFocus
                    renderInput={(props) => <input {...props} className='!w-12 !h-12 border-b-2 border-b-gray-400 mx-2 outline-none' />}
                    containerStyle="justify-center"
                    inputStyle="text-2xl font-semibold text-center border-b-2 border-[#DDD6D6] w-12 h-12"
                />
                {/* resend otp */}
                <span className="text-xs font-medium mt-4 mb-4">Didn't receive the OTP? <span className="text-blue-500 cursor-pointer" onClick={()=>{
                    sendOtp()
                }}>Resend OTP</span></span>
                <PrimaryButton title="Verify OTP" buttonStyle='w-full' onClick={()=>{
                    console.log(otp)
                    verifyOtp()
                }} />
            </div>
        </Dialog>

            <Dialog open={showSampleRules} onClose={()=>{setShowSampleRules(false)}} className='flex flex-col items-center justify-center gap-5'>
                <DialogTitle className='text-2xl font-semibold text-center border-b'>
                    Sample Rules
                    {/* cancel button */}
                    <CancelRounded className='cursor-pointer w-6 h-6 absolute top-5 right-6 hover:text-red-500 text-red-400' onClick={()=>{setShowSampleRules(false)}} />
                </DialogTitle>
                <div className="p-8 pt-2 flex flex-col w-full">
                    {/* <span className="text-lg font-semibold mb-2">Personal Bot Rules</span> */}
                    <span className="text-sm font-medium mt-4 mb-4">A vendor manager named John Doe working in XYZ company receives a lot of proposals on a daily basis all of which are difficult for him to go through. He can set the interaction rules as follows.</span>
                    <div className="flex flex-col gap-2">
                    <span className='text-xs font-base -my-0.5'>1. Introduce yourself as the AI assistant of John  Doe</span>
                    <span className='text-xs font-base -my-0.5'>2. Request the sales representative to introduce themselves and the company which they come from</span>
                    <span className='text-xs font-base -my-0.5'>3. If they are from ABC Company, politely decline the proposal stating that there is a freeze on doing business with ABC Company</span>
                    <span className='text-xs font-base -my-0.5'>4. If they are from any other company, ask them to explain the proposal.</span>
                    <span className='text-xs font-base -my-0.5'>5. The unit price is beyond 100$, politely decline the proposal</span>
                    <span className='text-xs font-base -my-0.5'>6. Ask them on the clients they serve.</span>
                    <span className='text-xs font-base -my-0.5'>7. If there are no fortune 500 clients then politely refuse</span>
                    <span className='text-xs font-base -my-0.5'>8. If you have not refused so far, then respond to them that I will get back to them.</span>
                    </div>
                </div>
            </Dialog>

            <Dialog open={showSampleBusinessSteps} onClose={()=>{setShowSampleBusinessSteps(false)}} className='flex flex-col items-center justify-center gap-5'>
                <DialogTitle className='text-2xl font-semibold text-center border-b'>
                    Sample Agent Bot Steps
                    {/* cancel button */}
                    <CancelRounded className='cursor-pointer w-6 h-6 absolute top-5 right-6 hover:text-red-500 text-red-400' onClick={()=>{setShowSampleBusinessSteps(false)}} />
                </DialogTitle>
                <div className="p-8 flex flex-col w-full">
                    {/* <span className="text-lg font-semibold mb-2">Personal Bot Rules</span> */}
                    {/* <span className="text-sm font-medium mt-4 mb-4">A vendor manager named John Doe working in XYZ company receives a lot of proposals on a daily basis all of which are difficult for him to go through. He can set the interaction rules as follows.</span> */}
                    <div className="flex flex-col gap-2">
                    <span className="text-xs font-base -my-0.5">1. Introduce yourself </span>
                    <span className="text-xs font-base -my-0.5">2. Ask questions to the user to guage his personality. Ask one question at a time and when user responds only then ask the next question.</span>
                    <span className="text-xs font-base -my-0.5">3. Ask questions to gauge his career interests. Ask one question at a time and when user responds only then ask the next question.</span>
                    <span className="text-xs font-base -my-0.5">4. Based on the inputs from 2 and 3 deduce a suitable career path.</span>
                    <span className="text-xs font-base -my-0.5">5. Browse the web to find the top 10 institutes for the career path</span>
                    <span className="text-xs font-base -my-0.5">6. Browse the web to find jobs and average salaries for the roles</span>
                    <span className="text-xs font-base -my-0.5">7. Respond with the career path the institutes and the average salaries.</span>
                    <span className="text-xs font-base -my-0.5">8. Keep your response crisp and to the point.</span>
                    </div>
                </div>
            </Dialog>

            <Dialog open={showSampleRoleDescription} onClose={()=>{setShowSampleRoleDescription(false)}} className='flex flex-col items-center justify-center gap-5'>
                <DialogTitle className='text-2xl font-semibold text-center border-b'>
                    Role Description Example
                    {/* cancel button */}
                    <CancelRounded className='cursor-pointer w-6 h-6 absolute top-5 right-6 hover:text-red-500 text-red-400' onClick={()=>{setShowSampleRoleDescription(false)}} />
                </DialogTitle>
                <div className="p-8 flex flex-col w-full">
                    {/* <span className="text-lg font-semibold mb-2">Personal Bot Rules</span> */}
                    {/* <span className="text-sm font-medium mt-4 mb-4">A vendor manager named John Doe working in XYZ company receives a lot of proposals on a daily basis all of which are difficult for him to go through. He can set the interaction rules as follows.</span> */}
                    <div className="flex flex-col gap-2">
                        <span className="text-sm">You are a career counselor with 10 years of experience guiding students in India, You are well-versed in helping students make informed decisions about their careers after 12th grade.</span>
                    </div>
                </div>
            </Dialog>

            {/* Personal bot user_info & rules */}
        <div className={`flex flex-col items-center fixed top-0 left-0 z-50 h-screen w-screen bg-black bg-opacity-60 justify-center gap-5 ${showPersonalBotDialog === true ? "block" : "hidden"}`}>
            <Card className='!bg-bg-800 max-w-[75vw] p-8 h-[87vh] rounded-lg !text-neutral-400 flex flex-col items-center]'>
            <DialogTitle className='text-2xl font-semibold text-center'>Set Interaction Rules</DialogTitle>
            <span className="text-lg text-center">Set the rules which your bot needs to follow when others use it.</span>
                <div className="grid lg:grid-cols-2 overflow-y-auto gap-3 mt-3">
                    <div className="flex flex-col h-full border-r border-r-gray-200 items-center gap-2 lg:px-6 py-5">
                        <span className="text-semibold">Tell the bot about yourself (optional)</span>
                        <span className="text-xs font-light mb-4">Your bot will speak about you to potential employers and customers. Give the best and authentic details about yourself.</span>
                        <textarea placeholder='Amit is a software developer with 5 years of exprerience. His areasof expertise are...' rows={4} cols={4} value={user_info} onChange={(e)=>{setUser_info(e.target.value)}} className="text-sm text-neutral-50 bg-transparent p-2 py-1 outline-none border-[1px] border-[#DDD6D6] rounded-md w-full h-full" />

                        <span className="text-semibold mb-2 mt-6 justify-self-end">or Simply upload your Resume PDF</span>
                        {/* <input type="file" name="" id="" className='self-center text-center text-sm text-neutral-50 p-1 pb-5 outline-none rounded-md' onChange={(e)=>{
                            e?.target?.files && setUser_info_file(e?.target?.files[0])
                        }} /> */}
                        <label htmlFor="images" className="drop-container" onDragOver={(e)=>{
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
                        {/* <input type="file" id="images" accept="image/*" required> */}
                        <input type="file" name="" id="images" className='self-center text-center text-sm text-neutral-50 p-1 outline-none rounded-md'
                        // value={typeof user_info_file === "object" ? user_info_file?.name : user_info_file}
                        onChange={(e)=>{
                            e?.target?.files && setUser_info_file(e?.target?.files[0])
                        }} />
                        </label>
                    </div>
                    <div className="flex flex-col h-full items-center  gap-2 px-6 py-5">
                        <span className='text-semibold'>Add rules manually</span>
                        <span className="text-xs font-light mb-4">Your bot will follow these rules when interacting with others. You can add as many rules as you want.</span>
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
                        <textarea placeholder='Type the rules that your bot will follow while interacting' rows={6} cols={4} value={botRules2} onChange={(e)=>{setBotRules2(e.target.value)}} className="text-sm text-white bg-transparent p-2 py-1 outline-none border-[1px] border-[#DDD6D6] rounded-md w-full h-full" />
                        <span className="text-semibold mb-2 mt-8 justify-self-end">or Upload Rules PDF</span>
                        {/* <input type="file" name="" id="" className='self-center text-center text-sm text-neutral-50 p-3 outline-none rounded-md' onChange={(e)=>{
                            e?.target?.files && setBotRulesFile(e?.target?.files[0])
                        }} /> */}
                        <label htmlFor="images" className="drop-container" onDragOver={(e)=>{ e.preventDefault() }} onDrop={(e)=>{ e.preventDefault(); setBotRulesFile(e?.dataTransfer?.files[0]) }}>
                        <span className="drop-title">Drop files here</span>
                        <span className='-mb-2'>
                            or
                        </span>
                        {/* <input type="file" id="images" accept="image/*" required> */}
                        <input type="file" name="" id="images" className='self-center text-center text-sm text-neutral-50 p-3 outline-none rounded-md' onChange={(e)=>{
                            e?.target?.files && setBotRulesFile(e?.target?.files[0])
                        }} />
                        </label>
                    </div>
                </div>
                <div className=" flex flex-col items-center gap-2 mt-3 lg:gap-0 lg:grid lg:grid-cols-3 lg:mt-auto justify-between">
                    <OutlineButton title="Show sample rules" buttonStyle='text-sm w-full lg:w-fit mr-auto' onClick={()=>{ setShowSampleRules(true) }} />
                    <Button title="Submit" buttonStyle='w-full font-semibold mt-2 mb-0 lg:w-fit mx-auto' onClick={()=>{ 
                        trainBotRules()
                    }} />
                    <OutlineButton title="Continue with normal rules!" buttonStyle='text-sm w-full lg:w-fit ml-auto' onClick={()=>{
                        setBotRules2("Verify the identity of the person initiating contact. Confirm their name and organization. Ask the person to briefly state the purpose of the interaction or the problem they want t. Try responding to the problem to the best of your ability. Politely decline the interaction appears negative, abusive or harmful. After every interaction, ask for feedback")
                    }} />
                </div>
            </Card>
        </div>

            {/* Business bot steps etc */}
          <div className={`flex flex-col items-center fixed top-0 left-0 z-50 h-screen w-screen bg-black bg-opacity-60 justify-center gap-5 ${showBusinessBotDialog === true ? "block" : "hidden"}`}>
              <Card className='!bg-bg-900 max-h-[90vh] p-8 px-5 max-w-[95vw] rounded-lg !text-neutral-50 flex flex-col'>
                  <DialogTitle className='text-2xl font-semibold text-center'>Set Agent Interaction Rules</DialogTitle>
                  <span className="text-lg text-center -mt-2">Set the rules which your bot needs to follow when others use it.</span>
                  <div className="grid overflow-y-auto grid-cols-1 lg:grid-cols-3 gap-3 mt-3 mb-4">
                    <div className="flex flex-col h-full items-center gap-2 pxy-8 px-6">
                        <span className="text-semibold mb-4">Add information about your business or company (optional)</span>
                        <textarea placeholder='Enter role description' rows={5} cols={4} value={companyDetails} onChange={(e)=>{setCompanyDetails(e.target.value)}} className="text-sm text-neutral-50 bg-transparent p-2 outline-none border-[1px] border-[#DDD6D6] rounded-md w-full" />
                        {/* <div className="flex gap-3 items-center"> */}
                            <span className="text-neutral-50 mt-4">Or upload any document containing details of your bsuiness or company</span>
                            
                            <label htmlFor="images" className="drop-container" onDragOver={(e)=>{
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

                        </label>
                        {/* </div> */}
                        {/* <div className="flex gap-3 items-center"> */}
                            {/* <span className="text-neutral-50 mt-4">Or give the link to your business LinkedIn Page (optional)</span>
                            <input type="text" name="" id="" placeholder='https://www.linkedin.com/company/arthlex-limited/' onChange={(e)=>{setCompanyDetails(e.target.value)}} className='self-start text-center text-sm w-full text-white p-3 min-h-fit outline-none border-2 border-[#DDD6D6] rounded-md' /> */}
                        {/* </div> */}
                    </div>
                      <div className="flex flex-col h-full border-l border-l-neutral-50 items-center gap-2 px-6 py-8">
                          <span className='text-semibold -mb-1'>Add Role Description
                          <OutlineButton title='Check sample description' buttonStyle='ml-3 mb-3 text-xs !p-1 !px-1.5' onClick={()=>{setShowSampleRoleDescription(true)}} />
                          </span>
                          <textarea placeholder='Enter role description' rows={5} value={roleDesciption} onChange={(e)=>{setRoleDescription(e.target.value)}} className="text-sm text-neutral-50 bg-transparent p-2 outline-none border-[1px] border-neutral-50 rounded-md w-full" />
                          {/* <div className="flex"> */}
                            <span className="text-neutral-50 mt-4 px-2">Or upload Resume to get a bot role description</span>
                            <label htmlFor="images" className="drop-container" onDragOver={(e)=>{
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

                        </label>
                          {/* </div> */}
                      </div>
                      <div className="flex flex-col h-full border-l border-l-neutral-50 items-center gap-2 px-8 py-8">
                          <span className="!text-semibold mb-0">Add Steps
                          <OutlineButton title='Check sample Steps' buttonStyle='ml-3 mb-3 text-xs !p-1 !px-1.5' onClick={()=>{setShowSampleBusinessSteps(true)}} />
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
                            <textarea placeholder='Type the steps that your bot will follow while interacting' rows={5} cols={1} value={botBusinessSteps2} onChange={(e)=>{setBotBusinessSteps2(e.target.value)}} className="text-sm text-white bg-transparent p-2 mx-28 outline-none border-[1px] border-[#DDD6D6] rounded-md w-full max-w-full h-full" />
                            <span className="text-semibold mb-2 mt-8 justify-self-end text-sm">or Upload Steps PDF</span>
                            <label htmlFor="images" className="drop-container" onDragOver={(e)=>{
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
                        </label>
                          {/* <input type="file" name="" id="" className='self-center text-center text-sm text-bg-dark-blue p-3 outline-none border-2 border-bg-dark-blue rounded-md' /> */}
                      </div>
                  </div>
                  <div className="grid grid-cols-3 mt-auto justify-between">
                      <div></div>
                        {/* <Link href='/auth/login'> */}
                            <Button title="Submit" buttonStyle='mx-auto font-semibold' onClick={trainBusinessBot} />
                        {/* </Link> */}
                        <OutlineButton title="Continue with normal rules!" buttonStyle='text-sm w-fit ml-auto' onClick={() => {
                          setBotBusinessSteps2(
                              "Do not use abusive language. Do not spam. Do not use the bot for illegal purposes. Do not use the bot for spreading fake news. Do not use the bot for spreading hate speech.")
                      }} />
                  </div>
              </Card>
          </div>

        <InputGroup value={name} required onChange={setName} hintAccessory={()=>{return validate("name", name)}} label='Full Name' placeholder='Your Full Name' type="text" className='!mt-10' />
        
        {/* <InputGroup value={username} onChange={setUsername} hintAccessory={()=>{validate("username", username)}} label='Username' placeholder='Your Username to be used for loggin in' type="username" /> */}

        <InputGroup value={email} required onChange={setEmail} label='Email Address' hintAccessory={()=>{return validate("email", email)}} placeholder='Your Email Address' type="text" />

        <InputGroup label='Phone Number' required value={phoneNumber} onChange={setPhoneNumber} hintAccessory={()=>{return otpVerified ? <span className='text-green-400 text-xs font-semibold'>Phone Nubmer verified!</span> : <span onClick={sendOtp} className='text-blue-500 cursor-pointer text-xs font-semibold'>Send Verification Code</span>}} placeholder='Your Phone Number' type="number" />

        <div id="sign-in-button"></div>

        <div className='flex flex-col mt-4 gap-3'>
            <span className="font-medium text-bg-50">Purpose Of Bot<span className="text-red-500">*</span> </span>
            {/* <div className="flex gap-5">
                <div className="flex">
                    <input type="radio" checked={purpose === "personal"} onChange={()=>{setPurpose("personal")}} name="purpose" id="purpose1" className='w-4 border-2 outline-2 border-black outline-black p-1 text-sm duration-300' />
                    <label htmlFor="purpose1" className='text-neutral-900 text-sm font-medium ml-2'>Personal use</label>
                </div>
                <div className="flex">
                    <input type="radio" checked={purpose === "business"} onChange={()=>{setPurpose("business")}} name="purpose" id="purpose1" className='w-4 border-2 outline-2 border-black outline-black p-1 text-sm duration-300' />
                    <label htmlFor="purpose1" className='text-neutral-900 text-sm font-medium ml-2'>Monetize my skill (Personal + Business)</label>
                </div>
            </div> */}
            <InputGroup type="options" radioOptions={{name: "purpose", title: "Personal", subtext: "Your bot will interact with others your behalf. it will talk about you and present your case to prospective recruiters and customers. Conversely, It will help you in shortlisting vendors, candidates and other parties who seek to meet or interact with you. Ideal for students, professionals as well as CXOS, VPs and other leaders.",  checked: (purpose === "personal"), onChange:()=>{setPurpose("personal"); console.log(`purpose changed to ${purpose}`)}}} />
            <InputGroup type="options" radioOptions={{name: "purpose", title: "Agent", subtext: "You will teach your bot certain skills and it will render its services on your behalf. You may consider monetizing this bot in the future ideal for freelancers, consultants and businesses",  checked: (purpose === "business"), onChange:()=>{setPurpose("business"); console.log(`purpose changed to ${purpose}`)}}} />
            <InputGroup type="options" radioOptions={{name: "purpose", title: "Personal & Agent", subtext: "You will get 2 separate ids. One for personal and another for agent.",  checked: (purpose === "personalandbusiness"), onChange:()=>{setPurpose("personalandbusiness"); console.log(`purpose changed to ${purpose}`)}}} />
            
            <InputGroup label='Personal VBot ID' required value={username} onChange={setUsername} placeholder="MyAccount101" type="username" className={`${purpose === "personal" || purpose === "personalandbusiness" ? "block" : "hidden"}`} hintAccessory={()=>{return<span className='text-xs font-medium text-red-500'>{validate("username", username)}</span>}} />
            <InputGroup label='Agent Bot ID' required value={b_username} onChange={setB_username} placeholder="Username_b that people will see as your business ID" type="username" className={`${purpose === "business" || purpose === "personalandbusiness" ? "block" : "hidden"}`} hintAccessory={()=>{return<span className={`text-xs ${validate("username", b_username)===true ? "text-gray-600" : "text-red-500"}`}>{b_username && validate("username", b_username)===true ? `Your username will look like ${b_username}_b` : validate("username", b_username)}</span>}} />
        </div>

        <div id="recaptcha"></div>

        <InputGroup
            label='Password'
            placeholder='Your Password'
            type="password"
            value={password}
            onChange={setPassword}
            required
            hintAccessory={()=>{return validate("password", password)}}
            // passwordAccessory={
            //     <label htmlFor="password" className='text-sm text-neutral-900'>
            //         Password should contain atleast number, capital letter, small letter and symbol.
            //     </label>}
            />

        <InputGroup
            label='Confirm Password'
            placeholder='Re-Enter Password'
            type="password"
            required
            value={confirmPassword}
            hintAccessory={()=>{return validate("confirmPassword", confirmPassword)}}
            onChange={setConfirmPassword}
        />

        <div className="flex gap-3 mt-5">
            <input type="checkbox" name="agree" id="agree" onChange={()=>{setCheckboxChecked(!checkboxChecked)}} className='w-4' />
            <span className="text-sm font-medium text-neutral-900">I agree to the <Link href="/" className='text-primary-500'>terms of service</Link> and <Link href="/" className='text-primary-500'>privacy policy</Link>.</span>
        </div>

        <PrimaryButton onClick={()=>name===undefined || email===undefined || phoneNumber===undefined || password===undefined || confirmPassword===undefined || checkboxChecked===false ? toast.error("All Fields are mandatory") : otpVerified ? createAccount() : toast.error("Verify your phone first")} title="Create account" buttonStyle="mt-5 mb-5 w-full" />

        <span className="text-sm font-medium text-neutral-900">Already have an account? <Link href="/auth/login" className='text-primary-500'>Login</Link></span>
        
    </RightAuthContainer>
  )
}

export default CreateAccountForm