import React, { ImgHTMLAttributes, ReactElement } from 'react'
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { GoVerified } from "react-icons/go"
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md"

import styles from './TrailerSlider.module.css'
import { Video } from '../../../services/api/types'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  title: string
  videos: Array<Video>
  openVideoModal: (youtubeUrl: string | null) => void
}


const NavigationArrow = (props: any): ReactElement => {
  const { className, style, onClick, typeArrow } = props;
  let arrowStyles = typeArrow ? styles.navigationArrow : "";
  if (typeArrow === 'prev') arrowStyles = `${arrowStyles} ${styles.left}`
  if (typeArrow === 'next') arrowStyles = `${arrowStyles} ${styles.right}`
  return (
    <div
      className={arrowStyles}
      onClick={onClick}
    >
      { typeArrow === 'prev' && <MdOutlineArrowBackIos /> }
      { typeArrow === 'next' && <MdOutlineArrowForwardIos />}
    </div>
  );
}

const TrailerSlider: React.FC<Props> = ({
  videos,
  openVideoModal,
  title
}): ReactElement => {

  const settings = {
    focusOnSelect: false,
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: false,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    adaptiveHeight: true,
    nextArrow: <NavigationArrow typeArrow="next" />,
    prevArrow:  <NavigationArrow typeArrow="prev" />,
  }
  return (
    <div className={styles.wrapper}>
      { title && <div className={styles.title}> {title} </div> }
      <Slider {...settings}>
        { videos?.map(video => {
          const { id, key, name, official, published_at, site, size, type } =
            video
          const trumbnail = `http://img.youtube.com/vi/${key}/hqdefault.jpg`
          // eslint-disable-next-line no-console
          console.log('###trumbnail', trumbnail)
          return (
            <div className={styles.trailerItemWrapper} key={id}>
              <div
                className={styles.trumbnailWrapper}
                onClick={() => openVideoModal(key)}
                style={{ backgroundImage: `url(${trumbnail})` }}
              />
              <div className={styles.cartInfoWrapper}>
                <span className={styles.cartInfoName}> {name} </span>
                <div className={styles.verifiedIcon}> { official && <GoVerified/>}</div>
              </div>
            </div>
          )
        })}
      </Slider>
      <div className={styles.background}></div>
    </div>
  )
}

export default TrailerSlider
