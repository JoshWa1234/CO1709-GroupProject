import { useState } from "react";
import {loginUser} from "@/services/auth.api.js";

export default function useLoginForm() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('');
    const [user, setUser] = useState(null);

    async function handleSubmit(e) {
        console.log('handle submit hit');
        e.preventDefault();


        try{
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000))
                setError("Invalid credentials"); // always fails for now
        }
        catch (err){
            setError(err);
        }
        finally {
            setLoading(false);
        }


        setError('');
        setLoading(true);

        try {
            const data = await loginUser(email, password);
            setUser(data.user);
            if (data.errorMessage) {
                setError(data.errorMessage);
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
        user,
        handleSubmit
    }
}