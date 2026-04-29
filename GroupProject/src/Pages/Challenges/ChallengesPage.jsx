import { useState } from "react";
import { activeChallenges, currentUser } from "@/data/TestData";

export default function ChallengesPage() {
    const getStoredChallenges = () => {
    const stored = localStorage.getItem("activeChallenges");

    if (stored) {
        return JSON.parse(stored);
    }

    return activeChallenges;
};

const [challenges, setChallenges] = useState(getStoredChallenges);

    const handleProgress = (id) => {
    setChallenges((prev) => {
        const updatedChallenges = prev.map((challenge) => {
            if (challenge.id !== id || challenge.status === "Completed") {
                return challenge;
            }

            const newProgress = Math.min(
                challenge.progress + Math.ceil(challenge.target / 5),
                challenge.target
            );

            return {
                ...challenge,
                progress: newProgress,
                status: newProgress >= challenge.target ? "Completed" : "In Progress",
            };
        });

        localStorage.setItem("activeChallenges", JSON.stringify(updatedChallenges));

        return updatedChallenges;
    });
};

    const dailyChallenges = challenges.filter(
        (challenge) => challenge.frequency === "Daily"
    );

    const weeklyChallenges = challenges.filter(
        (challenge) => challenge.frequency === "Weekly"
    );

    const monthlyChallenges = challenges.filter(
        (challenge) => challenge.frequency === "Monthly"
    );

    return (
        <div style={pageStyle}>
            <div style={pointsBadgeStyle}>
                <span>⭐</span>
                <span>{currentUser.points}</span>
            </div>

            <h1 style={headingStyle}>My Challenges</h1>
            <p style={subTextStyle}>
                Track your daily, weekly, and monthly wellbeing challenges.
            </p>

            <ChallengeSection
                title="Daily Challenges"
                challenges={dailyChallenges}
                onProgress={handleProgress}
            />

            <ChallengeSection
                title="Weekly Challenges"
                challenges={weeklyChallenges}
                onProgress={handleProgress}
            />

            <ChallengeSection
                title="Monthly Challenges"
                challenges={monthlyChallenges}
                onProgress={handleProgress}
            />
        </div>
    );
}

function ChallengeSection({ title, challenges, onProgress }) {
    return (
        <section style={sectionStyle}>
            <h2 style={sectionHeadingStyle}>{title}</h2>

            {challenges.length === 0 ? (
                <p style={emptyTextStyle}>No challenges available.</p>
            ) : (
                <div style={gridStyle}>
                    {challenges.map((challenge) => (
                        <ChallengeCard
                            key={challenge.id}
                            challenge={challenge}
                            onProgress={onProgress}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

function ChallengeCard({ challenge, onProgress }) {
    const percent = Math.round((challenge.progress / challenge.target) * 100);

    return (
        <div style={cardStyle}>
            <div style={topRowStyle}>
                <h3 style={cardTitleStyle}>{challenge.title}</h3>
                <span style={pointsStyle}>⭐ {challenge.points}</span>
            </div>

            <p style={descriptionStyle}>{challenge.description}</p>

            <p style={statusStyle}>Status: {challenge.status}</p>
            <p style={progressTextStyle}>
                Progress: {challenge.progress} / {challenge.target}
            </p>

            <div style={progressBarOuterStyle}>
                <div
                    style={{
                        ...progressBarInnerStyle,
                        width: `${percent}%`,
                    }}
                />
            </div>

            <p style={dateStyle}>Due: {challenge.dueDate}</p>

            <button
                style={{
                    ...buttonStyle,
                    opacity: challenge.status === "Completed" ? 0.7 : 1,
                    cursor: challenge.status === "Completed" ? "not-allowed" : "pointer",
                }}
                onClick={() => onProgress(challenge.id)}
                disabled={challenge.status === "Completed"}
            >
                {challenge.status === "Completed" ? "Completed" : "Update Progress"}
            </button>
        </div>
    );
}

const pageStyle = {
    padding: "2rem",
    background: "#e8f7fd",
    minHeight: "100vh",
};

const pointsBadgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "#bdf2ff",
    border: "1px solid #55b8d9",
    borderRadius: "10px",
    padding: "0.4rem 1rem",
    fontWeight: "bold",
    color: "#1f3b57",
    marginBottom: "1rem",
};

const headingStyle = {
    marginBottom: "0.5rem",
    color: "#1f3b57",
};

const subTextStyle = {
    marginBottom: "1.5rem",
    color: "#4f6b7a",
};

const sectionStyle = {
    background: "#ffffff",
    border: "1px solid #b9ddea",
    borderRadius: "12px",
    padding: "1rem",
    marginBottom: "1.5rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
};

const sectionHeadingStyle = {
    marginTop: 0,
    color: "#1f3b57",
};

const emptyTextStyle = {
    color: "#4f6b7a",
};

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1rem",
};

const cardStyle = {
    background: "#bdf2ff",
    border: "1px solid #80d4e8",
    borderRadius: "10px",
    padding: "1rem",
};

const topRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
};

const cardTitleStyle = {
    margin: 0,
    color: "#1f3b57",
};

const pointsStyle = {
    fontWeight: "bold",
    color: "#ff8a00",
};

const descriptionStyle = {
    color: "#2f5973",
};

const statusStyle = {
    fontWeight: "bold",
    color: "#1f3b57",
};

const progressTextStyle = {
    marginBottom: "0.5rem",
};

const progressBarOuterStyle = {
    height: "10px",
    background: "#d7eef7",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "0.8rem",
};

const progressBarInnerStyle = {
    height: "100%",
    background: "#55b8d9",
    borderRadius: "999px",
};

const dateStyle = {
    fontSize: "0.9rem",
    color: "#4f6b7a",
};

const buttonStyle = {
    background: "#ff8a00",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "0.7rem 1rem",
};