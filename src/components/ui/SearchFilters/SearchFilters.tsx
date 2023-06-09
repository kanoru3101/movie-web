import React, { ReactElement, useState } from 'react'
import styles from './SearchFilters.module.css'
import { SEARCH_FILTERS } from '../../../constants'

type Props = {
  activeFilter: SEARCH_FILTERS
  defaultFilters?: Array<SEARCH_FILTERS>
  onFilter: (data: SEARCH_FILTERS) => void
}
const SearchFilters: React.FC<Props> = ({
  onFilter,
  defaultFilters,
  activeFilter,
}): ReactElement => {
  const baseFilters = [
    SEARCH_FILTERS.ALL,
    SEARCH_FILTERS.MOVIES,
    SEARCH_FILTERS.PEOPLE,
  ]
  const [filters] = useState<Array<SEARCH_FILTERS>>(
    defaultFilters || baseFilters
  )

  return (
    <>
      <div className={styles.filterWrapper}>
        <div className={styles.filterBlock}>
          {filters.map((item, index) => (
            <div
              key={index}
              onClick={() => onFilter(item)}
              className={`${styles.filter} ${
                activeFilter === item ? styles.activeFilter : null
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default SearchFilters
