import logo from "../../logo.svg";
import React from "react";
import {Card} from "../../components/ui";
import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.homeWrapper}>
            <div className={styles.cardList}>
                <Card label="Text" />
                <Card label="Beta" />
            </div>
        </div>
    )
}

export default Home;
