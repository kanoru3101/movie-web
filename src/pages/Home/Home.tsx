import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import MovieCard from '../../components/ui/MovieCard/MovieCard'
import { useTranslation } from 'react-i18next'
import { getNowPlaying, getTrending } from '../../services/api'
import { Movie } from '../../services/api/types'
import getTopRate from '../../services/api/getTopRate'
import { Slider } from '../../components/ui'
import MovieSlider from '../../components/ui/Slider/MovieSlider/MovieSlider'


const sliderSetting = {
  autoplay: true,
  slidesToScroll: 3,
  slidesToShow: 3,
}

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
          <Slider
            title={t<string>('homepage.trending')}
            sliderSetting={sliderSetting}
          >
            {
              trending?.map((trendingItem, index) => <MovieCard {...trendingItem} key={index} />)
            }
          </Slider>
        )}
      </div>
      <div className={styles.cardListWrapper}>
        {trending.length > 0 && (
          <Slider
            title={t<string>('homepage.topRate')}
            sliderSetting={sliderSetting}
          >
            {
              topRate?.map((movie, index) => <MovieCard {...movie} key={index} />)
            }
          </Slider>
        )}
      </div>
      <div className={styles.cardListWrapper}>
        {trending.length > 0 && (
          <Slider
            title={t<string>('homepage.playingNow')}
            sliderSetting={sliderSetting}
          >
            {
              nowPlaying?.map((movie, index) => <MovieCard {...movie} key={index} />)
            }
          </Slider>
        )}
      </div>
    </div>
  )
}

export default Home
