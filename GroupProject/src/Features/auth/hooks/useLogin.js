import { useState } from "react";
import {loginUser} from "@/services/auth.api.js";
import { useAuth } from "@/context/AuthContext.jsx";

export default function useLoginForm() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('');
    const {login} = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await loginUser(email, password);
            if (data.errorMessage) {
                setError(data.errorMessage);
            }
            else {
                console.log('user',data.user);
                login(data.user);

            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return {
        email,
        setEmail,
        password,
        setPassword,
        loading,
        error,
        handleSubmit
    }
}