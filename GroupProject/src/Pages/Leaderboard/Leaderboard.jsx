import { users } from "@/data/TestData";

export default function Leaderboard() {
  const rankedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Leaderboard</h1>
      <p style={subTextStyle}>Top users ranked by points earned.</p>

      <div style={tableStyle}>
        <div style={headerRowStyle}>
          <span>#</span>
          <span>Name</span>
          <span>Role</span>
          <span>Badges</span>
          <span>Points</span>
        </div>

        {rankedUsers.map((user, index) => (
          <div key={user.id} style={rowStyle}>
            <span>{index + 1}</span>
            <span>{user.name}</span>
            <span>{user.role}</span>
            <span>{user.badges}</span>
            <span>⭐ {user.points}</span>
          </div>
        ))}
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

const tableStyle = {
  background: "#ffffff",
  border: "1px solid #b9ddea",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
};

const headerRowStyle = {
  display: "grid",
  gridTemplateColumns: "60px 1fr 1fr 100px 120px",
  gap: "1rem",
  padding: "1rem",
  background: "#55b8d9",
  color: "white",
  fontWeight: "bold",
};

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "60px 1fr 1fr 100px 120px",
  gap: "1rem",
  padding: "1rem",
  borderTop: "1px solid #e3f3f9",
};