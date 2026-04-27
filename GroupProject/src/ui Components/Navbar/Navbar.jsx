import styles from "./Navbar.module.css";
import NavbarItem from "../NavbarItem/NavbarItem.jsx";
import {useState} from "react";

function Navbar() {
    const [Responsive, setResponsive] = useState(false);

    function changeResponsive() {
        setResponsive(prev => !prev);
    }
    // noinspection JSUnresolvedLibraryURL
    return (
                       <div className={`${styles['nav-container']} ${Responsive ? styles['responsive'] : ''}`}>
                <div className={`${styles['nav-item-container']} ${!Responsive ? styles['icon'] : ''}`}>
                    <div className={styles['icon']}>
                        <button type="button" onClick={changeResponsive}>
                            ☰
                        </button>
                    </div>
                </div>
                <div className={styles['nav-container-left']}>
                    <div className={styles['nav-item-container']}>
                        <NavbarItem path={"/login"} message={'Login'}></NavbarItem>
                    </div>
                    <div className={styles['nav-item-container']}>
                        <NavbarItem path={"/leaderboard"} message={'Leaderboard'}></NavbarItem>
                    </div>
                    <div className={styles['nav-item-container']}>
                        <NavbarItem path={"/challenges"} message={'Challenges'}></NavbarItem>
                    </div>
                    <div className={styles['nav-item-container']}>
                        <NavbarItem path={"/challenge-master"} message={'Challenge Master'}></NavbarItem>
                    </div>
                    <div className={styles['nav-item-container']}>
                        <NavbarItem path={"/history"} message={'History'}></NavbarItem>
                    </div>
                </div>

                <div className={styles["nav-container-right"]}></div>
            </div>
    );
}

export default Navbar;
