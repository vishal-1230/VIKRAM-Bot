import InputGroup from '@/components/InputGroup'
import PrimaryButton from '@/components/PrimaryButton'
import RightAuthContainer from '@/layouts/auth/RightAuthContainer'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'

function ForgotPasswordForm() {

  const router = useRouter()

  const [phoneNumber, setPhoneNumber] = React.useState<string | number | undefined>(undefined)

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

    console.log(phone)

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
        phoneNumber != undefined && localStorage.setItem("phoneForForgotPassword", phoneNumber.toString())
        router.push("/auth/forgot-password/verify-otp", undefined)
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
    }
}

  return (
    <RightAuthContainer title="Forgot Password">
        
        <InputGroup label='Phone Number' placeholder='Your Phone Number' type="number" className='!mt-10' value={phoneNumber?.toString()} onChange={setPhoneNumber} />
        <PrimaryButton title='Continue' buttonStyle='w-full mt-5 mb-5' onClick={sendOtp} />

    </RightAuthContainer>
  )
}

export default ForgotPasswordForm