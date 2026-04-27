import WorkPlaceWellbeing from '../../assets/images/WorkPlaceWellbeing.jpg';
import mobileWorkPlaceWellbeing from '../../assets/images/mobileWorkPlaceWellbeing.jpg';
import WorkPlaceMeditation from '../../assets/images/WorkPlaceMeditation.jpg';
import WorkPlaceMind from '../../assets/images/WorkPlaceMind.jpg';
import SlideShow from "../../ui Components/ImageSlideShow/ImageSlideShow.jsx";
import ImageComponent from "../../ui Components/Image/ImageComponent.jsx";
import { useEffect } from 'react';

function SlideShowCreation(){
    const imageList = [
        <ImageComponent imagePath={WorkPlaceWellbeing} type={'banner'} key={'image1'}></ImageComponent>,
        <ImageComponent imagePath={mobileWorkPlaceWellbeing} type={'banner'} key={'image2'}></ImageComponent>,
        <ImageComponent imagePath={WorkPlaceMeditation} type={'banner'} key={'image3'}></ImageComponent>,
        <ImageComponent imagePath={WorkPlaceMind} type={'banner'} key={'image4'}></ImageComponent>
    ]

    return (
        <SlideShow imageList={imageList}></SlideShow>
    )
    

}
function HomePage() {
    return SlideShowCreation()
}

export default HomePage
