import InputGroup from '@/components/InputGroup'
import PrimaryButton from '@/components/PrimaryButton'
import RightAuthContainer from '@/components/RightAuthContainer'
import React from 'react'

function ForgotPasswordForm() {
  return (
    <RightAuthContainer title="Forgot Password">
        
        <InputGroup label='Phone Number' placeholder='Your Phone Number' type="number" className='!mt-10' />

        <PrimaryButton title='Continue' buttonStyle='w-full mt-5 mb-5' />

    </RightAuthContainer>
  )
}

export default ForgotPasswordForm