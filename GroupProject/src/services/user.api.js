import { api } from "./api.js";

export async function userProfile(id) {
    return await api(("/user/userProfile/"+ id), {
        method: "GET"
    });
}
export async function updateProfile(id, displayName) {
    return await api(`/user/userProfile/${id}`, {
        method: "PUT",
        body: JSON.stringify({ displayName })
    });
}