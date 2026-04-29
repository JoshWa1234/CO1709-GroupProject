import styles from "./UserEditModal.module.css";

export default function UserEditModal({ user, editForm, setEditForm, onSave, onClose,userTypes }) {
    if (!user) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <h2 className={styles.title}>Edit User</h2>
                <p className={styles.subtitle}>{user.id}</p>

                <div className={styles.fields}>
                    <div className={styles.field}>
                        <label>Username</label>
                        <input
                            className={styles.input}
                            value={editForm.username}
                            onChange={e => setEditForm({ ...editForm, username: e.target.value })}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>Email</label>
                        <input
                            className={styles.input}
                            value={editForm.email}
                            onChange={e => setEditForm({ ...editForm, email: e.target.value })}
                        />
                    </div>
                    <div className={styles.field}>
                        <label>User Type</label>
                        <select
                            className={styles.input}
                            value={editForm.user_type_id}
                            onChange={e => setEditForm({ ...editForm, user_type_id: parseInt(e.target.value) })}
                        >
                            {userTypes.map(t => (
                                <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.buttons}>
                    <button className={styles.saveButton} onClick={onSave}>Save</button>
                    <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}