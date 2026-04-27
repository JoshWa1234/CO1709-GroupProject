
import InputBox from "@/ui Components/InputBox/InputBox.jsx";
import styles from "./SignUpForm.module.css";
import globalStyles from "@/styles/global.module.css"
import ErrorMessage from "@/ui Components/ErrorMessage/ErrorMessage.jsx";
import useSignUp from "@/Features/auth/hooks/useSignUp.js";

export default function SignUpForm(){

    const { email,
            setEmail,
            password,
            setPassword,
            loading,
            error,
            confirmPassword,
            setConfirmPassword,
            handleSubmit } = useSignUp();
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

                <InputBox
                    tag={'PasswordInput'}
                    type={'password'}
                    label={'Password Confirmation:'}
                    placeholder={'************'}
                    validation={'password'}
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                ></InputBox>
            <div>
                {error && <ErrorMessage message={error}/>}
            </div>
            <div>
                <button onClick={handleSubmit} disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </div>
        </div>
    )
}