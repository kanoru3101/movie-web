import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovie } from '../../services/api'
import { Movie } from '../../services/api/types'
import styles from './Movie.module.css'

const MoviePage = () => {
  const { imdbId } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    const loadData = async () => {
      if (imdbId) {
        const movie = await getMovie({ imdbId })
        setMovie(movie)
      }

    }

    loadData()
  }, [imdbId]);


  if (!movie) {
    return ( <div> LOADING ....</div>)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}
        // style={{
        //   backgroundImage: `url(${movie?.backdrop_path})`
        // }}
      >
        <div className={styles.movieDetailContainer}>
          <img className={styles.image} src={movie.poster_path}/>
          <div className={styles.info}></div>
        </div>
      </div>

    </div>)
}

export default MoviePage;
