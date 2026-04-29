// src/context/AccessibilityContext.jsx
import { createContext, useContext, useState } from "react";

const AccessibilityContext = createContext(null);

const STORAGE_KEY = "accessibility_settings";

export function AccessibilityProvider({ children }) {
    const [darkMode, setDarkMode] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored).darkMode : false;
        } catch { return false; }
    });

    const [fontSize, setFontSize] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored).fontSize : 'normal';
        } catch { return 'normal'; }
    });

    const [caretBrowsing, setCaretBrowsing] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored).caretBrowsing : false;
        } catch { return false; }
    });

    const updateSetting = (key, value) => {
        const updates = { darkMode, fontSize, caretBrowsing, [key]: value };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updates));
        if (key === 'darkMode') setDarkMode(value);
        if (key === 'fontSize') setFontSize(value);
        if (key === 'caretBrowsing') setCaretBrowsing(value);
    };

    return (
        <AccessibilityContext.Provider value={{ darkMode, fontSize, caretBrowsing, updateSetting }}>
            {children}
        </AccessibilityContext.Provider>
    );
}

export function useAccessibility() {
    return useContext(AccessibilityContext);
}