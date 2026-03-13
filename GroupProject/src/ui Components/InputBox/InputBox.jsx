import {useState} from "react";
import styles from './InputBox.module.css'
import {emailValidation} from "@/utils/validation.utils.js";

const highlightTypes = {
    error: 'highlight-error',
    success: 'highlight-success',
    warning: 'highlight-warning',
    none: 'highlight-none'
}
const validationTypes = ['email', 'password','none'];
export default function InputBox({type,placeholder,tag,errorMsg ,validation}){
    const [highlightState,setHighlightState] = useState(highlightTypes.none)
    const [inputValue,setInputValue] = useState('')
    // set to true on initially so error is not aggressive
    const [validInput,setValidInput] = useState(true)
    const [errorMsgState,setErrorMsg] = useState(errorMsg || '')
    if (!validationTypes.includes(validation)) {
        throw new Error('Please enter a valid validation type for the InputBox component')
    }
    function validate(){
        let overWriteErrorMsg = errorMsg === null || errorMsg === '' || errorMsg === undefined
        switch (validation){
            case 'email':

                if (overWriteErrorMsg){
                    setErrorMsg('Please enter a valid email address')
                }
                let valid = emailValidation(inputValue);

                setValidInput(valid)
                setHighlightState(valid ? highlightTypes.success : highlightTypes.error);
                break;
            default:
                setValidInput(true)
        }
    }
    function changeState(state){
        setHighlightState(state);
        highlight()
    }

    function setSuccess(){
        changeState(highlightTypes.success)
    }

    function highlight(){
        let inputBox = document.getElementById(tag)
        if(inputBox){
            inputBox.classList.add(styles[highlightState])
        }
    }
    function letterChange(value){
        setInputValue(value)
        if(!validInput){
            validate()
        }
    }
    function inputBox(){
        // Validate error on blur so user only sees error when clicking off or tabbing out
        return (
            <div>
                <input type={type}
                       placeholder={placeholder}
                       id={tag}
                       className={styles['InputBox-Error']}
                       value={inputValue}
                       onChange={(e) => letterChange(e.target.value)}
                       onBlur={() => validate()}
                />

            </div>
        )
    }
    function inputErrorCheck(){
        let val = inputBox();
        if (!validInput){
            val = (
                <>
                    <div>
                        { inputBox() }
                        <div>
                            <span >Error: { errorMsgState }</span>
                        </div>
                    </div>
                </>
            )
        }

        return val;
    }
    return inputErrorCheck()
}