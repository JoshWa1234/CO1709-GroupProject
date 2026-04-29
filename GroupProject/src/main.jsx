// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import '@/styles/global.module.css';
import {AuthProvider} from "@/context/AuthContext.jsx";
import {AccessibilityProvider} from "@/context/AccessibilityContext.jsx"

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <AccessibilityProvider>
                    <App />
                </AccessibilityProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);
