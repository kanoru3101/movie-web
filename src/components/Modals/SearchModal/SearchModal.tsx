import React, { useState } from 'react'
import Modal from '../Modal/Modal'
import styles from './SearchModal.module.css'
import { Movie, Person } from '../../../services/api/types'
import { SearchResults } from '../../ui'
import _ from 'lodash'
import { SEARCH_FILTERS } from '../../../constants'
import SearchInput from '../../ui/SearchInput/SearchInput'
import SearchFilters from '../../ui/SearchFilters/SearchFilters'
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../../providers/Modal'

type Results = {movies: Array<Movie>, people: Array<Person>}

const SearchModal: React.FC = () => {
  const {closeModal} = useModal()
  const navigate = useNavigate()
  const [input, setInput] = useState<string | null>(null)
  const [filter, setFilter] = useState<SEARCH_FILTERS>(SEARCH_FILTERS.MOVIES)
  const [results, setResults] = useState<Results>({
    movies: [],
    people: [],
  })

  const handleData = (results: Results)  => {
    setResults({
      movies: results.movies,
      people: results.people
    })
  }

  const handleInput = (value?: string) => {
    setInput(value || null)
  }

  const handleFilter = (data: SEARCH_FILTERS) => {
    setFilter(data)
  }

  const handleRedirect = () => {
    navigate(`/search?q=${input}&f=${filter}`)
    closeModal()
  }

  return (
    <Modal
      modalStyles={styles.modalWrapper}
      modalOverlayStyles={styles.modalOverlayWrapper}
      closeButton={true}
    >
      <div className={styles.container}>
        <SearchInput
          filter={filter}
          onData={handleData}
          onInput={handleInput}
        />
        <div className={styles.containerSearchFilters}>
          <SearchFilters
            defaultFilters={[
              SEARCH_FILTERS.MOVIES,
              SEARCH_FILTERS.PEOPLE,
            ]}
            activeFilter={filter}
            onFilter={handleFilter}
          />
        </div>
        <SearchResults
          isHideTabs={true}
          filter={filter}
          redirectToSearchPage={handleRedirect}
          movies={_.sortBy(results.movies, -'popularity')}
          people={_.sortBy(results.people, -'popularity')}
        />
      </div>
    </Modal>
  )
}

export default SearchModal
