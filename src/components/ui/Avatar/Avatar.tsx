import React, { ImgHTMLAttributes, ReactElement } from 'react'

import styles from './Avatar.module.css'

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  imageUrl?: string
  name?: string
}

const Avatar: React.FC<Props> = ({
  imageUrl,
  name,
  width,
  height,
  ...props
}): ReactElement => {
  return (
    <img
      src={imageUrl || '/images/no-image.png'}
      alt={name || imageUrl}
      width={width || 50}
      height={height || 50}
      {...props}
      className={styles.img}
    />
  )
}

export default Avatar
