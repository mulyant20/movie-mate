import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import SidebarMenu from './SidebarMenu';

export default function Sidebar() {
  
  const router = useRouter();
  
  const isActiveRoute = () => {
    let temp: string[]
    if(router.asPath.includes('/')) {
      temp = router.asPath.split('/')
      return `/${temp[1]}`
    }
  };

  return (
    <div className='fixed h-screen w-72 bg-[#1A171E] top-0 left-0'>
      <div>
        <p className='mx-6 text-sm text-white/30 mb-3 mt-8'>Menu</p>
        <div className='flex flex-col gap-3'>
          <SidebarMenu route={isActiveRoute()} href='/'>Browse</SidebarMenu>
          <SidebarMenu route={isActiveRoute()} href='/category'>Category</SidebarMenu>
          <SidebarMenu route={isActiveRoute()} href='/watchlist'>Watchlist</SidebarMenu>
        </div>
      </div>
    </div>
  )
}