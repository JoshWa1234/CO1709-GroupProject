import styles from './Homepage.module.css'
import WorkPlaceWellbeing from '../../assets/images/WorkPlaceWellbeing.jpg';
import mobileWorkPlaceWellbeing from '../../assets/images/mobileWorkPlaceWellbeing.jpg';

function heroBannerImage(){
    let heroBanner;
    if (window.innerWidth <= 750){
        heroBanner = (
            <>
                <div className={styles['banner']}>
                    <div>
                        <img src={mobileWorkPlaceWellbeing} alt="Wellbeing" />
                    </div>
                </div>
            </>
        )
    }
    else{
        heroBanner = (
            <>
                <div className={styles['banner']}>
                    <div>
                        <img src={WorkPlaceWellbeing} alt="Wellbeing" />
                    </div>
                </div>
            </>

        )

    }
    return heroBanner;
}

function HomePage() {
    return heroBannerImage()
}

export default HomePage
