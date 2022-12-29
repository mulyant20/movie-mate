import { MovieI } from '@interfaces/movies'
import { watchListI } from '@interfaces/watchlist'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import watchlist from '../../pages/watchlist';

const baseUrl = 'https://image.tmdb.org/t/p/original'

type Props = {
  movie: watchListI
}

const CardWatchlist = ({ movie }: Props) => {
  const router = useRouter()

  return (
    <div className={style.card}>
      <div className={style.gradient}>
        <div className={style.top}>
          <div>
            <Link href={`/detail/${movie.id}`} className={style.name}>{movie.title}</Link>
            <p className={style.time}>{movie.release_date}</p>
          </div>
        </div>
      </div>
      <div className={style.imgWrapper}>
        <img
          src={`${baseUrl}/${movie.backdrop_path}`}
          alt={movie.title}
          className={style.img}
        />
      </div>
    </div>
  )
}

const style = {
  card: 'w-[300px] h-64 rounded-[18px] bg-[#232027] relative z-10',
  gradient:
    'w-full h-full absolute left-0 top-0 bg-gradient-to-t from-[#1A171E] to-[#1A171E]/0 rounded-[16px] p-6',
  top: 'mt-36 h-full w-full flex flex-col justify-between items-start',
  ratingWrapper:
    'inline-flex gap-2 items-center rounded-full px-[12px] py-[8px] bg-black/70 mb-4 text-white',
  name: 'text-lg text-white',
  time: 'text-sm text-white/30',
  imgWrapper: 'w-full h-full overflow-hidden',
  img: 'w-full h-full rounded-[20px] object-cover object-center rounded-[18px]',
}

export default CardWatchlist
