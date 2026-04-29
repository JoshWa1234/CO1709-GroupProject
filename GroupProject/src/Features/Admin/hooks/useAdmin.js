import { useState, useEffect } from "react";
import {getUsers, deleteUser, getSessions, deleteSession, getUserTypes} from "@/services/admin.api.js";
import {updateUser} from "@/services/admin.api.js"

export default function useAdmin() {
    const [users, setUsers] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({ username: '', email: '', user_type_id: 2 });
    const [userTypes, setUserTypes] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [usersData, sessionsData,userTypes] = await Promise.all([
                getUsers(),
                getSessions(),
                getUserTypes()
            ]);
            setUsers(usersData);
            setSessions(sessionsData);
            setUserTypes(userTypes);
        } catch (err) {
            setError('Failed to load admin data');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        await deleteUser(userId);
        setUsers(prev => prev.filter(u => u.id !== userId));
    };

    const handleDeleteSession = async (sessionId) => {
        await deleteSession(sessionId);
        setSessions(prev => prev.filter(s => s.id !== sessionId));
    };
    const [userSearch, setUserSearch] = useState('');
    const [sessionSearch, setSessionSearch] = useState('');

    const filteredUsers = users.filter(u =>
        u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.id.toLowerCase().includes(userSearch.toLowerCase())
    );

    const filteredSessions = sessions.filter(s =>
        s.user_id.toLowerCase().includes(sessionSearch.toLowerCase()) ||
        s.id.toLowerCase().includes(sessionSearch.toLowerCase())
    );
    const handleEditOpen = (user) => {
        setEditingUser(user);
        setEditForm({ username: user.username, email: user.email, user_type_id: user.user_type_id });
    };

    const handleEditClose = () => {
        setEditingUser(null);
    };

    const handleEditSave = async () => {
        await updateUser(editingUser.id, editForm);
        setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...editForm } : u));
        setEditingUser(null);
    };

    return {
        users, sessions, loading, error,
        handleDeleteUser, handleDeleteSession,
        userSearch, setUserSearch,
        sessionSearch, setSessionSearch,
        filteredUsers, filteredSessions,
        editingUser, editForm, setEditForm,
        handleEditOpen, handleEditClose, handleEditSave
    };




}