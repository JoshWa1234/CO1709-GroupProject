import styles from "./Footer.module.css";
import FooterItem from "../FooterItem/FooterItem.jsx";
import {useAuth} from "@/context/AuthContext.jsx";

function Footer() {

    const {user} = useAuth()
    return (
        <>
            <div className={styles['footer-container']}>
                <div className={styles['footer-container-left']}>
                </div>
                <div className={styles['footer-container-right']}>
                    {user === null ? (
                        <div className={styles['footer-item-container']}>
                            <FooterItem path={"/login"} message={'Login'}></FooterItem>
                        </div>
                    ):
                    <div className={styles['footer-item-container']}></div>}


                </div>
            </div>
        </>
    )
}

export default Footer
