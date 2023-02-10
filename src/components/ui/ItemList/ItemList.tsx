import React, {
  ReactElement,
} from 'react';
import { FiCheck, FiEyeOff, FiX } from 'react-icons/fi'
import styles from './ItemList.module.css'

type Props = {
  title?: string,
  item: {
    title: string,
    image?: string,
    genres: Array<{id: number, name: string }>
  }
};

const ItemList: React.FC<Props> = ({ item, title: titleBlock }: Props): ReactElement => {
  const { title, genres, image } = item;
  return(
    <div className={styles.container}>
      {
        titleBlock &&
          <div  className={styles.titleBlock}>
            <span> { titleBlock }</span>
          </div>
      }
      <div className={styles.wrapper}>
        <div>
          <img className={styles.movieImage} src={image || '/images/no-image.png'} />
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.title}> {title} </span>
          <div className={styles.genresList}>
            {
              genres?.map(({id, name}) =>
                <div key={id} className={styles.genre}>
                  <p className={styles.tagText}>{name} </p>
                </div>
              )
            }
          </div>
        </div>
        <div className={styles.actionBlock}>
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <div className={styles.iconWrapper} onClick={() => {}}>
            <FiCheck />
          </div>
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <div className={styles.iconWrapper} onClick={() => {}}>
            <FiX />
          </div>
          {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
          <div className={styles.iconWrapper} onClick={() => {}}>
            <FiEyeOff />
          </div>
        </div>
      </div>
    </div>

  )
}

export default ItemList
