import React, { HTMLAttributes, ReactElement } from 'react'
import styles from './Tag.module.css'
import { useNavigate } from 'react-router-dom'

type Props = HTMLAttributes<HTMLDivElement> & {
  name: string;
  link?: string;
}
const Tag: React.FC<Props> = ({ name, link }): ReactElement => {
  const navigate = useNavigate()
  const handleRedirect = (): void => {
    !!link && navigate(link)
  }

  return (
   <div className={styles.tag} onClick={() => handleRedirect()}>
     {name.toUpperCase()}
   </div>
  )
}
export default Tag
