import LeftInfo from "@/layouts/auth/LeftInfo"
import LoginForm from "@/layouts/auth/LoginForm"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ['latin'] })

function Login() {
  return (
    <div className={`flex bg-bg-900 ${inter.className}`}>
        
        <LeftInfo />

        <LoginForm />
        
    </div>
  )
}

export default Login