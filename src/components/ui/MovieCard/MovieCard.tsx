import React, { ReactElement } from 'react'
import styles from './MovieCard.module.css'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { Button, CircleRating } from '../../ui'
import { useNavigate } from 'react-router-dom'
import { getRealiseYear } from '../../../utils/movieUtils'

type Props = {
  imdb_id: string
  backdrop_path: string
  release_date: string
  runtime: number
  overview: string
  title: string
  vote_average: number,
  genres: Array<{
    id: number
    name: string
  }>
}

const MovieCard: React.FC<Props> = ({
  imdb_id,
  backdrop_path,
  runtime,
  release_date,
  overview,
  title,
  vote_average,
  genres
}): ReactElement => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const getGenres = (): string => {
    let names = genres?.map((item) => item.name) || null
    if (!names) {
      return ''
    }
    if (names.length > 1) {
      names = names.slice(0, 2)
    }

    return _.join(names, ' | ')
  }

  const moveToPage = (imdbId: string): void => {
    navigate(`/movie/${imdbId}`)
  }

  return (
    <div className={styles.main}>
      <div className={styles.container} onClick={() => moveToPage(imdb_id)}>
        <div
          className={styles.background}
          style={{ backgroundImage: `linear-gradient(to right, transparent, #1C1C1CFF 80%), url(${backdrop_path})` }}
        />
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.title}>
              {title}
            </div>
            <div className={styles.description}>
              {overview}
            </div>
            <div className={styles.addInfo}>
              <Button myStyles={styles.watchTrailer}> {t('movieCard.watchTrailer')} </Button>
              <div className={styles.circleRatingWrapper}>
                <CircleRating rating={vote_average} />
              </div>
            </div>
          </div>
          <div className={styles.footerContent}>
            <div className={styles.informationDiv}>
              <span className={styles.text}>
              {getRealiseYear(release_date)}
            </span>
              <span className={styles.text}>{runtime ? `${runtime} ${t('movieCard.min')}` : ''}</span>
            </div>
            <div className={styles.genresWrapper}>
              <span className={styles.genres}> {getGenres()} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
