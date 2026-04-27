// src/App.jsx
import Navbar from './ui Components/Navbar/Navbar.jsx';
import Footer from './ui Components/Footer/Footer.jsx';
import HomePage from './Pages/HomePage/Homepage.jsx';
import LoginPage from './Pages/Login/Loginpage.jsx';
import Leaderboard from './Pages/Leaderboard/Leaderboard.jsx';
import ChallengesPage from './Pages/Challenges/ChallengesPage.jsx';
import ChallengeSubmissionPage from './Pages/ChallengeSubmission/ChallengeSubmissionPage.jsx';
import ChallengeMasterPage from './Pages/ChallengeMaster/ChallengeMasterPage.jsx';
import HistoryPage from './Pages/History/HistoryPage.jsx';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProfilePage from "@/Pages/ProfilePage/ProfilePage.jsx";
import {useAccessibility} from "@/context/AccessibilityContext.jsx"
import {useAuth} from "@/context/AuthContext.jsx";

function App() {
    const { darkMode, fontSize } = useAccessibility();
    return (
        <div data-theme={darkMode ? 'dark' : 'light'} data-fontsize={fontSize}>
            <Navbar />
            <main className="page-content" >
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/challenges" element={<ChallengesPage />} />
                    <Route path="/challenge-master/new" element={<ChallengeSubmissionPage />} />
                    <Route path="/challenge-master" element={<ChallengeMasterPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
export default App;