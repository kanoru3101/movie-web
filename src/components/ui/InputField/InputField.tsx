import React, {
    ReactElement,
} from 'react';
import styles from './InputField.module.css'
import { IconContext } from "react-icons";
import { FiAlertOctagon } from "react-icons/fi";


type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    children?: React.ReactNode;
    value?: string | number;
    name: string;
    label: string;
    field: {
        name: string,
    };
    form: any
}
type GenerateLettersAnimationProps = {
    lettersArray: string[]
}
const GenerateLettersAnimation: React.FC<GenerateLettersAnimationProps>  = ({lettersArray}): ReactElement => {
    let delay = 0
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

const InputField: React.FC<Props> = ({
    field,
    label,
    id,
    value,
    form: { touched, errors },
    ...props
    }: Props): ReactElement => {
    return(
        <div className={styles.form}>
            <input id={id} {...field} className={styles.input} {...props}/>
            <label htmlFor={id} className={`${styles.label} ${!!value && styles.emptyInput}`}>
                <GenerateLettersAnimation lettersArray={label.split('')}/>
            </label>
            <div className={styles.errorWrapper}>
                {touched[field.name] && errors[field.name] && (
                    <>
                        <IconContext.Provider value={{ className: styles.errorIcon }}>
                            <FiAlertOctagon />
                        </IconContext.Provider>
                        <span>{errors[field.name]}</span>
                    </>
                )}
            </div>
        </div>
    )
}

export default InputField
