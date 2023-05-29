import Link from 'next/link'
import React, { useEffect } from 'react'

function NavLink({children, closeNavbar, active=false, href="/"} : {children: React.ReactNode, closeNavbar: any, active?: boolean, href?: string}) {
  useEffect(()=>{
    closeNavbar()
  }, [active])
  return (
    <Link href={href} className={active ? "font-semibold mx-5 text-base text-selected-text border-b border-gray-400 pb-2 cursor-pointer" : 'text-white text-base font-normal mx-5 cursor-pointer'}>
        {children}
    </Link>
  )
}

export default NavLink