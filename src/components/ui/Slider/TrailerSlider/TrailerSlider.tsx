import React, { ImgHTMLAttributes, ReactElement, useState } from 'react'
import Slider from 'react-slick'
import { GoVerified } from 'react-icons/go'
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md'

import styles from './TrailerSlider.module.css'
import { Video } from '../../../../services/api/types'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  title: string
  videos: Array<Video>
  openVideoModal: (youtubeUrl: string | null) => void
}

const NavigationArrow = (props: any): ReactElement => {
  const { onClick, typeArrow } = props
  let arrowStyles = typeArrow ? styles.navigationArrow : ''
  if (typeArrow === 'prev') arrowStyles = `${arrowStyles} ${styles.left}`
  if (typeArrow === 'next') arrowStyles = `${arrowStyles} ${styles.right}`
  return (
    <div className={arrowStyles} onClick={onClick}>
      {typeArrow === 'prev' && <MdOutlineArrowBackIos />}
      {typeArrow === 'next' && <MdOutlineArrowForwardIos />}
    </div>
  )
}
const TrailerSlider: React.FC<Props> = ({
  videos,
  openVideoModal,
  title,
}): ReactElement => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const settings = {
    focusOnSelect: false,
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true,
    variableWidth: true,
    adaptiveHeight: true,
    nextArrow: <NavigationArrow typeArrow="next" />,
    prevArrow: <NavigationArrow typeArrow="prev" />,
    dotsClass: styles.dots,
    beforeChange: (prev: number, next: number) => {
      setCurrentSlide(next);
    },
    customPaging: (index: number) => {
      // eslint-disable-next-line no-console
      console.log(`index - currentSlide, ${index} : ${currentSlide}`)
      return (
        <button className={index === currentSlide ? styles.activeButton : ""}>
          {index + 1}
        </button>
      )
    }
  }
  return (
    <div className={styles.wrapper}>
      {title && <div className={styles.title}> {title} </div>}
      <Slider {...settings}>
        {videos?.map(video => {
          const { id, key, name, official,  size } = video

          const trumbnail = `http://img.youtube.com/vi/${key}/hqdefault.jpg`
          return (
            <div className={styles.trailerItemWrapper} key={id}>
              <div
                className={styles.trumbnailWrapper}
                onClick={() => openVideoModal(key)}
                style={{ backgroundImage: `url(${trumbnail})` }}
              />
              <div className={styles.cartInfoWrapper}>
                <span className={styles.cartInfoName}> {name} </span>
                <div className={styles.verifiedIcon}>
                  {official && <GoVerified />}
                </div>
              </div>
            </div>
          )
        })}
      </Slider>
      <div className={`${styles.background} ${styles.backgroundLeft}`}></div>
      <div className={`${styles.background} ${styles.backgroundRight}`}></div>
    </div>
  )
}

export default TrailerSlider
