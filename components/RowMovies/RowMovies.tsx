import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import { MovieI } from '../../interfaces/movies'
import Card from './Card'
import { PietileCarousel, PietileCarouselHandle } from 'pietile-carousel'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import Link from 'next/link'

const baseUrl = 'https://image.tmdb.org/t/p/original'

type Props = {
  request: string
  title: string
}

export default function RowMovies({ request, title }: Props) {
  const [movies, setMovies] = useState<MovieI[] | null>(null)
  const carousel = useRef<PietileCarouselHandle>(null)

  const getMovies = async () => {
    const res = await fetch(request)
    const data = await res.json()
    setMovies(data.results)
  }

  useEffect(() => {
    getMovies()
  }, [])

  if (!Array.isArray(movies) || !movies.length) {
    return (
      <div>
        <p className={style.title}>{title}</p>
      </div>
    )
  }

  return (
    <>
      <div className='flex justify-between items-center mb-8'>
        <p className={style.title}>{title} <Link href='/category' className='text-sm font-light'>See all</Link></p>
        <div className='flex justify-between gap-4'>
          <button
            type='button'
            onClick={() => carousel.current?.slidePrev()}
            className='text-white/40 hover:text-white'
          >
            <BsChevronLeft />
          </button>
          <button
            type='button'
            onClick={() => carousel.current?.slideNext()}
            className='text-white/40 hover:text-white'
          >
            <BsChevronRight />
          </button>
        </div>
      </div>
      <div className='relative w-full mb-12'>
        <PietileCarousel
          className='w-[calc(100%+18px)] h-fit gap-[200px]'
          margin={0}
          count={3}
          ref={carousel}
        >
          {movies.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))}
        </PietileCarousel>
      </div>
    </>
  )
}

const style = {
  title: 'text-white text-lg font-semibold',
}
