import React, { useState, useEffect, use } from 'react'
import { MovieI } from '../../interfaces/movies'
import useSWR from 'swr'
import Link from 'next/link'
import { motion } from 'framer-motion'

const baseUrl = 'https://image.tmdb.org/t/p/original'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

type Props = {
  request: string
}

export default function HeroBanner({ request }: Props) {
  const [movies, setMovies] = useState<MovieI[] | null>(null)
  const [index, setIndex] = useState<number>(0)
  const { data, error } = useSWR(request, fetcher)

  useEffect(() => {
    if (data) {
      setMovies(data.results)
    }
  }, [data])

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 20)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  if (!Array.isArray(movies) || !movies.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={style.base}
      ></motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={style.base}
    >
      <div className={style.layer}>
        <div className={style.layerInner}>
          <div className={style.label}>
            <img alt='star' src='star.png' className='h-full' />{' '}
            <p className={style.labelNumber}>{movies[index].vote_average}</p>
          </div>
          {movies[index].media_type === 'movie' ? (
            <Link className={style.title} href={`/detail/${movies[index].id}`}>
              {movies[index].title}{' '}
              <span className={style.year}>
                {movies[index].release_date.split('-')[0]}
              </span>
            </Link>
          ) : (
            <h1 className={style.title}>
              {movies[index].name}{' '}
              <span className={style.year}>
                {movies[index].first_air_date?.split('-')[0]}
              </span>
            </h1>
          )}
        </div>
      </div>
      <div className={style.imgWrapper}>
        <img
          src={`${baseUrl}/${movies[index].backdrop_path}`}
          alt={movies[index].title}
          className={style.img}
        />
      </div>
    </motion.div>
  )
}

const style = {
  layer:
    'w-full h-full absolute left-0 top-0 bg-gradient-to-t from-[#1A171E] to-[#1A171E]/0 rounded-[16px]',
  layerInner: 'absolute bottom-[40px] left-[40px]',
  label:
    'inline-flex gap-2 items-center rounded-full px-[12px] py-[8px] bg-black/70 mb-4',
  labelNumber: 'text-[14px] text-white',
  title: 'text-3xl font-semibold text-white block cursor-pointer',
  year: 'text-lg font-light text-white/50',
  imgWrapper: 'w-full h-full rounded-[20px] overflow-hidden',
  img: 'w-full h-full object-cover object-top rounded-[18px]',
  base: 'w-full h-72 bg-[#1A171E] rounded-[18px] relative mb-12',
}
