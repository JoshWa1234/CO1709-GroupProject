import LoginForm from '@/Features/auth/components/LoginForm/LoginForm'
import SignUpForm from "@/Features/auth/components/SignUpForm/SignUpForm.jsx";
import styles from './Loginpage.module.css'
import {useState} from "react";

export default function LoginPage() {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <div className={styles['login-form-wrapper']}>
            {isSignUp ? <SignUpForm /> : <LoginForm />}
            <button onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </button>
        </div>
    );
}