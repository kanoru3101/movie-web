import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovie } from '../../services/api'
import { Movie } from '../../services/api/types'
import styles from './Movie.module.css'
import { Tag } from '../../components/ui'
import { FaCalendarAlt, FaClock } from 'react-icons/fa'
import { TbRating12Plus, TbRating18Plus } from 'react-icons/tb'
import { useTranslation } from 'react-i18next'
import { MOVIE_VIDEO_TYPE } from '../../constants'

const MoviePage = () => {
  const { imdbId } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)

  const { t } = useTranslation();

  useEffect(() => {
    const loadData = async () => {
      if (imdbId) {
        const movie = await getMovie({ imdbId })
        setMovie(movie)
      }

    }

    loadData()
  }, [imdbId])


  const getNewestTrailer = (): string | null => {
    const { videos } = movie ?? {};
    const trailers = videos?.filter((video) => video.type === MOVIE_VIDEO_TYPE.TRAILER);
    const newestTrailer = trailers?.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    const youtubeKey = newestTrailer?.[0]?.key;
    return youtubeKey ? `https://youtu.be/${youtubeKey}` : null;
  }


  if (!movie) {
    return (<div> LOADING ....</div>)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} style={{ backgroundImage: `url(${movie?.backdrop_path})` }}>
        <div className={styles.backgroundOpacity}>
          <div className={styles.movieDetailContainer}>
            <div className={styles.imageWrapper}>
              <img className={styles.image} src={movie.poster_path} alt={movie.title} />
            </div>
            <div className={styles.details}>
              <h1>{movie.title}</h1>
              <h4> {movie.tagline} </h4>
              <span>{movie.overview}</span>
              {
                movie?.genres?.length > 0 &&
                <div className={styles.tagsWrapper}>
                  {movie.genres.map(({ id, name }) => <Tag name={name} key={id} />)}
                </div>
              }

              <div className={styles.shortDetail}>
                <div className={styles.iconWithText}> <div className={styles.iconWrapper} style={{ fontSize: 24, display: 'flex'}}> { movie.adult ? <TbRating18Plus /> : <TbRating12Plus /> } </div> </div>
                <div className={styles.iconWithText}> <div className={styles.iconWrapper}> <FaCalendarAlt /> </div> {movie.release_date}  </div>
                <div className={styles.iconWithText}> <div className={styles.iconWrapper}> <FaClock /> </div> {movie.runtime} {t('min')} </div>
              </div>
              <div>
                { getNewestTrailer() }
                <div> {t('watchTrailer')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.another}>
        HELLLO
      </div>

    </div>)
}

export default MoviePage
