import LeftInfo from '@/layouts/auth/LeftInfo'
import TemporaryRegister from '@/layouts/auth/forms/TempRegister'
import { Inter } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin']})

function TemporaryRegisterPage() {

    const router = useRouter()

    if (router.query.userId === undefined || router.query.userId === null) {
        router.replace("/auth/login")
    }
    let userId = router.query.userId as string
    
    useEffect(()=>{
      if (userId === undefined || userId === null) {
        userId = router.query.userId as string
      } else {
        if (localStorage.getItem("temptoken") || localStorage.getItem("token")) {
          console.log("token found")
          router.replace(`/try-vikram-bots/${userId}`)
        }
      }
    }, [userId])

  return (
    <div className={`flex flex-col md:flex-row bg-bg-900 ${inter.className}`}>

        <LeftInfo />

        <TemporaryRegister userId={userId} />
        
    </div>
  )
}

export default TemporaryRegisterPage