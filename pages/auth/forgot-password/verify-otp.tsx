import LeftInfo from '@/layouts/auth/LeftInfo'
import VerifyOTPForm from '@/layouts/auth/VerifyOTPForm'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

function VerifyOTP() {
  return (
    <div className={`flex bg-bg-900 ${inter.className}`}>

        <LeftInfo />

        <VerifyOTPForm />

    </div>
  )
}

export default VerifyOTP