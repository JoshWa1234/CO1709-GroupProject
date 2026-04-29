import styles from "./Navbar.module.css";
import NavbarItem from "../NavbarItem/NavbarItem.jsx";
import {useState} from "react";
import {useAuth} from "@/context/AuthContext.jsx";

function Navbar() {
    const [Responsive, setResponsive] = useState(false);
    const  {user } = useAuth();
    function changeResponsive() {
        if (innerWidth < 800){
            setResponsive(prev => !prev);
        }

    }


    return (
               <div className={`${styles['nav-container']} ${Responsive ? styles['responsive'] : ''}`}>
                    <div className={`${styles['nav-item-container']} ${!Responsive ? styles['icon'] : ''}`}>
                        <div className={styles['icon']}>
                            <button type="button" onClick={changeResponsive}>
                                ☰
                            </button>
                        </div>
                </div>
                <div className={Responsive?styles['nav-container-responsive'] : styles['nav-container-left']}>

                    <div className={styles['nav-item-container']}>
                        <NavbarItem path={"/"} message={'Home'} onClick={changeResponsive}></NavbarItem>
                    </div>
                    <div className={styles['nav-item-container']}>
                        <NavbarItem path={"/leaderboard"} message={'Leaderboard'} onClick={changeResponsive}></NavbarItem>
                    </div>
                    {user !== null ?(
                    <div className={styles['nav-item-container']}>
                        <NavbarItem path={"/challenges"} message={'Challenges'} onClick={changeResponsive}></NavbarItem>
                    </div>
                    ) : null
                    }
                    {user !== null  && user?.user_type_id === 3?(
                        <div className={styles['nav-item-container']}>
                            <NavbarItem path={"/challenge-master"} message={'Challenge Master'} onClick={changeResponsive}></NavbarItem>
                        </div>
                    ) : null
                    }
                    {user !== null ?(
                        <div className={styles['nav-item-container']}>
                            <NavbarItem path={"/history"} message={'History'} onClick={changeResponsive}></NavbarItem>
                        </div>
                    ) : null
                    }

                </div>

                <div className={Responsive?styles['nav-container-responsive'] :styles["nav-container-right"]}>
                        {user !== null && user?.user_type_id === 1 ? (
                            <div className={styles['nav-item-container']}>
                                <NavbarItem path={"/admin"} message={'Admin'} onClick={changeResponsive}></NavbarItem>
                            </div>
                        ) : null
                        }
                    {user === null ? (
                            <div className={styles['nav-item-container']}>
                                <NavbarItem path={"/login"} message={'Login'} onClick={changeResponsive}></NavbarItem>
                            </div>
                        ) : (
                        <div className={styles['nav-item-container']}>
                            <NavbarItem path={"/profile"} message={'Profile'} onClick={changeResponsive}></NavbarItem>
                        </div>

                        )}

                </div>
            </div>
    );
}

export default Navbar;
