import LeftInfo from "@/layouts/auth/LeftInfo"
import LoginForm from "@/layouts/auth/forms/LoginForm"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

function Login() {
  return (
    <div className={`flex flex-col md:flex-row bg-bg-900 ${inter.className}`}>
        
        <LeftInfo />

        <LoginForm />
        
    </div>
  )
}

export default Login