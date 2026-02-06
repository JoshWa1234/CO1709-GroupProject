import styles from "./Navbar.module.css";
import NavbarItem from "../NavbarItem/NavbarItem.jsx";

function Navbar() {
    return (
        <>
            <div className={styles['nav-container']}>
                <div className={styles['nav-container-left']}>
                    <NavbarItem message={'Test-left'}></NavbarItem>
                </div>
                <div className={styles['nav-container-right']}>
                    <div className={styles['nav-item-container']}>
                        <NavbarItem message={'Test-right'}></NavbarItem>
                    </div>

                    <div className={styles['nav-item-container']}>
                        <NavbarItem message={'Test Button'}></NavbarItem>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
