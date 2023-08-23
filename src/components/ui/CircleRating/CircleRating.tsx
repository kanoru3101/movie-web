import React, {
  ReactElement
} from 'react'
import styles from './CircleRating.module.scss'

type Props = {
  rating: number
  isHoverAnimate?: boolean
}
const CircleRating: React.FC<Props> = ({ rating, isHoverAnimate = false }): ReactElement => {
  const ratingNumber = Number(rating.toFixed(1))
  const percentages = ratingNumber * 10

  return (
    <div className={styles['circle-container']}>
      <div className={`${styles['circle']} ${styles[`percentage-${percentages}`]} ${isHoverAnimate ? styles['circle-hover']: ''}`}>
        <span>{ ratingNumber }</span>
        <div className={styles["percentage-bar"]}></div>
      </div>
    </div>
  )
}

export default CircleRating
