import { useState, useEffect } from "react";
import { userProfile, updateProfile } from "@/services/user.api.js";
import { useAuth } from "@/context/AuthContext.jsx";

export default function useUserProfile() {
    const [displayName, setDisplayName] = useState('');
    const [tempDisplayName, setTempDisplayName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState('');
    const [badgeList, setBadgeList] = useState([]);
    const [pointsLogHistory, setPointsLogHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        async function fetchProfile() {
            setError('');
            setLoading(true);
            try {
                const data = await userProfile(user.id);
                setDisplayName(data.displayName);
                setTempDisplayName(data.displayName);
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
    }, [user]);

    const handleEdit = () => {
        setTempDisplayName(displayName);
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            await updateProfile(user.id, tempDisplayName);
            setDisplayName(tempDisplayName);
            setIsEditing(false);
        } catch (err) {
            setError('Failed to update profile.');
            console.error(err);
        }
    };

    const handleCancel = () => {
        setTempDisplayName(displayName);
        setIsEditing(false);
    };

    return {
        displayName,
        tempDisplayName,
        setTempDisplayName,
        isEditing,
        handleEdit,
        handleSave,
        handleCancel,
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