import React, { ImgHTMLAttributes, ReactElement } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from './MovieSlider.module.css'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  title: string
}

const MovieSlider: React.FC<Props> = ({
    title,
    children
  }): ReactElement => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: false,
    slidesToShow: 2 // TODO: need to add function base on width items
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}> {title} </div>
      <Slider {...settings}>
        {children}
      </Slider>
    </div>
  )
}

export default MovieSlider
