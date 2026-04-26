import { useState } from "react";
import { signUpUser } from "@/api/auth.api.js";

export default function useSignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

    async function handleSubmit() {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError('');
        setLoading(true);

        try {
            const data = await signUpUser(email, password);
            setUser(data.user);
        } catch (err) {
            setError(err.message); // ✅ err.message, not err itself
        } finally {
            setLoading(false);
        }
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        loading,
        error,
        user,
        handleSubmit
    }
}