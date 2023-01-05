import classes from "./Header.module.css";
const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.wrapper}>
                <div className={classes.home}>
                    Home
                </div>
                <div className={classes.search}>
                    Something
                </div>
                <div className={classes.profileWrapper}>
                    <div>
                        Profile
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
