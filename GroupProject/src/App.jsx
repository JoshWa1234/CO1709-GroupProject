// src/App.jsx
import Navbar from './ui Components/Navbar/Navbar.jsx';
import Footer from './ui Components/Footer/Footer.jsx';
import HomePage from './Pages/HomePage/Homepage.jsx';
import LoginPage from './Pages/Login/Loginpage.jsx';
import './App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <>
            <Navbar />
            <main className="page-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
