import { MovieI } from '@interfaces/movies'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

const baseUrl = 'https://image.tmdb.org/t/p/original'

type Props = {
  movie: MovieI
}

const Card = ({ movie }: Props) => {
  const router = useRouter()
  const data = useMemo(() => {
    return getData(movie)
  }, [])

  const openDetail = (id: number) => {
    router.push(`/detail/${id}`)
  }

  return (
    <div className={style.card}>
      <div className={style.gradient}>
        <div className={style.top}>
          <div className={style.ratingWrapper}>
            <img src='star.png' alt='star' />
            <p>{data.rating}</p>
          </div>
          <div>
            <p className={style.name}>{data.name}</p>
            <p className={style.time}>{data.time}</p>
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
  card: 'flex-1 min-w-[300px] h-64 rounded-[18px] bg-[#232027] relative z-10',
  gradient:
    'w-full h-full absolute left-0 top-0 bg-gradient-to-t from-[#1A171E] to-[#1A171E]/0 rounded-[16px] p-6',
  top: 'h-full w-full flex flex-col justify-between items-start',
  ratingWrapper:
    'inline-flex gap-2 items-center rounded-full px-[12px] py-[8px] bg-black/70 mb-4 text-white',
  name: 'text-lg text-white',
  time: 'text-sm text-white/30',
  imgWrapper: 'w-full h-full overflow-hidden',
  img: 'w-full h-full rounded-[20px] object-cover object-center rounded-[18px]',
}

const getData = (movie: MovieI) => {
  if (movie.media_type === 'tv') {
    return {
      name: movie.name,
      rating: movie.vote_average,
      time: movie.first_air_date?.split('-')[0],
      id: movie.id,
    }
  } else {
    return {
      name: movie.title,
      rating: movie.vote_average,
      time: movie.release_date.split('-')[0],
      id: movie.id,
    }
  }
}

export default Card
