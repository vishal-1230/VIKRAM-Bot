import InputGroup from '@/components/InputGroup'
import PrimaryButton from '@/components/PrimaryButton'
import RightAuthContainer from '@/layouts/auth/RightAuthContainer'
import { Dialog } from '@mui/material'
import Link from 'next/link'
import React from 'react'

function LoginForm() {

    const [username, setusername] = React.useState(undefined)
    const [password, setPassword] = React.useState(undefined)

    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | undefined>(undefined)
    const [success, setSuccess] = React.useState<boolean>(false)

    async function login() {
        setLoading(true)
        const response = await fetch('http://server.vikrambots.in/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        const data = await response.text()
        console.log(data)
        if (data === "Login Successful") {
            setLoading(false)
            setError(undefined)
            setSuccess(true)
            // window.location.href = "/chat-bot"
        } else {
            setLoading(false)
            setError(data)
            alert(data)
            setSuccess(false)
        }
    }

  return (
    <RightAuthContainer title="Welcome Back">

        <Dialog open={loading}>
            <div className="flex flex-col gap-2 p-6 items-center justify-center">
                <span className="font-medium text-lg">Logging you in...</span>
                <img src="/assets/loading1.svg" alt="" className="w-20 h-20" />
            </div>
        </Dialog>

        <Dialog open={success} onClose={() => {setSuccess(false); window.location.href = "/chat-bot"}}>
            <div className="flex flex-col gap-2 p-6 items-center justify-center">
                <span className="font-medium text-lg">Logged in successfully!</span>
                <img src="/assets/success1.svg" alt="" className="w-20 h-20" />
                <PrimaryButton title="Head to your Chat Bot" onClick={() => window.location.href = "/chat-bot"} />
            </div>
        </Dialog>

        <InputGroup value={username} onChange={setusername} label='VIKRAM Username' placeholder='user_9696' type="text" className='!mt-10' />

        <InputGroup value={password} onChange={setPassword} label='Password' placeholder='Your Password' type="password"  passwordAccessory={
            <div className='flex justify-between mt-1'>

                <div className="flex gap-1 5 items-center">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="" className='text-sm font-medium text-neutral-900'>Remember me</label>
                </div>

                <Link href='/auth/forgot-password'>
                    <span className="text-sm font-medium text-bg-50">Forgot Password?</span>
                </Link>
            </div>
        } />

        <PrimaryButton title='Log In' buttonStyle='w-full mt-5 mb-5' onClick={login} />

        <span className="text-sm font-medium text-neutral-900">Don't have an account? <Link href="/auth/create-account" className='text-primary-500 text-sm'>Create an account</Link></span>

    </RightAuthContainer>
  )
}

export default LoginForm