import React, { ReactElement } from 'react'
import styles from './CastCard.module.css'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Cast } from '../../../services/api/types'
import { RxPerson } from 'react-icons/rx'

type Props = Cast

const CastCard: React.FC<Props> = ({ character, person }): ReactElement => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const navigateToPerson = (personId: string): void => {
    navigate(`/movie/${personId}`)
  }

  return (
    <div
      className={styles.main}
      onClick={() => navigateToPerson(person.imdb_id)}
    >
      <div>
        {person?.profile_path ? (
          <img
            className={styles.personImg}
            src={person?.profile_path}
            alt={person.name}
          />
        ) : (
          <div className={styles.noPerson}>
            <RxPerson />
          </div>
        )}
      </div>
      <div className={styles.info}>
        <p className={styles.infoRow}>
          <span className={styles.boldText}>
            {`${t('castCard.character')}:`}{' '}
          </span>
          <span> {character} </span>
        </p>
        <p className={styles.infoRow}>
          <span className={styles.boldText}>{`${t('castCard.actor')}:`} </span>
          <span> {person.name} </span>
        </p>
      </div>
    </div>
  )
}

export default CastCard
