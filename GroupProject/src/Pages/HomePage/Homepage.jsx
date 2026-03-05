import styles from './Homepage.module.css'
import WorkPlaceWellbeing from '../../assets/images/WorkPlaceWellbeing.jpg';
import mobileWorkPlaceWellbeing from '../../assets/images/mobileWorkPlaceWellbeing.jpg';
import SlideShow from "../../Components/ImageSlideShow/ImageSlideShow.jsx";
import ImageComponent from "../../Components/Image/ImageComponent.jsx";
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
function SlideShowCreation(){
    const imageList = [
        <ImageComponent width={'100px'} height={'100px'} imagePath={WorkPlaceWellbeing} type={'banner'} key={'image1'}></ImageComponent>,
        <ImageComponent width={'100px'} height={'100px'} imagePath={mobileWorkPlaceWellbeing} type={'banner'} key={'image2'}></ImageComponent>
    ]
    return (
        <SlideShow imageList={imageList}></SlideShow>
    )
}

function HomePage() {
    return SlideShowCreation()
}

export default HomePage
