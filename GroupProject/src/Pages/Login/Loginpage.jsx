import LoginForm from '@/Features/auth/components/LoginForm/LoginForm'
import styles from './Loginpage.module.css'

export default function LoginPage() {
    return(
        <>
            <div className={styles['login-form-wrapper']}>
                <div style={{}}>
                    <LoginForm/>
                </div>
            </div>
        </>
    )
}