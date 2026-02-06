import styles from './Homepage.module.css'
import WorkPlaceWellbeing from '../../assets/images/WorkPlaceWellbeing.jpg';

function HomePage() {
    return (
        <>
            <div className={styles['banner']}>
                <div>
                    <img src={WorkPlaceWellbeing} alt="Wellbeing" />
                </div>
            </div>
        </>
    )
}

export default HomePage
