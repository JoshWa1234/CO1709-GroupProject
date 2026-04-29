import { useState } from "react";
import { resetPassword } from "@/services/auth.api.js";
import { useAuth } from "@/context/AuthContext.jsx";

export default function useResetPassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleResetPassword = async () => {
        setError('');
        setSuccess(false);

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }

        setLoading(true);
        try {
            await resetPassword(user.id, currentPassword, newPassword);
            setSuccess(true);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError('Failed to reset password.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        currentPassword, setCurrentPassword,
        newPassword, setNewPassword,
        confirmPassword, setConfirmPassword,
        error,
        success,
        loading,
        handleResetPassword
    };
}