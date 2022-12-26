
import { HeroBanner } from '@components/HeroBanner'
import { Layout } from '@components/Layout'
import { RowMovies } from '@components/RowMovies'
import React, { useEffect } from 'react'

const baseUrl = 'https://api.themoviedb.org/3'

const requests = {
  featured: `${baseUrl}/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_TOKEN}&language=en-US`,
  trends: `${baseUrl}/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_TOKEN}&page=2`,
  topRated: `${baseUrl}/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_TOKEN}`
}

export default function Home() {
  
  return (
    <Layout>
      <HeroBanner request={requests.featured}/>
      <RowMovies title='Trending' request={requests.trends} />
      <RowMovies title='Top Rated' request={requests.topRated}/>
    </Layout>
  )
}
