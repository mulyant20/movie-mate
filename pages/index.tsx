import { HeroBanner } from '@components/HeroBanner'
import { Layout } from '@components/Layout'
import { RowMovies } from '@components/RowMovies'
import React, { useEffect } from 'react'

const baseUrl = 'https://api.themoviedb.org/3'

const requests = {
  featured: `${baseUrl}/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_TOKEN}&language=en-US`,
  trends: `${baseUrl}/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_TOKEN}&page=2`,
  topRated: `${baseUrl}/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_TOKEN}`,
  action: `${baseUrl}/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_TOKEN}&with_genres=28`,
  comedy: `${baseUrl}/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_TOKEN}&with_genres=35`,
  romance: `${baseUrl}/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_TOKEN}&with_genres=10749`,
  documentaries: `${baseUrl}/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_TOKEN}&with_genres=99`,
}

export default function Home() {
  return (
    <Layout>
      <h1 className='text-xl text-white font-semibold mb-6'>Featured</h1>
      <HeroBanner request={requests.featured} />
      <RowMovies title='Trending' request={requests.trends} />
      <RowMovies title='Top Rated' request={requests.topRated} />
      {/* <RowMovies title='Action' request={requests.action} />
      <RowMovies title='Comedy' request={requests.comedy} /> */}
    </Layout>
  )
}
