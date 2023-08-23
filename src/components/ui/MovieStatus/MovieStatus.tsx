import React, { HTMLAttributes, ReactElement } from 'react'
import { MOVIE_STATUSES } from '../../../constants'
import styles from './MovieStatus.module.css'

type Props = HTMLAttributes<HTMLDivElement> & {
  status: MOVIE_STATUSES
}
const MovieStatus: React.FC<Props> = ({ status }): ReactElement => {
  const statusToColor = {
    [MOVIE_STATUSES.RELEASED]: '#5AC358',
    [MOVIE_STATUSES.CANCELED]: '#FF5C5C',
    [MOVIE_STATUSES.IN_PRODUCTION]: '#FFA34D',
    [MOVIE_STATUSES.PLANNED]: '#FFD700',
    [MOVIE_STATUSES.POST_PRODUCTION]: '#9370DB',
    [MOVIE_STATUSES.RUMORED]: '#6CA6CD',
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.status}
        style={{ backgroundColor: statusToColor[status] }}
      ></div>
      <div className={styles.statusText}>{status}</div>
    </div>
  )
}
export default MovieStatus
