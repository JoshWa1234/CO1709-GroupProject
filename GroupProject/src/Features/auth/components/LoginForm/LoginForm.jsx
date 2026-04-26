import {useState} from "react";
import InputBox from "@/ui Components/InputBox/InputBox.jsx";
import styles from "./LoginForm.module.css";
import globalStyles from "@/styles/global.module.css"
import useLoginForm from "@/Features/auth/hooks/useLogin.js";
import ErrorMessage from "@/ui Components/ErrorMessage/ErrorMessage.jsx";

export default function LoginForm(){

    const { email, setEmail, password, setPassword, loading, error, user,handleSubmit } = useLoginForm();
    console.log(user);
    return(
        <div className={styles["login-form"]}>
            <div className={styles["header"]}>
                <span className={globalStyles['form-title']} >
                    Login
                </span>

            </div>
                <InputBox
                    tag={'EmailInput'}
                    type={'email'}
                    label={'Email:'}
                    placeholder={'john.doe@gmail.com'}
                    validation={'email'}
                    value={email}
                    onChange={setEmail}
                ></InputBox>
                <InputBox
                    tag={'PasswordInput'}
                    type={'password'}
                    label={'Password:'}
                    placeholder={'************'}
                    validation={'password'}
                    value={password}
                    onChange={setPassword}
                ></InputBox>
                <span>
                    <a >
                         Forgotten Password?
                    </a>
                </span>
            <div>
                {error && <ErrorMessage message={error}/>}
            </div>
            <div>
                <button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </div>
        </div>
    )
}