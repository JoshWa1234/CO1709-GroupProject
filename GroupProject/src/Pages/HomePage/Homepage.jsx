import WorkPlaceWellbeing from '../../assets/images/WorkPlaceWellbeing.jpg';
import mobileWorkPlaceWellbeing from '../../assets/images/mobileWorkPlaceWellbeing.jpg';
import SlideShow from "../../Components/ImageSlideShow/ImageSlideShow.jsx";
import ImageComponent from "../../Components/Image/ImageComponent.jsx";
import { useEffect } from 'react';

function SlideShowCreation(){
    const imageList = [
        <ImageComponent width={'100px'} height={'100px'} imagePath={WorkPlaceWellbeing} type={'banner'} key={'image1'}></ImageComponent>,
        <ImageComponent width={'100px'} height={'100px'} imagePath={mobileWorkPlaceWellbeing} type={'banner'} key={'image2'}></ImageComponent>
    ]

useEffect(() => {
    // Test API call to backend 
    async () => {
        try {
                const response = await fetch("http://127.0.0.1:8000/test") 
                const data = await response.json();
                console.log("Received from API:", data);
        } 
        catch (error) {
            console.error("Error fetching API:", error);
        }
    }
}, [])


    return (
        <SlideShow imageList={imageList}></SlideShow>
    )
    

}
function HomePage() {
    return SlideShowCreation()
}

export default HomePage
