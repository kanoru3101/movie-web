import styles from './SearchResults.module.css'
import { Cast, Movie, Person } from '../../../services/api/types'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import noPersonImage from '../../../assets/images/no-person.png'
import noMovieImage from '../../../assets/images/no-movie.png'
import Tabs from '../Tabs/Tabs'
import _ from 'lodash'
import { SEARCH_FILTERS } from '../../../constants'
import { useModal } from '../../../providers/Modal'

type Props = {
  movies: Array<Movie>
  people: Array<Person>
  filter: SEARCH_FILTERS
  maxItems?: number
  showAllItems?: boolean
  isHideTabs?: boolean
  redirectToSearchPage?: () => void
}
const SearchResults: React.FC<Props> = ({
  filter,
  movies,
  people,
  maxItems = 8,
  showAllItems = false,
  isHideTabs = false,
  redirectToSearchPage = () => null
}) => {
  const { closeModal } = useModal()
  const navigate = useNavigate()
  const data = { movies, people }

  const handleNavigation = (type: string, id: string) => {
    navigate(`/${type}/${id}`)
    closeModal()
  }

  const getYear = (date?: string): string | null =>
    date ? `${moment(date).format('YYYY')}` : null

  const getDataByType = (
    item: Movie | Person
  ): {
    imdbId: string
    title: string
    image: string
    originalTitle?: string
    releaseDate?: string
    movies?: Array<Movie>
    people?: Array<Person>
    type: 'movie' | 'person'
  } | null => {
    const isMovie = (item: Movie | Person): item is Movie => {
      return (item as Movie).imdb_id.includes('tt')
    }

    const isPerson = (item: Movie | Person): item is Person => {
      return (item as Person).imdb_id.includes('nm')
    }

    if (isMovie(item)) {
      const peopleForMovie = _.sortBy(item?.cast || [], 'order')

      return {
        imdbId: item.imdb_id,
        title: item.title,
        originalTitle: item.original_title,
        releaseDate: item.release_date,
        image: item.poster_path || item.backdrop_path || noMovieImage,
        people: peopleForMovie.map((castItem: Cast) => castItem.person),
        type: 'movie'
      }
    }

    if (isPerson(item)) {
      const moviesForPerson = _.sortBy(item?.cast || [], -'movie.popularity')

      return {
        imdbId: item.imdb_id,
        title: item.name,
        image: item?.profile_path || noPersonImage,
        movies: moviesForPerson.map((castItem: Cast) => castItem.movie),
        type: 'person'
      }
    }

    return null
  }

  const setDefaultTab = (): number | null => {
    const tabs = Object.entries(data)

    if (filter === SEARCH_FILTERS.MOVIES) {
      return tabs.findIndex(([key]) => key === SEARCH_FILTERS.MOVIES)
    }

    if (filter === SEARCH_FILTERS.PEOPLE) {
      return tabs.findIndex(([key]) => key === SEARCH_FILTERS.PEOPLE)
    }

    return null
  }

  return (
    <div className={styles.resultsWrapper}>
      <Tabs
        isHideTabs={isHideTabs}
        titles={Object.entries(data).map(
          ([key, value]) => `${key} (${value.length})`
        )}
        defaultTab={setDefaultTab()}
      >
        {Object.entries(data).map(([key, value], index) => {
          const valuesLength = value.length
          const isShowMore = valuesLength > maxItems

          return (
            <div className={styles.blockResult} key={index}>
              {(showAllItems ? value : value.slice(0, maxItems)).map(item => {
                const data = getDataByType(item)

                if (!data) return <></>

                return (
                  <div
                    className={styles.movieContainer}
                    key={item.imdb_id}
                    onClick={() => handleNavigation(data?.type, data.imdbId)}
                  >
                    <img
                      className={styles.image}
                      src={data.image}
                      alt={data.title}
                    />
                    <div className={styles.textBlock}>
                      <div className={styles.titleBlock}>
                        <p className={styles.itemText}>{`${data.title}`}</p>
                        {data?.originalTitle &&
                          data.originalTitle !== data.title && (
                            <p
                              className={`${styles.itemText} ${styles.originalTitle}`}
                            >
                              {` / ${data.originalTitle}`}
                            </p>
                          )}
                      </div>
                      {data?.releaseDate && (
                        <p className={styles.itemText}>
                          {getYear(data?.releaseDate)}
                        </p>
                      )}
                      {data.movies && data.movies?.length > 0 && (
                        <p className={styles.cast}>
                          {data.movies
                            .slice(0, 2)
                            .map(movie => movie.title)
                            .join(', ')}
                        </p>
                      )}
                      {data.people && data.people?.length > 0 && (
                        <p className={styles.cast}>
                          {data.people
                            .slice(0, 2)
                            .map(person => person.name)
                            .join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
              {!showAllItems && isShowMore && (
                <p className={styles.showMore} onClick={() => redirectToSearchPage()}> Show More </p>
              )}
            </div>
          )
        })}
      </Tabs>
    </div>
  )
}

export default SearchResults
