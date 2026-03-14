import {useState,Fragment} from "react";
import styles from './InputBox.module.css'
import {emailValidation,passwordValidation} from "@/utils/validation.utils.js";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const highlightTypes = {
    error: 'highlight-error',
    success: 'highlight-success',
    warning: 'highlight-warning',
    none: 'highlight-none'
}
const validationTypes = ['email', 'password','none'];

//https://mui.com/material-ui/react-tooltip/
const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} placement="right-start" />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));


export default function InputBox({type,placeholder,tag,errorMsg ,validation}){
    const [inputValue,setInputValue] = useState('')
    // set to true on initially so error is not aggressive
    const [validInput,setValidInput] = useState(true)
    const [errorMsgState,setErrorMsg] = useState(errorMsg || '')

    if (!validationTypes.includes(validation)) {
        throw new Error("Please enter a valid validation type for the InputBox component");
    }

    function validate(value = inputValue) {
        let overwriteErrorMsg = !errorMsg;
        let inputValid = true;

        switch (validation) {
            case "email":
                if (overwriteErrorMsg) setErrorMsg("Please enter a valid email address");
                inputValid = emailValidation(value);
                break;

            case "password":
                if (overwriteErrorMsg) setErrorMsg("Please enter a valid password");
                inputValid = passwordValidation(value);
                break;
        }
        setValidInput(inputValid);
    }

    function letterChange(value) {
        setInputValue(value);

        if (!validInput) {
            validate(value);
        }
    }
    const inputElement = (
        <input
            type={type}
            placeholder={placeholder}
            id={tag}
            className={!validInput ? styles["InputBox-Error"] : styles["InputBox-Standard"]}
            value={inputValue}
            onChange={(e) => letterChange(e.target.value)}
            onBlur={() => validate()}
        />
    );

    const inputWithError = (
        <>
            {inputElement}
            {!validInput && (
                <div>
                    <span className={styles["error-text"]}>{errorMsgState}</span>
                </div>
            )}
        </>
    );

    if (type === "password") {
        return (
            <HtmlTooltip
                title={
                    <Fragment>
                        <Typography color="inherit">Password Requirements</Typography>
                        <ul>
                            <li>At Least 1 Uppercase Character</li>
                            <li>At least 6 Lowercase Character</li>
                            <li>At least 1 Special Character</li>
                            <li>At least 1 Numeric Character</li>
                            <li>Max Length 32 Characters</li>
                        </ul>
                    </Fragment>
                }
            >
                {inputElement}
                {!validInput && (
                    <div>
                        <span className={styles["error-text"]}>{errorMsgState}</span>
                    </div>
                )}
            </HtmlTooltip>
        );
    }

    return <div>{inputWithError}</div>;
}