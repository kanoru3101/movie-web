import React, {
    ReactElement,
} from 'react';
import styles from './Card.module.css'

type Props = {
    label: string
};

const Card: React.FC<Props> = ({ label }: Props): ReactElement => {
    return(
        <div className={styles.card}>
            <h2>{label}</h2>
        </div>
    )
}

export default Card
