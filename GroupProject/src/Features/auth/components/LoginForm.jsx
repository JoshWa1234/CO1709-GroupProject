import {useState} from "react";
import InputBox from "@/ui Components/InputBox/InputBox.jsx";

export default function LoginForm(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    return(
        <div>
            <div>
                <InputBox
                    tag={'EmailInput'}
                    type={'email'}
                    placeholder={'john.doe@gmail.com'}
                    validation={'email'}
                    value={email}
                    onChange={setEmail}
                ></InputBox>
            </div>
            <div>
                <InputBox
                    tag={'PasswordInput'}
                    type={'password'}
                    placeholder={'************'}
                    validation={'password'}
                    value={password}
                    onChange={setPassword}
                ></InputBox>
            </div>
        </div>
    )
}