import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import styles from './SearchInput.module.css'
import { getNowPlaying, search } from '../../../services/api'
import { SEARCH_FILTERS } from '../../../constants'
import { Movie, Person } from '../../../services/api/types'

type Props = {
  defaultInput?: string
  filter: SEARCH_FILTERS
  onData: ({ movies, people }:{movies: Array<Movie>, people: Array<Person>}) => void
  onInput: (value?: string) => void
}
const SearchInput: React.FC<Props> = ({ defaultInput, filter, onData, onInput }): ReactElement => {
  const [placeholders, setPlaceholders] = useState<Array<string>>([])
  const [value, setValue] = useState<string>(defaultInput || '')

  const [isShowPlaceholder, setIsShowPlaceholder] = useState<boolean>(true)

  const handleShowPlaceHolder = useMemo(
    () => !!(isShowPlaceholder && !value),
    [isShowPlaceholder, value]
  )

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getNowPlaying()
      const movieTitles = movies.map(({ title }) => (title))
      setPlaceholders(movieTitles)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const loadData = async () => {
      onInput(value || undefined)
      if (!value) {
        setIsShowPlaceholder(true)
      }
      if (value && value.length > 2) {
        const dataSearch = await search({
          type: filter,
          query: value,
        })

        onData(dataSearch.data)
      }
    }

    loadData()
  }, [value, filter])


  return (
    <>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setIsShowPlaceholder(false)}
          onBlur={() => setIsShowPlaceholder(true)}
          placeholder=""
        />
        {handleShowPlaceHolder ? (
          <span className={styles.placeholder}>
            {
              placeholders?.length > 0 && <TypeAnimation
                sequence={(placeholders).flatMap((title) => [title, 2000])}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                className={styles.animatedPlaceholder}
              />
            }

            </span>
        ) : null}
      </div>
    </>
  )
}

export default SearchInput
