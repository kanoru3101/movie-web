import React, { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovie, getSimilarMovies } from '../../services/api'
import { Cast, Movie } from '../../services/api/types'
import styles from './Movie.module.css'
import { Button, CastCard, MovieCard, Slider, Tag, VideoCard } from '../../components/ui'
import { FaCalendarAlt, FaClock } from 'react-icons/fa'
import { TbRating12Plus, TbRating18Plus } from 'react-icons/tb'
import { AiFillYoutube } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'
import { MOVIE_VIDEO_TYPE } from '../../constants'
import { useModal } from '../../providers/Modal'
import { VideoModal } from '../../components/Modals'
import _ from 'lodash'
import getMovieCast from '../../services/api/getMovieCast'

const MoviePage = () => {
  const { imdbId } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [recommendations, setRecommendations] = useState<Movie[]>([])
  const [trailer, setTrailer] = useState<string | null>(null)
  const [mainTrailer, setMainTrailer] = useState<string | null>(null)
  const [cast, setCast] = useState<Array<Cast>>([])

  const { t } = useTranslation()
  const { openModal } = useModal()

  useEffect(() => {
    const loadData = async () => {
      window.scrollTo(0, 0);

      if (imdbId) {
        const movie = await getMovie({ imdbId });
        setMovie(movie)
        setMainTrailer(getNewestTrailer(movie))

        const recommendations = await getSimilarMovies({ imdbId });
        setRecommendations(recommendations)

        const castData = await getMovieCast({ movieImdb: imdbId })
        setCast(castData)
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


  const groupedVideos = (): ReactElement[] => {
    const grouped = _?.groupBy(movie?.videos || [], video => video.type) || {};

    const videoTypes = [
      MOVIE_VIDEO_TYPE.TRAILER,
      MOVIE_VIDEO_TYPE.CLIP,
      MOVIE_VIDEO_TYPE.BEHIND_THE_SCENES,
      MOVIE_VIDEO_TYPE.TEASER,
      MOVIE_VIDEO_TYPE.FEATURETTE,
      MOVIE_VIDEO_TYPE.BLOOPERS,
      MOVIE_VIDEO_TYPE.RECAP
    ]

    return videoTypes.map((key) => {
      const videos = grouped[key];
      if (videos?.length > 0) {
        return <div className={styles.trailersWrapper}>
          <Slider
            title={key}
            titleStyles={styles.titleVideoCard}
            sliderSetting={{
              slidesToShow: 3,
              slidesToScroll: 3,
            }}
          >
            {
              videos.map(video => <VideoCard
                openVideoModal={handleVideoModal}
                video={video}
              />)}
          </Slider>
        </div>
      }

      return <></>
    })
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
            {
              groupedVideos()
            }
          </div>
        </div>
      )}

      {recommendations.length > 0 && (
        <div>
          <div className={styles.recommendationContainer}>
            <Slider
              title={t<string>('moviePage.recommendations')}
              sliderSetting={{
                autoplay: true,
                slidesToScroll: 3,
                slidesToShow: 3,
              }}
            >
              {
                recommendations?.map((movie, index) => <MovieCard {...movie} key={index} />)
              }
            </Slider>
          </div>
        </div>
      )}

      {cast.length > 0 && (
        <div>
          <div className={styles.castContainer}>
            <Slider
              title={t<string>('moviePage.cast')}
              sliderSetting={{
                autoplay: false,
                slidesToScroll: 3,
                slidesToShow: 3,
              }}
            >
              {
                cast?.map((castData, index) => <CastCard key={index}  {...castData} />)
              }
            </Slider>
          </div>
        </div>
      )}
    </div>
  )
}

export default MoviePage
