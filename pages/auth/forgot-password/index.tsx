import ForgotPasswordForm from "@/layouts/auth/ForgotPasswordForm"
import LeftInfo from "@/layouts/auth/LeftInfo"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

function ForgotPassword() {
  return (
    <div className={`flex bg-bg-900 ${inter.className}`}>

        <LeftInfo />

        <ForgotPasswordForm />

    </div>
  )
}

export default ForgotPassword