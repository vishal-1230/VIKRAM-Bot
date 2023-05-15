import PrimaryButton from '@/components/PrimaryButton'
import RightAuthContainer from '@/components/RightAuthContainer'
import React from 'react'

function VerifyOTPForm() {
  return (
    <RightAuthContainer title="Verify OTP">

        <span className="font-medium text-neutral-900 mt-2">Please enter the verification code sent to +91 82******01</span>

        <div className="flex gap-2 mt-10">
            <input type="number" maxLength={1} pattern='\d*' className='w-20 h-10 text-sm outline-none font-medium text-center border border-neutral-300 rounded-md' />
            <input type="number" maxLength={1} pattern='\d*' className='w-20 h-10 text-sm outline-none font-medium text-center border border-neutral-300 rounded-md' />
            <input type="number" maxLength={1} pattern='\d*' className='w-20 h-10 text-sm outline-none font-medium text-center border border-neutral-300 rounded-md' />
            <input type="number" maxLength={1} pattern='\d*' className='w-20 h-10 text-sm outline-none font-medium text-center border border-neutral-300 rounded-md' />
            <input type="number" maxLength={1} pattern='\d*' className='w-20 h-10 text-sm outline-none font-medium text-center border border-neutral-300 rounded-md' />
            <input type="number" maxLength={1} pattern='\d*' className='w-20 h-10 text-sm outline-none font-medium text-center border border-neutral-300 rounded-md' />
        </div>

        <span className="text-sm text-neutral-900 mt-5 self-center">Didn't recieve an OTP?</span>

        <span className="font-medium text-bg-900 mt-1 self-center underline underline-offset-2">Resend OTP</span>

        <PrimaryButton title='Verify' buttonStyle='w-full mt-5 mb-5' />

    </RightAuthContainer>
  )
}

export default VerifyOTPForm