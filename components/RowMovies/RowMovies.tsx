import React, { useState, useEffect, useRef } from 'react'
import { MovieI } from '../../interfaces/movies'
import Card from './Card'
import Link from 'next/link'
import useSWR from 'swr'
import { Button } from '@components/Button'
import { motion } from 'framer-motion'

const baseUrl = 'https://image.tmdb.org/t/p/original'

type Props = {
  request: string
  title: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function RowMovies({ request, title }: Props) {
  const [movies, setMovies] = useState<MovieI[] | null>(null)
  const [width, setWidth] = useState<number>(0)
  const carousel = useRef<HTMLDivElement>(null)
  const { data, error } = useSWR(request, fetcher)

  useEffect(() => {
    if (data) {
      setMovies(data.results)
    }
  }, [data])

  useEffect(() => {
    if (carousel.current !== null) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [])

  if (!data) {
    return (
      <div className='mb-12'>
        <p className={style.title}>{title}</p>
      </div>
    )
  }

  return (
    <>
      <div className='flex justify-between items-center mt-8 mb-8 relative h-fit w-full'>
        <p className={style.title}>
          {title} <Link href='/category' className='text-sm font-light'>See all</Link>
        </p>
      </div>
      <motion.div ref={carousel} className='overflow-hidden'>
        <motion.div
          drag='x'
          className='flex gap-4'
        >
          {movies?.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))}
        </motion.div>
      </motion.div>
    </>
  )
}

const style = {
  title: 'text-white text-lg font-semibold',
}
