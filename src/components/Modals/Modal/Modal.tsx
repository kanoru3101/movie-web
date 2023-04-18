import React, { FC, useContext } from 'react'
import { ModalContext } from '../../../providers/Modal/ModalContext'
import styles from './Modal.module.css'
import { MdClose } from 'react-icons/md'

type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  closeButton?: boolean
  children: React.ReactNode
  modalStyles?: string
  modalOverlayStyles?: string
  closeButtonStyles?: string
}

const Modal: FC<ModalProps> = ({
  children,
  closeButton = false,
  modalStyles,
  modalOverlayStyles,
  closeButtonStyles,
}) => {
  const { isOpen, closeModal } = useContext(ModalContext)

  return (
    <>
      {isOpen && (
        <>
          <div
            className={`${styles.modalOverlay} ${modalOverlayStyles}`}
            onClick={closeModal}
          />
          <div className={`${styles.modal} ${modalStyles}`}>
            {closeButton && (
              <div className={`${styles.closeButton} ${closeButtonStyles}`}>
                <MdClose onClick={closeModal} />
              </div>
            )}
            {children}
          </div>
        </>
      )}
    </>
  )
}

export default Modal
