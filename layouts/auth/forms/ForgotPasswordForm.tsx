import InputGroup from '@/components/InputGroup'
import PrimaryButton from '@/components/PrimaryButton'
import RightAuthContainer from '@/layouts/auth/RightAuthContainer'
import Link from 'next/link'
import React from 'react'

function ForgotPasswordForm() {
  return (
    <RightAuthContainer title="Forgot Password">
        
        <InputGroup label='Phone Number' placeholder='Your Phone Number' type="number" className='!mt-10' />
        <Link href="/auth/forgot-password/verify-otp">
          <PrimaryButton title='Continue' buttonStyle='w-full mt-5 mb-5' />
        </Link>

    </RightAuthContainer>
  )
}

export default ForgotPasswordForm