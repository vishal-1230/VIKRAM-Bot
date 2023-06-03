import { Orbitron } from 'next/font/google'
import React from 'react'
import { Icon } from '@mui/material'
import { RemoveRedEyeOutlined } from '@mui/icons-material'
import { VisibilityOffOutlined } from '@mui/icons-material'
import Link from 'next/link'
import PrimaryButton from '@/components/PrimaryButton'
import InputGroup from '@/components/InputGroup'
import RightAuthContainer from '@/layouts/auth/RightAuthContainer'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'

const orbitron = Orbitron({ subsets: ['latin'] })


function CreateAccountForm(props: any) {

    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        }
      }, auth);

    const onSignInSubmit = () => {
        const phoneNumber = '+918373958829';
        const appVerifier = window.recaptchaVerifier;

        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                const code = '123456';
                // ...
            }
            ).catch((error) => {
                console.log("OTP not sent due to ", error)
                // Error; SMS not sent
                // ...
            }
        );
    }

    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
    const [othersSelected, setOthersSelected] = React.useState(false)
    const [validPassword, setValidPassword] = React.useState(undefined)

  return (
    <RightAuthContainer title='Create Account'>

        <InputGroup label='Full name' placeholder='Your Full Name' type="text" className='!mt-10' />

        <InputGroup label='Email address' placeholder='Your Email Address' type="email" />

        <InputGroup label='Phone number' placeholder='Your Phone Number' type="number" />

        <div className='flex flex-col mt-4 gap-3'>
            <span className="font-medium text-bg-50">Purpose of bot</span>
            <div className="flex gap-5">
                <div className="flex">
                    <input type="radio" name="purpose" id="purpose1" className='w-4 border-2 outline-2 border-black outline-black p-1 text-sm duration-300' />
                    <label htmlFor="purpose1" className='text-neutral-900 text-sm font-medium ml-2'>Personal use</label>
                </div>
                <div className="flex">
                    <input type="radio" name="purpose" id="purpose1" className='w-4 border-2 outline-2 border-black outline-black p-1 text-sm duration-300' />
                    <label htmlFor="purpose1" className='text-neutral-900 text-sm font-medium ml-2'>Monetize my skill</label>
                </div>
            </div>
        </div>

        <div className='flex flex-col mt-4 gap-1'>
            <span className="font-medium text-bg-50">Select relevant use cases for your bot (check all that apply)</span>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-3">
                
                <div className="flex items-center gap">
                    <input type="checkbox" name="purpose" id="purpose1" className='w-4 border-2 outline-2 border-black outline-black p-1 text-sm duration-300' />
                    <label htmlFor="purpose1" className='text-neutral-900 text-sm font-medium ml-2'>Shopping</label>
                </div>

                <div className="flex items-center">
                    <input type="checkbox" name="purpose" id="purpose1" className='w-4 border-2 outline-2 border-black outline-black p-1 text-sm duration-300' />
                    <label htmlFor="purpose1" className='text-neutral-900 text-sm font-medium ml-2'>Ticket Booking</label>
                </div>

                <div className="flex items-center">
                    <input type="checkbox" name="purpose" id="purpose1" className='w-4 border-2 outline-2 border-black outline-black p-1 text-sm duration-300' />
                    <label htmlFor="purpose1" className='text-neutral-900 text-sm font-medium ml-2'>Food delivery</label>
                </div>

                <div className="flex items-center">
                    <input type="checkbox" name="purpose" id="purpose1" className='w-4 border-2 outline-2 border-black outline-black p-1 text-sm duration-300' />
                    <label htmlFor="purpose1" className='text-neutral-900 text-sm font-medium ml-2'>Job search & career advice</label>
                </div>

                <div className="flex items-center">
                    <input type="checkbox" name="purpose" id="purpose1" className='w-4 border-2 outline-2 border-black outline-black p-1 text-sm duration-300' onClick={()=>{
                        setOthersSelected(!othersSelected)
                    }} />
                    <label htmlFor="purpose1" className='text-neutral-900 text-sm font-medium ml-2'>Other</label>
                </div>
            </div>
            {
                othersSelected &&
                    <input type="text" placeholder='Please specify' className="text-sm text-black p-2 outline-none border-[1px] border-[#DDD6D6] rounded-md" />
            }
        </div>

            <div id="recaptcha-container"></div>

        <InputGroup label='Password' placeholder='Your Password' type="password" passwordAccessory={<label htmlFor="password" className='text-sm text-neutral-900'>Password should contain atleast number, capital letter, small letter and symbol.</label>} />

        <InputGroup label='Confirm Password' placeholder='Re-Enter Password' type="password" />

        <div className="flex gap-3 mt-5">
            <input type="checkbox" name="agree" id="agree" className='w-4' />
            <span className="text-sm font-medium text-neutral-900">I agree to the <Link href="/" className='text-primary-500'>terms of service</Link> and <Link href="/" className='text-primary-500'>privacy policy</Link>.</span>
        </div>

        <PrimaryButton title="Create account" buttonStyle="mt-5 mb-5 w-full" />

        <span className="text-sm font-medium text-neutral-900">Already have an account? <Link href="/auth/login" className='text-primary-500'>Login</Link></span>
        
    </RightAuthContainer>
  )
}

export default CreateAccountForm