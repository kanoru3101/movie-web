import React from 'react'
import Modal from '../Modal/Modal'
import styles from './VideoModal.module.css'

type MyModalProps = {
  youtubeKey: string | null;
}
const VideoModal: React.FC<MyModalProps> = ({ youtubeKey }) => {
  return (
    <Modal
      modalStyles={styles.modalWrapper}
      modalOverlayStyles={styles.modalOverlayWrapper}
      closeButton={true}
    >
      <iframe
        width='100%'
        height='95%'
        src={`https://www.youtube.com/embed/${youtubeKey}?vq=2160p`}
        frameBorder='0'
        allow='autoplay; encrypted-media;'
        allowFullScreen
      >

      </iframe>

    </Modal>
  )
}

export default VideoModal
