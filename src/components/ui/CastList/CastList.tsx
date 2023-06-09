import React, { ReactElement } from 'react'
import styles from './CastList.module.css'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Cast, Movie } from '../../../services/api/types'
import _ from 'lodash'

type Props = {
  cast: Array<Cast>
}

const CastList: React.FC<Props> = ({ cast }): ReactElement => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const groupedCast = _.groupBy(cast, castItem => castItem.known_for_department)
  const groupedKeys = Object.keys(groupedCast).sort()

  const navigateToMovie = (movieIMDB: string): void => {
    navigate(`/movie/${movieIMDB}`)
  }

  const getRealiseYear = (movie: Movie): string => {
    return movie.release_date.split('-')[0]
  }

  return (
    <>
      {groupedKeys.map(groupedKey => (
        <div key={groupedKey} className={styles.groupWrapper}>
          <h2> {t(`castList.${groupedKey.toLowerCase()}`)} </h2>
          <div className={styles.itemWrapper}>
            {_.sortBy(
              groupedCast[groupedKey],
              castItem => -castItem.movie.release_date
            ).map(castItem => (
              <div className={styles.itemData} key={castItem.id}>
                <p className={styles.movieTitle} onClick={() => navigateToMovie(castItem.movie.imdb_id)}>
                  { castItem.movie.title}
                </p>

                <p className={styles.realiseYear}> {getRealiseYear(castItem.movie)} </p>

                {
                  castItem.character && <p className={styles.characterName}> {`${t('castList.as')} ${castItem.character}`} </p>
                }

              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default CastList
