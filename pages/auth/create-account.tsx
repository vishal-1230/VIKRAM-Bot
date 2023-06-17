import CreateAccountForm from '@/layouts/auth/forms/CreateAccountForm'
import LeftInfo from '@/layouts/auth/LeftInfo'
import { Inter } from 'next/font/google'
// import { getAuth, RecaptchaVerifier } from 'firebase/auth'

const inter = Inter({ subsets: ['latin'] })

// const auth = getAuth();

function CreateAccount() {
  return (
    <div className={`flex flex-col md:flex-row bg-bg-900 ${inter.className}`}>

        <LeftInfo />

        <CreateAccountForm />
        
    </div>
  )
}

export default CreateAccount