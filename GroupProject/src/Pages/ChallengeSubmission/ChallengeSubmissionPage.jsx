import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { activeChallenges } from "@/data/TestData";

export default function ChallengeSubmissionPage() {
    const navigate = useNavigate();

    const [challengeName, setChallengeName] = useState("");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState("");
    const [target, setTarget] = useState("");
    const [activeUntil, setActiveUntil] = useState("");
    const [repeating, setRepeating] = useState("Weekly");
    const [assignedTo, setAssignedTo] = useState("All users");

    const handlePushChallenge = (event) => {
        event.preventDefault();

        if (!challengeName.trim() || !points || !target || !activeUntil) {
            alert("Please complete the challenge name, reward points, target and active until date.");
            return;
        }

        const storedChallenges = localStorage.getItem("activeChallenges");
        const existingChallenges = storedChallenges
            ? JSON.parse(storedChallenges)
            : activeChallenges.filter((challenge) => challenge.status === "In Progress");

        const newChallenge = {
            id: Date.now(),
            title: challengeName,
            description: description || "No description provided.",
            points: Number(points),
            progress: 0,
            target: Number(target),
            status: "In Progress",
            frequency: repeating === "Never" ? "Daily" : repeating,
            dueDate: activeUntil,
            assignedTo,
        };

        const updatedChallenges = [newChallenge, ...existingChallenges];

        localStorage.setItem("activeChallenges", JSON.stringify(updatedChallenges));

        alert("Challenge pushed successfully!");
        navigate("/challenge-master");
    };

    return (
        <div style={pageStyle}>
            <div style={panelStyle}>
                <div style={topAreaStyle}>
                    <button style={titleButtonStyle}>Challenge Master</button>
                    <div style={profileIconStyle}>👤</div>
                </div>

                <form style={formStyle} onSubmit={handlePushChallenge}>
                    <label style={labelStyle}>Challenge Name</label>
                    <input
                        style={inputStyle}
                        value={challengeName}
                        onChange={(event) => setChallengeName(event.target.value)}
                        placeholder="Enter challenge name"
                    />

                    <label style={labelStyle}>Challenge Description</label>
                    <textarea
                        style={textAreaStyle}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Enter challenge description"
                    />

                    <label style={labelStyle}>Reward on Completion</label>
                    <input
                        style={inputStyle}
                        type="number"
                        value={points}
                        onChange={(event) => setPoints(event.target.value)}
                        placeholder="Enter points"
                    />

                    <label style={labelStyle}>Target</label>
                    <input
                        style={inputStyle}
                        type="number"
                        value={target}
                        onChange={(event) => setTarget(event.target.value)}
                        placeholder="Example: 5, 10, 5000"
                    />

                    <label style={labelStyle}>Active Until</label>
                    <input
                        style={inputStyle}
                        type="date"
                        value={activeUntil}
                        onChange={(event) => setActiveUntil(event.target.value)}
                    />

                    <div style={optionsLayoutStyle}>
                        <div style={optionBoxStyle}>
                            <h3 style={boxHeadingStyle}>Repeating</h3>

                            {["Never", "Daily", "Weekly", "Monthly"].map((option) => (
                                <label key={option} style={radioLabelStyle}>
                                    <input
                                        type="radio"
                                        name="repeating"
                                        value={option}
                                        checked={repeating === option}
                                        onChange={(event) => setRepeating(event.target.value)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>

                        <div style={optionBoxStyle}>
                            <h3 style={boxHeadingStyle}>Assign To</h3>

                            {["All users", "Staff", "Team Leader"].map((option) => (
                                <label key={option} style={radioLabelStyle}>
                                    <input
                                        type="radio"
                                        name="assignedTo"
                                        value={option}
                                        checked={assignedTo === option}
                                        onChange={(event) => setAssignedTo(event.target.value)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={buttonRowStyle}>
                        <button style={pushButtonStyle} type="submit">
                            Push Challenge!
                        </button>

                        <button
                            style={cancelButtonStyle}
                            type="button"
                            onClick={() => navigate("/challenge-master")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
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
    maxWidth: "620px",
    margin: "0 auto",
    background: "#bdf2ff",
    border: "1px solid #55b8d9",
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
    background: "#dff8ff",
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
    background: "#ffffff",
};

const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
};

const labelStyle = {
    fontWeight: "bold",
    color: "#1f3b57",
};

const inputStyle = {
    padding: "0.7rem",
    borderRadius: "8px",
    border: "1px solid #9ed8e8",
};

const textAreaStyle = {
    padding: "0.7rem",
    borderRadius: "8px",
    border: "1px solid #9ed8e8",
    minHeight: "80px",
    resize: "vertical",
};

const optionsLayoutStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    marginTop: "0.8rem",
};

const optionBoxStyle = {
    background: "#ffffff",
    border: "1px solid #9ed8e8",
    borderRadius: "10px",
    padding: "1rem",
};

const boxHeadingStyle = {
    marginTop: 0,
    marginBottom: "0.6rem",
    color: "#1f3b57",
};

const radioLabelStyle = {
    display: "block",
    marginBottom: "0.4rem",
    color: "#1f3b57",
};

const buttonRowStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1rem",
};

const pushButtonStyle = {
    background: "#ff8a00",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "0.8rem 1.2rem",
    cursor: "pointer",
    fontWeight: "bold",
};

const cancelButtonStyle = {
    background: "#ffffff",
    color: "#1f3b57",
    border: "1px solid #9ed8e8",
    borderRadius: "8px",
    padding: "0.8rem 1.2rem",
    cursor: "pointer",
};