import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";
import useAdmin from "@/Features/Admin/hooks/useAdmin.js";
import styles from "./AdminPage.module.css";
import UserEditModal from "@/Features/Admin/components/UserEditModal/UserEditModal.jsx"

export default function AdminPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const {
        loading, error,
        handleDeleteUser, handleDeleteSession,
        userSearch, setUserSearch,
        sessionSearch, setSessionSearch,
        filteredUsers, filteredSessions,
        editingUser, editForm, setEditForm,
        handleEditOpen, handleEditClose, handleEditSave,
        userTypes = []
    } = useAdmin();

    useEffect(() => {
        if (!user || user.user_type_id !== 1) navigate('/');
    }, [user]);

    if (!user) return null;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Admin Panel</h1>

            {/* Users Table */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Users ({filteredUsers.length})</h2>
                <input
                    className={styles.search}
                    placeholder="Search by username, email or ID..."
                    value={userSearch}
                    onChange={e => setUserSearch(e.target.value)}
                />
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Type</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredUsers.map(u => (
                            <tr key={u.id}>
                                <td className={styles.idCell}>{u.id}</td>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td>{userTypes.find(t => t.id === u.user_type_id)?.name ?? 'Unknown'}</td>
                                <td>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}</td>
                                <td>
                                    <div className={styles.actionButtons}>
                                        <button
                                            className={styles.editButton}
                                            onClick={() => handleEditOpen(u)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={() => handleDeleteUser(u.id)}
                                            disabled={u.user_type_id === 1}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Sessions Table */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Active Sessions ({filteredSessions.length})</h2>
                <input
                    className={styles.search}
                    placeholder="Search by session ID or user ID..."
                    value={sessionSearch}
                    onChange={e => setSessionSearch(e.target.value)}
                />
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Session ID</th>
                            <th>User ID</th>
                            <th>Created</th>
                            <th>Expires</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredSessions.map(s => (
                            <tr key={s.id}>
                                <td className={styles.idCell}>{s.id}</td>
                                <td className={styles.idCell}>{s.user_id}</td>
                                <td>{s.created_at ? new Date(s.created_at).toLocaleDateString() : '—'}</td>
                                <td>{s.expires_at ? new Date(s.expires_at).toLocaleDateString() : '—'}</td>
                                <td>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={() => handleDeleteSession(s.id)}
                                    >
                                        Revoke
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <UserEditModal
                user={editingUser}
                editForm={editForm}
                setEditForm={setEditForm}
                onSave={handleEditSave}
                onClose={handleEditClose}
                userTypes={userTypes}
            />
        </div>
    );
}
