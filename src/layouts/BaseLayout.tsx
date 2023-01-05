import React from 'react';
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import classes from "./BaseLayout.module.css";
type Props = {
    children?: React.ReactNode
}

const BaseLayout: React.FC<Props> =({children}) =>{
    return(
        <div className={classes.mainContainer}>
            <Header />
            <main className={classes.main}>{children}</main>
            <Footer />
        </div>
    )
}

export default BaseLayout;
