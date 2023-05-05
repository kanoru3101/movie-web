import React, { HTMLAttributes, ReactElement, useState } from 'react'
import ReactSlick, { Settings } from 'react-slick'
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md'

import styles from './Slider.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = HTMLAttributes<HTMLDivElement> & {
  title?: string,
  isShowBackground?: boolean,
  sliderSetting?: Settings,
  titleStyles?: string,
  children: React.ReactNode
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

const Slider: React.FC<Props> = ({
  title,
  isShowBackground = true,
  sliderSetting = {},
  titleStyles,
  children
}): ReactElement => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const settings = {
    focusOnSelect: false,
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: false,
    slidesToScroll: 1,
    slidesToShow: 1,
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
      return (
        <button className={index === currentSlide ? styles.activeButton : ""}>
          {index + 1}
        </button>
      )
    },
    ...sliderSetting
  }
  return (
    <div className={styles.wrapper}>
      {title && <div className={titleStyles ?? styles.title}> {title} </div>}
      <ReactSlick {...settings}>
        {children}
      </ReactSlick>
      {
        isShowBackground && (
          <>
            <div className={`${styles.background} ${styles.backgroundLeft}`}></div>
            <div className={`${styles.background} ${styles.backgroundRight}`}></div>
          </>
        )
      }
    </div>
  )
}

export default Slider;
