import { createContext, useContext, useState } from "react";
import {logoutUser} from "@/services/auth.api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const login = (userData) => setUser(userData);
    const logout = async () => {
        await logoutUser();  // clears cookie server-side
        setUser(null);       // clears React state
    };
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}