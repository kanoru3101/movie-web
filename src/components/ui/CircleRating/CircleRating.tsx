import React, {
  ReactElement
} from 'react'
import styles from './CircleRating.module.scss'

type Props = {
  rating: number
  isHoverAnimate?: boolean
}
const CircleRating: React.FC<Props> = ({ rating, isHoverAnimate = false }): ReactElement => {
  const percentages = rating * 10

  return (
    <div className={styles['circle-container']}>
      <div className={`${styles['circle']} ${styles[`percentage-${percentages}`]} ${isHoverAnimate ? styles['circle-hover']: ''}`}>
        <span>{ rating }</span>
        <div className={styles["percentage-bar"]}></div>
      </div>
    </div>
  )
}

export default CircleRating
