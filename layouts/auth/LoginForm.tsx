import InputGroup from '@/components/InputGroup'
import PrimaryButton from '@/components/PrimaryButton'
import RightAuthContainer from '@/layouts/auth/RightAuthContainer'
import Link from 'next/link'
import React from 'react'

function LoginForm() {
  return (
    <RightAuthContainer title="Welcome Back">

        <InputGroup label='Phone Number' placeholder='Your Phone Number' type="number" className='!mt-10' />

        <InputGroup label='Password' placeholder='Your Password' type="password"  passwordAccessory={
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

        <PrimaryButton title='Log In' buttonStyle='w-full mt-5 mb-5' />

        <span className="text-sm font-medium text-neutral-900">Don't have an account? <Link href="/auth/create-account" className='text-primary-500 text-sm'>Create an account</Link></span>

    </RightAuthContainer>
  )
}

export default LoginForm