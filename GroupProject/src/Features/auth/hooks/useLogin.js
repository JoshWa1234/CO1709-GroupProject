import {useState} from "react";
import {loginUserIn} from '@/api/auth.api'
import {createCookie} from "react-router-dom";

export default function useLogin(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginUser = async (email,password) => {
        setLoading(true);
        setError(null);

        try {
            const data = await loginUserIn(email, password);

            // store auth tokenauth
            createCookie("tokenAuth", token);

            // redirect after login
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return {
        loginUser,
        loading,
        error
};
};
