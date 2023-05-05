import React, {
    ReactElement,
} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Card.module.css'

type Props = {
    name: string,
    image: string,
    path: string,
};

const Card: React.FC<Props> = ({ name, image, path }: Props): ReactElement => {
    const navigate = useNavigate()

    const navigateTo = (to: string): void => {
        navigate(to)
    }

    return(
        <div className={styles.card} onClick={() => navigateTo(path)}>
            <img className={styles.img} src={image} alt={name} />
            <p className={styles.text}>{name}</p>
        </div>
    )
}

export default Card
