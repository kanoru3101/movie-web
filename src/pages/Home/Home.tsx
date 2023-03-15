import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import MovieCard from '../../components/ui/MovieCard/MovieCard'
import { useTranslation } from 'react-i18next'
import MovieSlider from '../../components/ui/MovieSlider/MovieSlider'
import { getNowPlaying, getTrending } from '../../services/api'
import { Movie } from '../../services/api/types'
import getTopRate from '../../services/api/getTopRate'

const Home = () => {
  const [trending, setTrending] = useState<Movie[]>([])
  const [topRate, setTopRate] = useState<Movie[]>([])
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([])
  const { t } = useTranslation();

  useEffect(() => {
    const loadData = async () => {
      const trendings = await getTrending()
      setTrending(trendings)

      const topRateData = await getTopRate()
      setTopRate(topRateData)

      const nowPlayingData = await getNowPlaying()
      setNowPlaying(nowPlayingData)
    }

    loadData()
  }, [])

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.cardListWrapper}>
        {trending.length > 0 && (
          <MovieSlider title={t('homepage.trending')}>
            {
              trending?.map((trendingItem) => <MovieCard {...trendingItem} />)
            }
          </MovieSlider>
        )}
      </div>
      <div className={styles.cardListWrapper}>
        {trending.length > 0 && (
          <MovieSlider title={t('homepage.topRate')}>
            {
              topRate?.map((movie) => <MovieCard {...movie} />)
            }
          </MovieSlider>
        )}
      </div>
      <div className={styles.cardListWrapper}>
        {trending.length > 0 && (
          <MovieSlider title={t('homepage.playingNow')}>
            {
              nowPlaying?.map((movie) => <MovieCard {...movie} />)
            }
          </MovieSlider>
        )}
      </div>
    </div>
  )
}

export default Home
