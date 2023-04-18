import React, { ImgHTMLAttributes, ReactElement, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from './MovieSlider.module.css'
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from 'react-icons/md'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  title?: string
  slidesToShow?: number
  focusOnSelect?: boolean
  dots?: boolean
  speed?: number
  autoplay?: boolean
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

const MovieSlider: React.FC<Props> = ({
    title,
    children
  }): ReactElement => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const settings = {
    focusOnSelect: false,
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: false,
    slidesToShow: 3, // TODO: need to add function base on width items
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
      { title && <div className={styles.title}> {title} </div> }
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  )
}

export default MovieSlider
