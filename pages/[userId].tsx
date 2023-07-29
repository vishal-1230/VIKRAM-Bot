import LeftInfo from '@/layouts/auth/LeftInfo'
import TemporaryRegister from '@/layouts/auth/forms/TempRegister'
import { Inter } from 'next/font/google'
import React from 'react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin']})

function TemporaryRegisterPage() {

    const router = useRouter()

    const userId = router.query.userId as string

  return (
    <div className={`flex flex-col md:flex-row bg-bg-900 ${inter.className}`}>

        <LeftInfo />

        <TemporaryRegister userId={userId} />
        
    </div>
  )
}

export default TemporaryRegisterPage