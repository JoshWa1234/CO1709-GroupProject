import styles from "./ResetPasswordForm.module.css";
import InputBox from "@/ui Components/InputBox/InputBox.jsx";
import useResetPassword from "@/Features/auth/hooks/useResetPassword.js";

export default function ResetPasswordForm() {
    const {
        currentPassword, setCurrentPassword,
        newPassword, setNewPassword,
        confirmPassword, setConfirmPassword,
        error,
        success,
        loading,
        handleResetPassword
    } = useResetPassword();

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Reset Password</h2>

            <div className={styles.fields}>
                <InputBox
                    tag="currentPassword"
                    type="password"
                    label="Current Password"
                    validation="none"
                    value={currentPassword}
                    onChange={setCurrentPassword}
                />
                <InputBox
                    tag="newPassword"
                    type="password"
                    label="New Password"
                    validation="none"
                    value={newPassword}
                    onChange={setNewPassword}
                />
                <InputBox
                    tag="confirmPassword"
                    type="password"
                    label="Confirm New Password"
                    validation="none"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                />
            </div>

            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>Password updated successfully!</p>}

            <button
                className={styles.button}
                onClick={handleResetPassword}
                disabled={loading}
            >
                {loading ? 'Saving...' : 'Update Password'}
            </button>
        </div>
    );
}