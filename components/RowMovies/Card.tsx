import { MovieI } from '@interfaces/movies'
import React, { useMemo } from 'react'

const baseUrl = 'https://image.tmdb.org/t/p/original'

type Props = {
  movie: MovieI
}

const Card = ({ movie }: Props) => {
  const data = useMemo(() => {
    return getData(movie)
  }, [])

  return (
    <div className='w-[300px] h-64 rounded-[18px] bg-[#232027] relative'>
      <div className='w-full h-full absolute left-0 top-0 bg-gradient-to-t from-[#1A171E] to-[#1A171E]/0 rounded-[16px] p-6'>
        <div className='h-full w-full flex flex-col justify-between items-start'>
          <div className='inline-flex gap-2 items-center rounded-full px-[12px] py-[8px] bg-black/70 mb-4 text-white'>
            <img src='star.png' alt='star' />
            <p>{data.rating}</p>
          </div>
          <div>
            <p className='text-lg text-white'>{data.name}</p>
            <p className='text-sm text-white/30'>{data.time}</p>
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
  imgWrapper: 'w-full h-full rounded-[20px] overflow-hidden',
  img: 'w-full h-full object-cover object-center rounded-[18px]',
}

const getData = (movie: MovieI) => {
  if (movie.media_type === 'tv') {
    return {
      name: movie.name,
      rating: movie.vote_average,
      time: movie.first_air_date?.split('-')[0],
    }
  } else {
    return {
      name: movie.title,
      rating: movie.vote_average,
      time: movie.release_date.split('-')[0],
    }
  }
}

export default Card
