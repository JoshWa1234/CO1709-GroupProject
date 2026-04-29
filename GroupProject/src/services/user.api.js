const API_URL = "/api";

async function api(endpoint, options = {}) {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.errorMessage || "Something went wrong");
    }

    return data;
}
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