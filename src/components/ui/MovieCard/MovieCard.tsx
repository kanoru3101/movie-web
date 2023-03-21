import React, { ReactElement } from 'react'
import moment from 'moment'
import styles from './MovieCard.module.css'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { Button, CircleRating } from '../../ui'

type Props = {
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
  backdrop_path,
  runtime,
  release_date,
  overview,
  title,
  vote_average,
  genres
}): ReactElement => {
  const { t } = useTranslation()

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

  const getYear = (): string => moment(release_date).format('YYYY')
  const getVoteAverage = (): number => Number(vote_average.toFixed(1))

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const moveToPage = (): void => {}

  return (
    <div className={styles.main}>
      <div className={styles.container} onClick={() => moveToPage()}>
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
                <CircleRating rating={getVoteAverage()} />
              </div>
            </div>
          </div>
          <div className={styles.footerContent}>
            <div className={styles.informationDiv}>
              <span className={styles.text}>
              {getYear()}
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
