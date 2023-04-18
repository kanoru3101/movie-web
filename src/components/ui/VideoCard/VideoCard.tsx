import React, { ReactElement } from 'react'
import styles from './VideoCard.module.css'
import { GoVerified } from 'react-icons/go'
import { Video } from '../../../services/api/types'

type Props = {
  video: Video,
  openVideoModal: (youtubeUrl: (string | null)) => void
}


const VideoCard: React.FC<Props> = ({
  video,
  openVideoModal,
}): ReactElement => {
  const { id, key, name, official} = video

  const generateThumbnail = (youtubeKey: string) => `http://img.youtube.com/vi/${youtubeKey}/hqdefault.jpg`

  return (
    <div className={styles.trailerItemWrapper} key={id}>
      <div
        className={styles.trumbnailWrapper}
        onClick={() => openVideoModal(key)}
        style={{ backgroundImage: `url(${generateThumbnail(key)})` }}
      />
      <div className={styles.cartInfoWrapper}>
        <span className={styles.cartInfoName}> {name} </span>
        <div className={styles.verifiedIcon}>
          {official && <GoVerified />}
        </div>
      </div>
    </div>
  )
}

export default VideoCard
