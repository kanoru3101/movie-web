import React, { useState } from 'react'
import styles from './Search.module.css'
import SearchInput from '../../components/ui/SearchInput/SearchInput'
import { Movie, Person } from '../../services/api/types'
import { SEARCH_FILTERS } from '../../constants'
import { SearchResults } from '../../components/ui'
import _ from 'lodash'
import SearchFilters from '../../components/ui/SearchFilters/SearchFilters'
import { useSearchParams } from 'react-router-dom'
import queryString from 'query-string'

type Data = { movies: Array<Movie>; people: Array<Person> }

const SearchPage = () => {
  const { f, q }: { f?: SEARCH_FILTERS; q?: string } = queryString.parse(
    location.search
  )
  const [data, setData] = useState<Data>({ movies: [], people: [] })
  const [filter, setFilter] = useState<SEARCH_FILTERS>(
    f || SEARCH_FILTERS.MOVIES
  )
  const [searchParams, setSearchParams] = useSearchParams()
  const handleData = (data: Data) => {
    setData({
      movies: data.movies,
      people: data.people,
    })
  }

  const handleInput = (value?: string) => {
    const queryParams = { ...searchParams, f: filter }

    if (value) {
      Object.assign(queryParams, { q: value })
    }

    setSearchParams(`?${new URLSearchParams(queryParams)}`)
  }

  const handleFilter = (data: SEARCH_FILTERS) => {
    setFilter(data)
  }

  return (
    <div className={styles.container}>
      <SearchInput
        defaultInput={q}
        filter={filter}
        onData={handleData}
        onInput={handleInput}
      />
      <div className={styles.searchFilterWrapper}>
        <SearchFilters
          activeFilter={filter}
          onFilter={handleFilter}
          defaultFilters={[SEARCH_FILTERS.MOVIES, SEARCH_FILTERS.PEOPLE]}
        />
      </div>

      <div className={styles.searchResultsWrapper}>
        <SearchResults
          isHideTabs={true}
          filter={filter}
          movies={_.sortBy(data.movies, -'popularity')}
          people={_.sortBy(data.people, -'popularity')}
          showAllItems={true}
        />
      </div>
    </div>
  )
}

export default SearchPage
