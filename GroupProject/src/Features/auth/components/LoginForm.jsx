import {useState} from "react";
import InputBox from "@/ui Components/InputBox/InputBox.jsx";

export default function LoginForm(props){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    function emailInput(){
        return (
            <>
            <InputBox tag={'EmailInput'} type={'email'} placeholder={'john.doe@gmail.com'} validation={'email'}></InputBox>
            </>
        )
    }
    return(
        <>
            <div>
                {emailInput()}
            </div>
        </>
    )
}