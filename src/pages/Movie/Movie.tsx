import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovie } from '../../services/api'
import { Movie } from '../../services/api/types'
import styles from './Movie.module.css'
import { Button, Tag, TrailerSlider } from '../../components/ui'
import { FaCalendarAlt, FaClock } from 'react-icons/fa'
import { TbRating12Plus, TbRating18Plus } from 'react-icons/tb'
import { AiFillYoutube } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'
import { MOVIE_VIDEO_TYPE } from '../../constants'
import { useModal } from '../../providers/Modal'
import { VideoModal } from '../../components/Modals'
import MovieSlider from '../../components/ui/MovieSlider/MovieSlider'

const MoviePage = () => {
  const { imdbId } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [trailer, setTrailer] = useState<string | null>(null)
  const [mainTrailer, setMainTrailer] = useState<string | null>(null)

  const { t } = useTranslation()
  const { openModal } = useModal()

  useEffect(() => {
    const loadData = async () => {
      if (imdbId) {
        const movie = await getMovie({ imdbId })
        setMovie(movie)
        setMainTrailer(getNewestTrailer(movie))
      }
    }

    loadData()
  }, [imdbId])

  const getNewestTrailer = (movieData: Movie): string | null => {
    const { videos } = movieData ?? {}
    const trailers = videos?.filter(
      video => video.type === MOVIE_VIDEO_TYPE.TRAILER
    )
    const newestTrailer = trailers?.sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )
    return newestTrailer?.[0]?.key ?? null
  }

  const handleVideoModal = (youtubeUrl: string | null) => {
    if (!youtubeUrl) {
      return setTrailer(null)
    }

    setTrailer(youtubeUrl)
    openModal()
  }

  if (!movie) {
    return <div> LOADING ....</div>
  }

  return (
    <div className={styles.wrapper}>
      <VideoModal youtubeKey={trailer} />
      <div
        className={styles.container}
        style={{ backgroundImage: `url(${movie?.backdrop_path})` }}
      >
        <div className={styles.backgroundOpacity}>
          <div className={styles.movieDetailContainer}>
            <div className={styles.imageWrapper}>
              <img
                className={styles.image}
                src={movie.poster_path}
                alt={movie.title}
              />
            </div>
            <div className={styles.details}>
              <h1>{movie.title}</h1>
              <h4> {movie.tagline} </h4>
              <span>{movie.overview}</span>
              {movie?.genres?.length > 0 && (
                <div className={styles.tagsWrapper}>
                  {movie.genres.map(({ id, name }) => (
                    <Tag name={name} key={id} />
                  ))}
                </div>
              )}

              <div className={styles.shortDetail}>
                <div className={styles.iconWithText}>
                  <div
                    className={styles.iconWrapper}
                    style={{ fontSize: 24, display: 'flex' }}
                  >
                    {' '}
                    {movie.adult ? <TbRating18Plus /> : <TbRating12Plus />}{' '}
                  </div>
                </div>
                <div className={styles.iconWithText}>
                  <div className={styles.iconWrapper}>
                    <FaCalendarAlt />
                  </div>
                  {movie.release_date}{' '}
                </div>
                <div className={styles.iconWithText}>
                  <div className={styles.iconWrapper}>
                    <FaClock />
                  </div>
                  {movie.runtime} {t('moviePage.minutes')}{' '}
                </div>
              </div>
              <div>
                {mainTrailer && (
                  <Button
                    onClick={() => handleVideoModal(mainTrailer)}
                    myStyles={styles.trailerBtnWrapper}
                  >
                    <div className={styles.trailerBtn}>
                      <div className={styles.youtubeIcon}>
                        <AiFillYoutube />
                      </div>
                      <div> {t('moviePage.watchTrailer')}</div>
                    </div>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {movie.videos && movie.videos.length > 0 && (
        <div className={styles.trailersContainer}>
          <h2> {t('moviePage.trailers').toUpperCase()} </h2>
          <div>
            <TrailerSlider
              title={"Videos"}
              videos={movie.videos}
              openVideoModal={handleVideoModal}
            />
            {/*<MovieSlider title={''} slidesToShow={3}>*/}
            {/*  {movie.videos?.map(video => {*/}
            {/*    const { id, key, name, official, published_at, site, type } =*/}
            {/*      video*/}
            {/*    const trumbnail = `http://img.youtube.com/vi/${key}/hqdefault.jpg`*/}
            {/*    // eslint-disable-next-line no-console*/}
            {/*    console.log('###trumbnail', trumbnail)*/}
            {/*    return (*/}
            {/*      <div className={styles.trailerItemWrapper} key={id}>*/}
            {/*        <div*/}
            {/*          className={styles.trumbnailWrapper}*/}
            {/*          onClick={() => handleVideoModal(key)}*/}
            {/*          style={{ backgroundImage: `url(${trumbnail})` }}*/}
            {/*        />*/}
            {/*        <div className={styles.cartInfo}>*/}

            {/*        </div>*/}
            {/*      </div>*/}
            {/*    )*/}
            {/*  })}*/}
            {/*</MovieSlider>*/}
          </div>
        </div>
      )}
    </div>
  )
}

export default MoviePage
