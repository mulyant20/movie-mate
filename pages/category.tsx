import { Layout } from '@components/Layout'
import React from 'react'

type Props = {}

export default function category({}: Props) {
  return (
    <Layout>
      <h1 className='text-xl text-white font-semibold mb-6'>Category</h1>
    </Layout>
  )
}