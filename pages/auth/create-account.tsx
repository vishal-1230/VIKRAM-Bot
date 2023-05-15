import CreateAccountForm from '@/layouts/auth/CreateAccountForm'
import LeftInfo from '@/layouts/auth/LeftInfo'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

function CreateAccount() {
  return (
    <div className={`flex flex-row bg-bg-900 ${inter.className}`}>
        <LeftInfo />

        <CreateAccountForm />
    </div>
  )
}

export default CreateAccount