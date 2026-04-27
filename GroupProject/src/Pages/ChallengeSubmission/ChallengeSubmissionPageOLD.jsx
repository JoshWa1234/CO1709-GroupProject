import { useState } from "react";
import { challengeTemplates } from "@/data/TestData";

export default function ChallengeSubmissionPage() {
  const [challengeName, setChallengeName] = useState("");
  const [reward, setReward] = useState("");
  const [assignedTo, setAssignedTo] = useState("Staff");
  const [recurrence, setRecurrence] = useState("Weekly");
  const [savedChallenges, setSavedChallenges] = useState(challengeTemplates);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!challengeName.trim() || !reward.trim()) return;

    const newChallenge = {
      id: Date.now(),
      title: challengeName,
      reward: Number(reward),
      assignedTo,
      recurrence,
    };

    setSavedChallenges((prev) => [newChallenge, ...prev]);
    setChallengeName("");
    setReward("");
    setAssignedTo("Staff");
    setRecurrence("Weekly");
  };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Push New Challenge</h1>
      <p style={subTextStyle}>Create and assign new challenges to your workplace!</p>

      <div style={layoutStyle}>
        <form style={formStyle} onSubmit={handleSubmit}>
          <label style={labelStyle}>Challenge Name</label>
          <input
            style={inputStyle}
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)}
            placeholder="Enter challenge name"
          />

          <label style={labelStyle}>Reward Points</label>
          <input
            style={inputStyle}
            type="number"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            placeholder="Enter points"
          />

          <label style={labelStyle}>Assign To</label>
          <select
            style={inputStyle}
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option>Staff</option>
            <option>Team Leader</option>
            <option>All Users</option>
          </select>

          <label style={labelStyle}>Recurrence</label>
          <select
            style={inputStyle}
            value={recurrence}
            onChange={(e) => setRecurrence(e.target.value)}
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>

          <button style={buttonStyle} type="submit">
            Save Challenge
          </button>
        </form>

        <div style={listStyle}>
          <h2 style={{ marginTop: 0 }}>Saved Challenges</h2>

          {savedChallenges.map((challenge) => (
            <div key={challenge.id} style={challengeCardStyle}>
              <strong>{challenge.title}</strong>
              <p style={smallTextStyle}>Reward: ⭐ {challenge.reward}</p>
              <p style={smallTextStyle}>Assign To: {challenge.assignedTo}</p>
              <p style={smallTextStyle}>Repeats: {challenge.recurrence}</p>
            </div>
          ))}
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

const headingStyle = {
  marginBottom: "0.5rem",
  color: "#1f3b57",
};

const subTextStyle = {
  marginBottom: "1.5rem",
  color: "#4f6b7a",
};

const layoutStyle = {
  display: "grid",
  gridTemplateColumns: "minmax(280px, 380px) 1fr",
  gap: "1rem",
};

const formStyle = {
  background: "#ffffff",
  border: "1px solid #b9ddea",
  borderRadius: "12px",
  padding: "1rem",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
};

const labelStyle = {
  display: "block",
  marginBottom: "0.4rem",
  marginTop: "0.8rem",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "0.7rem",
  borderRadius: "8px",
  border: "1px solid #b9ddea",
  boxSizing: "border-box",
};

const buttonStyle = {
  marginTop: "1rem",
  background: "#ff8a00",
  color: "white",
  border: "none",
  borderRadius: "8px",
  padding: "0.8rem 1rem",
  cursor: "pointer",
  width: "100%",
};

const listStyle = {
  background: "#ffffff",
  border: "1px solid #b9ddea",
  borderRadius: "12px",
  padding: "1rem",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
};

const challengeCardStyle = {
  padding: "0.9rem",
  borderRadius: "10px",
  background: "#f4fbfe",
  border: "1px solid #d4eef8",
  marginBottom: "0.8rem",
};

const smallTextStyle = {
  margin: "0.3rem 0",
  color: "#4f6b7a",
};