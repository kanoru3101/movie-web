import React, { ReactElement } from 'react'
import styles from './TextComponent.module.css'

type Props = {
  text: string
  paragraphClass?: string
  divClass?: string
}

const TextComponent: React.FC<Props> = ({
  text,
  paragraphClass = '',
  divClass = ''
}: Props): ReactElement => {
  const textByParagraphs = text.split('\n\n')

  return (
    <div className={`${styles.wrapper} ${divClass}`}>
      {textByParagraphs.map((p, index) => (
        <p className={`${styles.paragraphs} ${paragraphClass}`} key={index}>
          {p}
        </p>
      ))}
    </div>
  )
}

export default TextComponent
