import { useState } from "react";
import { signUpUser } from "@/services/auth.api.js";
import { useAuth } from "@/context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function useSignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit() {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError('');
        setLoading(true);

        try {
            const data = await signUpUser(email, password);
            if (data.errorMessage) {
                setError(data.errorMessage);
            } else {
                login(data.user);
                navigate('/');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return {
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        loading, error,
        handleSubmit
    }
}