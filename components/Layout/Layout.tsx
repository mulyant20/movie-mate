import React from 'react'
import { Sidebar } from '../Sidebar'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className='w-full min-h-screen'>
        <Sidebar/>
        <div className='ml-72 pt-8 max-w-[calc(100vw-18rem)]'>
          <div className='w-[calc(100%-8rem)] xl:max-w-[1000px] h-20 mx-auto'>
            {children}
          </div>
        </div>
    </div>
  )
}