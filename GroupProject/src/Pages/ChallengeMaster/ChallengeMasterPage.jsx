import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { activeChallenges, historyItems } from "@/data/TestData";


export default function ChallengeMasterPage() {
    const navigate = useNavigate();

    const getStoredChallenges = () => {
      const stored = localStorage.getItem("activeChallenges");

    if (stored) {
        return JSON.parse(stored);
    }

    return activeChallenges.filter(
        (challenge) => challenge.status === "In Progress"
    );
};

const [retireMode, setRetireMode] = useState(false);
const [inProgressChallenges, setInProgressChallenges] = useState(getStoredChallenges);

    const handleRetireChallenge = (challengeId) => {
    const challengeToRetire = inProgressChallenges.find(
        (challenge) => challenge.id === challengeId
    );

    if (!challengeToRetire) return;

    const confirmed = window.confirm(
        `Are you sure you want to retire "${challengeToRetire.title}" early?`
    );

    if (!confirmed) return;

    const updatedChallenges = inProgressChallenges.filter(
        (challenge) => challenge.id !== challengeId
    );

    const storedHistory = localStorage.getItem("challengeHistory");
    const existingHistory = storedHistory ? JSON.parse(storedHistory) : historyItems;

    const retiredHistoryItem = {
        id: Date.now(),
        title: challengeToRetire.title,
        date: new Date().toISOString().split("T")[0],
        month: new Date().toLocaleString("default", { month: "long" }),
        status: "Cancelled by Challenge Master",
        points: 0,
    };

    const updatedHistory = [retiredHistoryItem, ...existingHistory];

    setInProgressChallenges(updatedChallenges);
    localStorage.setItem("activeChallenges", JSON.stringify(updatedChallenges));
    localStorage.setItem("challengeHistory", JSON.stringify(updatedHistory));
};

    return (
        <div style={pageStyle}>
            <div style={panelStyle}>
                <div style={topAreaStyle}>
                    <button style={titleButtonStyle}>Challenge Master</button>
                    <div style={profileIconStyle}>👤</div>
                </div>

                <div style={buttonGridStyle}>
                    <button
                        style={menuButtonStyle}
                        onClick={() => navigate("/challenge-master/new")}
                    >
                        Push New Challenge!
                    </button>

                    <button
                        style={menuButtonStyle}
                        onClick={() => navigate("/history")}
                    >
                        History
                    </button>

                    <button
                        style={menuButtonStyle}
                        onClick={() => setRetireMode((prev) => !prev)}
                    >
                        {retireMode ? "Cancel Retire Mode" : "Retire a Challenge Early"}
                    </button>

                    <button
                        style={wideButtonStyle}
                        onClick={() => navigate("/leaderboard")}
                    >
                        Leaderboard
                    </button>
                </div>

                <div style={taskListStyle}>
                    <h2 style={sectionHeadingStyle}>In Progress</h2>

                    {inProgressChallenges.length === 0 ? (
                        <p style={emptyTextStyle}>No active challenges.</p>
                    ) : (
                        inProgressChallenges.map((challenge) => (
                            <div key={challenge.id} style={taskRowStyle}>
                                <span>{challenge.title}</span>

                                <div style={taskRightStyle}>
                                    <span>⭐ {challenge.points}</span>

                                    {retireMode && (
                                        <button
                                            style={retireButtonStyle}
                                            onClick={() => handleRetireChallenge(challenge.id)}
                                        >
                                            Retire
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

const pageStyle = {
    padding: "2rem",
    background: "#e8f7fd",
    minHeight: "100vh",
};

const panelStyle = {
    maxWidth: "520px",
    margin: "0 auto",
    background: "#ffffff",
    border: "1px solid #b9ddea",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
};

const topAreaStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
};

const titleButtonStyle = {
    background: "#bdf2ff",
    border: "1px solid #55b8d9",
    borderRadius: "8px",
    padding: "0.8rem 1.4rem",
    fontWeight: "bold",
    color: "#1f3b57",
};

const profileIconStyle = {
    width: "58px",
    height: "58px",
    border: "2px solid #1f3b57",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.8rem",
};

const buttonGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "0.8rem",
    marginBottom: "1.5rem",
};

const menuButtonStyle = {
    background: "#eefaff",
    border: "1px solid #9ed8e8",
    borderRadius: "8px",
    padding: "0.9rem",
    minHeight: "64px",
    cursor: "pointer",
};

const wideButtonStyle = {
    gridColumn: "1 / 4",
    background: "#eefaff",
    border: "1px solid #9ed8e8",
    borderRadius: "8px",
    padding: "0.9rem",
    cursor: "pointer",
};

const taskListStyle = {
    marginTop: "1rem",
};

const sectionHeadingStyle = {
    color: "#1f3b57",
    marginBottom: "0.8rem",
};

const taskRowStyle = {
    background: "#bdf2ff",
    border: "1px solid #55b8d9",
    borderRadius: "8px",
    padding: "0.6rem 0.8rem",
    marginBottom: "0.6rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const taskRightStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.8rem",
};

const retireButtonStyle = {
    background: "#ffffff",
    border: "2px solid #d93025",
    color: "#d93025",
    borderRadius: "6px",
    padding: "0.35rem 0.7rem",
    cursor: "pointer",
    fontWeight: "bold",
};

const emptyTextStyle = {
    color: "#4f6b7a",
};