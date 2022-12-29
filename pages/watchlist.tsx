import { Layout } from '@components/Layout'
import { CardWatchlist } from '@components/RowMovies'
import { watchListI } from '@interfaces/watchlist'
import { useState, useEffect } from 'react'

type Props = {}

export default function Watchlist({}: Props) {
  const [movies, setMovies] = useState<watchListI[] | []>([])

  useEffect(() => {
    const local = localStorage.getItem('watchlist')
    if (local) {
      setMovies(JSON.parse(local))
    }
  }, [])

  return (
    <Layout>
      <h1 className='text-xl text-white font-semibold mb-6'>Watchlist</h1>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(theme(width.64),1fr))] gap-8 mt-8 mb-8 relative h-fit w-full'>
        {movies.map((movie: watchListI, index: number) => <CardWatchlist key={index} movie={movie} />)}
      </div>
    </Layout>
  )
}
