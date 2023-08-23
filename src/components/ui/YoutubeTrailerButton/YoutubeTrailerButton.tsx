import { ReactElement } from 'react'
import { t } from 'i18next'
import { AiFillYoutube } from 'react-icons/ai'
import { Button } from '../index'
import styles from './YoutubeTrailerButton.module.css'
import { VideoModal } from '../../Modals'
import { useModal } from '../../../providers/Modal'

type Props = {
  youtubeLink?: string | null
}
const YoutubeTrailerButton: React.FC<Props> = ({
  youtubeLink,
}): ReactElement => {
  const { openModal } = useModal()
  const handleVideoModal = (youtubeUrl: string | null) =>
    openModal(<VideoModal youtubeKey={youtubeUrl} />)

  return (
    <>
      {youtubeLink && (
        <Button
          onClick={() => handleVideoModal(youtubeLink)}
          myStyles={styles.trailerBtnWrapper}
        >
          <div className={styles.trailerBtn}>
            <div className={styles.youtubeIcon}>
              <AiFillYoutube />
            </div>
            <div className={styles.buttonText}>
              {t('moviePage.watchTrailer')}
            </div>
          </div>
        </Button>
      )}
    </>
  )
}
export default YoutubeTrailerButton
