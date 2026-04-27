import { useState, useEffect } from "react";
import { userProfile } from "@/services/user.api.js";
import {useAuth} from "@/context/AuthContext.jsx";

export default function useUserProfile() {
    const [displayName,setDisplayName]=useState('');
    const [email,setEmail]=useState('');
    const [badgeList,setBadgeList]=useState([]);
    const [pointsLogHistory,setPointsLogHistory]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState('');
    const { user } = useAuth()

    useEffect(() => {
        if (!user) return; // ← guard against null user

        async function fetchProfile() {
            setError('');
            setLoading(true);
            try {
                const data = await userProfile(user.id);
                setDisplayName(data.displayName);
                setEmail(data.email);
                setBadgeList(data.badgeList);
                setPointsLogHistory(data.pointsLogHistory);
            } catch (err) {
                setError('Failed to load profile.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [user]); // re-runs when user changes


    return {
        displayName,
        setDisplayName,
        email,
        setEmail,
        loading,
        error,
        badgeList,
        setBadgeList,
        pointsLogHistory,
        setPointsLogHistory,
        user
    }
}