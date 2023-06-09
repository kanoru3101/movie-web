import React, { ReactElement } from 'react'
import styles from './SearchButton.module.css'
import { useModal } from '../../../providers/Modal'
import { FaSearch } from 'react-icons/fa'
import { SearchModal } from '../../Modals'

const SearchButton: React.FC = (): ReactElement => {
  const { openModal } = useModal()

  const handleSearchButton = () => openModal(<SearchModal />)

  return (
    <>
      {/*<SearchModal />*/}
      <div className={styles.wrapper} onClick={() => handleSearchButton()}>
        <FaSearch />
      </div>
    </>
  )
}

export default SearchButton
