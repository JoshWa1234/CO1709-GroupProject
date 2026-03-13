import imageStyling from './ImageComponent.module.css'

function getStyleClass(type){
    let styleClass = {
        'banner' : imageStyling['banner'],
        'default' : imageStyling['default']
    }
    let style = styleClass[type]
    if (!style) {
        return styleClass['default']
    }
    return style;

}
function ImageComponent({imagePath,width,height,type,altText, extraStyles}) {
    return (
        <>
            <img src={imagePath} width={width} height={height} alt={altText} className={`${getStyleClass(type)} ${extraStyles}`} />
        </>
    )
}

export default ImageComponent;