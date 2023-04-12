import React, { ImgHTMLAttributes, ReactElement } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from './MovieSlider.module.css'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  title?: string
  slidesToShow?: number
  focusOnSelect?: boolean
  dots?: boolean
  speed?: number
  autoplay?: boolean
}

const MovieSlider: React.FC<Props> = ({
    title,
    slidesToShow,
    focusOnSelect,
    dots,
    speed,
    autoplay,
    children
  }): ReactElement => {

  const settings = {
    focusOnSelect: focusOnSelect ?? false,
    dots: dots ?? true,
    infinite: true,
    speed: speed ?? 1000,
    autoplay: autoplay ?? false,
    slidesToShow: slidesToShow ?? 2 // TODO: need to add function base on width items
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
