import { Layout } from '@components/Layout'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import { motion } from 'framer-motion'

const imageUrl = 'https://image.tmdb.org/t/p/original'
const baseUrl = 'https://api.themoviedb.org/3'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Detail() {
  const router = useRouter()
  const slug = router.query['slug']

  const { data, error } = useSWR(
    `${baseUrl}/movie/${slug}?api_key=${process.env.NEXT_PUBLIC_API_TOKEN}`,
    fetcher
  )

  if (!data) {
    return (
      <Layout>
        {null}
      </Layout>
    )
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className={style.bg}
      >
        <img src={`${imageUrl}/${data.backdrop_path}`} className={style.img} />
        <div className={style.layer}></div>
      </motion.div>

      <motion.div
        initial={{ y: '50%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className='flex justify-end gap-4 px-4 -mt-24 relative z-10'
      >
        <div className='w-[240px] h-64 absolute -top-12 left-4 rounded-lg overflow-hidden'>
          <img
            className='w-full h-full object-cover rounded-lg'
            src={`${imageUrl}/${data.poster_path}`}
          />
        </div>
        <div className='basis-[420px] h-fit text-white'>
          <h1 className='text-4xl mb-2'>{data.title}</h1>
          <p className='mb-4 text-white/70'>
            Original title {data.original_title}
          </p>
          <p className='text-sm text-white/70 mb-2'>Overview</p>
          <p className='leading-relaxed'>{data.overview}</p>
        </div>
        <div className='basis-[200px] h-fit pt-8'>
          <p className='text-white mb-4 font-semibold'>Genres</p>
          <div className='flex gap-2 flex-wrap gap-y-2'>
            {data.genres?.map((genre: any) => (
              <div
                key={genre.id}
                className='px-6 py-2 rounded-full border border-white/20 text-white'
              >
                {genre.name}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Layout>
  )
}

const style = {
  layer:
    'w-full h-full absolute left-0 top-0 bg-gradient-to-t from-[#131116] to-[#131116]/40 rounded-[16px]',
  layerInner: 'absolute bottom-[40px] left-[40px]',
  label:
    'inline-flex gap-2 items-center rounded-full px-[12px] py-[8px] bg-black/70 mb-4',
  labelNumber: 'text-[14px] text-white',
  title: 'text-3xl font-semibold text-white',
  year: 'text-lg font-light text-white/50',
  img: 'w-full h-full object-cover object-center rounded-[18px]',
  bg: 'w-full h-72 bg-[#1A171E] rounded-[18px] relative mb-12 overflow-hidden',
}
