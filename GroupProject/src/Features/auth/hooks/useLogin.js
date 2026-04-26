import { useState } from "react";

export default function useLoginForm() {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('');

    async function handleSubmit(e) {
        console.log('handle submit hit');
        e.preventDefault();

        // fake API call here
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