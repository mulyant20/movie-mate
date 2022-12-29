import { Layout } from '@components/Layout'
import { CardWatchlist } from '@components/RowMovies'
import { watchListI } from '@interfaces/watchlist'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

type Props = {}

export default function watchlist({}: Props) {
  const watchlists = useSelector((state: any) => state.watchlist)
  const [movies, setMovies] = useState<watchListI[] | []>([])
  const [isLocal, setIsLocal] = useState<boolean>(false)

  useEffect(() => {
    const local = localStorage.getItem('watchlist')
    if (local) {
      setIsLocal(true)
      setMovies(JSON.parse(local))
    }
  }, [])

  return (
    <Layout>
      <h1 className='text-xl text-white font-semibold mb-6'>Watchlist</h1>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(theme(width.64),1fr))] gap-8 mt-8 mb-8 relative h-fit w-full'>
        {isLocal
          ? movies.map((movie: watchListI) => <CardWatchlist movie={movie} />)
          : watchlists.map((watchlist: watchListI) => (
              <CardWatchlist movie={watchlist} />
            ))}
      </div>
    </Layout>
  )
}
