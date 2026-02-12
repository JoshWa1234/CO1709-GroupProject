import styles from "./Navbar.module.css";
import NavbarItem from "../NavbarItem/NavbarItem.jsx";
import {useState} from "react";

function Navbar() {
    const [Responsive, setResponsive] = useState(false);

    function changeResponsive() {
        setResponsive(prev => !prev);
    }
    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

            <div className={`${styles['nav-container']} ${Responsive ? styles['responsive'] : ''}`}>
                <div className={styles['nav-item-container']}>
                    <div className={styles['icon']}>
                        <a onClick={changeResponsive}>
                            <i className={'fa fa-bars'}></i>
                        </a>
                    </div>
                </div>
                <div className={styles['nav-container-left']}>
                    <div className={styles['nav-item-container']}>
                        <NavbarItem message={'Test-left'}></NavbarItem>
                    </div>
                    <div className={styles['nav-item-container']}>
                        <NavbarItem message={'Test-left'}></NavbarItem>
                    </div>
                    <div className={styles['nav-item-container']}>
                        <NavbarItem message={'Test-left'}></NavbarItem>
                    </div>
                </div>
                <div className={styles['nav-container-right']}>

                </div>
            </div>
        </>
    )
}

export default Navbar
