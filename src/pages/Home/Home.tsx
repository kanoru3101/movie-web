import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import MovieCard from '../../components/ui/MovieCard/MovieCard'
import { useTranslation } from 'react-i18next'
import MovieSlider from '../../components/ui/MovieSlider/MovieSlider'
import { getTrending } from '../../services/api'
import { Movie } from '../../services/api/types'

const Home = () => {
  const [trendings, setTrending] = useState<Movie[]>([])
  const { t } = useTranslation()


  useEffect(() => {
    const getTrendingData = async () => {
      const { results } = await getTrending()
      // eslint-disable-next-line no-console
      console.log(results)
      setTrending(results)
    }
    getTrendingData()
  }, [])

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.cardListWrapper}>
        {trendings.length > 0 && (
          <MovieSlider title={t('homepage.trending')}>
            {
              trendings?.slice(0,5)?.map((trending) => <MovieCard {...trending} />)
            }
          </MovieSlider>
        )}

      </div>
    </div>
  )
}

export default Home
