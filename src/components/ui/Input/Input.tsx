import React, {
    ReactElement,
} from 'react';
import styles from './Input.module.css'

type Props = {
    children?: React.ReactNode;
    value?: string | number;
    name: string;
}
type GenerateLettersAnimationProps = {
    lettersArray: string[]
}
const GenerateLettersAnimation: React.FC<GenerateLettersAnimationProps>  = ({lettersArray}): ReactElement => {
    let delay = 0
    console.log("###", lettersArray)
    return(
        <>
            { lettersArray.map((letter, index) => {
                const letterDelay = delay;
                delay += 50;
                return <span className={styles.letter} key={index} style={{transitionDelay: `${letterDelay}ms`}}>{letter}</span>
            })}
        </>
    )

}

const Input: React.FC<Props> = ({ name, value}: Props): ReactElement => {
    return(
        <div className={styles.form}>
            <input className={styles.input} type="text" required={true} value={value}/>
            <label className={styles.label}>
                <GenerateLettersAnimation lettersArray={name.split('')}/>
            </label>
        </div>
    )
}

export default Input
