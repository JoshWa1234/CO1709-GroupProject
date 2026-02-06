import styles from "./Footer.module.css";
import NavbarItem from "../NavbarItem/NavbarItem.jsx";
import FooterItem from "../FooterItem/FooterItem.jsx";

function Footer() {
    return (
        <>
            <div className={styles['footer-container']}>
                <div className={styles['footer-container-left']}>
                    <div className={styles['footer-item-container']}>
                        <FooterItem message={'Test-left'}></FooterItem>
                    </div>
                </div>
                <div className={styles['footer-container-right']}>
                    <div className={styles['footer-item-container']}>
                        <FooterItem message={'Test-right'}></FooterItem>
                    </div>

                    <div className={styles['footer-item-container']}>
                        <FooterItem message={'Test Button'}></FooterItem>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer
