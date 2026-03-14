import {useState} from "react";
import InputBox from "@/ui Components/InputBox/InputBox.jsx";

export default function LoginForm(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const emailInput = (
        <InputBox tag={'EmailInput'} type={'email'} placeholder={'john.doe@gmail.com'} validation={'email'}></InputBox>
    )
    const passwordInput = (

        <InputBox tag={'PasswordInput'} type={'password'} placeholder={'************'} validation={'password'}></InputBox>
    )


    return(
        <div>
            <div>
                {emailInput}
            </div>
            <div>
                {passwordInput}
            </div>
        </div>
    )
}