import { api } from "./api.js";

export async function loginUser(email, password) {
    return await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export async function signUpUser(email, password) {
    return await api("/auth/sign_up", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });
}

export async function logoutUser() {
    return await api("/auth/logout", { method: "POST" });
}

export async function resetPassword(id, currentPassword, newPassword) {
    return await api(`/auth/resetPassword/${id}`, {
        method: "PUT",
        body: JSON.stringify({ currentPassword, newPassword })
    });
}