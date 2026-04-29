import { api } from "./api.js";

export async function getUsers() {
    return await api('/admin/users', { method: 'GET' });
}

export async function deleteUser(userId) {
    return await api(`/admin/users/${userId}`, { method: 'DELETE' });
}

export async function getSessions() {
    return await api('/admin/sessions', { method: 'GET' });
}

export async function deleteSession(sessionId) {
    return await api(`/admin/sessions/${sessionId}`, { method: 'DELETE' });
}

export async function updateUser(userId, data) {
    return await api(`/admin/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(data)
    });
}

export async function getUserTypes() {
    return await api('/admin/user-types', { method: 'GET' });
}