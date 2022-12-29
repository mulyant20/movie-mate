import React from 'react'

type Props = {
  children: React.ReactNode
  onclick?: () => any
  classname: string
}

export default function Button({ children, classname, onclick }: Props) {
  return (
    <button onClick={onclick} className={classname}>
      {children}
    </button>
  )
}
