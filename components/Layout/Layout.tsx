import React from 'react'
import { Sidebar } from '../Sidebar'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className='w-full min-h-screen'>
      <Sidebar />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: '10%' }}
          animate={{ opacity: 1, y: '0' }}
          exit={{ y: '-60%', opacity: 0.5 }}
          transition={{ duration: 0.1, ease: 'easeIn' }}
          className='ml-72 py-8 max-w-[calc(100vw-18rem)] h-fit mb-12'
        >
          <div className='w-[calc(100%-8rem)] xl:max-w-[1000px] h-fit mx-auto'>
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
