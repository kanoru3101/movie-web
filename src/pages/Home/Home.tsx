import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import MovieCard from '../../components/ui/MovieCard/MovieCard'
import { useTranslation } from 'react-i18next'
import MovieSlider from '../../components/ui/MovieSlider/MovieSlider'
import { getTrending } from '../../services/api'
import { Movie } from '../../services/api/types'
import getTopRate from '../../services/api/getTopRate'

const Home = () => {
  const [trending, setTrending] = useState<Movie[]>([])
  const [topRate, setTopRate] = useState<Movie[]>([])
  const { t } = useTranslation();

  useEffect(() => {
    const getTrendingData = async () => {
      const trendings = await getTrending()
      // eslint-disable-next-line no-console
      console.log(trendings)
      setTrending(trendings)
    }
    const getTopRateData = async () => {
      const topRateData = await getTopRate()
      // eslint-disable-next-line no-console
      console.log(topRateData)
      setTopRate(topRateData)
    }

    getTrendingData()
    getTopRateData()
  }, [])

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.cardListWrapper}>
        {trending.length > 0 && (
          <MovieSlider title={t('homepage.trending')}>
            {
              trending?.slice(0,2).map((trendingItem) => <MovieCard {...trendingItem} />)
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
    </div>
  )
}

export default Home
