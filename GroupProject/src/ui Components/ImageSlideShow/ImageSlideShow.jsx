
import { cloneElement,useState } from "react";
import styles from "./ImageSlideShow.module.css";

export default function SlideShow ({imageList}) {
    const [slide, setSlide] = useState(0);
    const imageListLength = imageList.length;

    setTimeout(() => nextSlide(), 3000);

    function changeSlide(slideNo) {
        setSlide(slideNo);
    }

    function slideShowDots(imageList) {
        return (
            <div>
                {imageList.map(
                    (image, index) => (
                    <button  type={"button"} className={`${index === slide ? styles['active'] : ''} ${styles['dot']}`}
                          key={`dot${index}`}
                          onClick={() =>  {changeSlide(index)}}></button>
                    )
                )}
            </div>
        )
    }
    function buildImages(imageList) {
        return imageList.map((image, index) =>
            cloneElement(image, {
                extraStyles: slide === index ? styles['activeSlide'] : styles['hidden']
            })
        );
    }
    function nextSlide() {
        console.log('currentSlide =', slide)
        if (slide === imageListLength -1 ) {
            setSlide(0)
        }
        else{
            setSlide(slide + 1)
        }
    }
    function functionBuildList (imageList){
        return (
            <>
                <div className={styles['slideshow-container']}>
                    {buildImages(imageList)}

                    <div>
                        {slideShowDots(imageList)}
                    </div>

                </div>
            </>
        )
    }

    return (functionBuildList(imageList))
}



