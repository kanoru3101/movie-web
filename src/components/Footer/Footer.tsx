import classes from "./Footer.module.css";
const Footer = () => {
    return (
        <footer className={classes.wrapper}>
            <span className={classes.owner}>
               @2023 Kanoru
            </span>
        </footer>
    )
}

export default Footer
