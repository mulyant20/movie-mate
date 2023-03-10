import React, { useEffect, useState } from 'react'
import Link from 'next/link'

type Props = {
  href: string
  route: any
  children: React.ReactNode
}

export default function SidebarMenu({ href, route, children }: Props) {
  const [isActive, setIsActive] = useState(false)
  
  const checkRoute = () => {
    if(route === href) setIsActive(true)
  }
  
  useEffect(() => {
    checkRoute()
  }, [])

  return (
    <div className='w-full py-2 px-4 justify-between relative'>
      {isActive ? (
        <div className='h-[80%] w-[4px] absolute top-1/2 -translate-y-1/2 left-0 bg-red-500 rounded-r-lg'></div>
      ) : null}
      <div className={`w-full px-6 py-2 rounded-lg hover:bg-white/10 ${isActive ? 'bg-white/10' : null}`}>
        <Link href={href} className={isActive ? 'text-white' : 'text-white/50'}>{children}</Link>
      </div>
    </div>
  )
}
