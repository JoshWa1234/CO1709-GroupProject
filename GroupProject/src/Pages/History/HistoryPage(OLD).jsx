import { historyItems } from "@/data/TestData";

export default function HistoryPage() {
  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Challenge History</h1>
      <p style={subTextStyle}>View previously completed and missed challenges.</p>

      <div style={historyWrapperStyle}>
        {historyItems.map((item) => (
          <div key={item.id} style={cardStyle}>
            <div>
              <h2 style={titleStyle}>{item.title}</h2>
              <p style={metaStyle}>Month: {item.month}</p>
            </div>

            <div style={{ textAlign: "right" }}>
              <p style={statusStyle}>Status: {item.status}</p>
              <p style={pointsStyle}>⭐ {item.points}</p>
            </div>
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

const historyWrapperStyle = {
  display: "grid",
  gap: "1rem",
};

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #b9ddea",
  borderRadius: "12px",
  padding: "1rem",
  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
};

const titleStyle = {
  margin: 0,
  color: "#1f3b57",
};

const metaStyle = {
  margin: "0.4rem 0 0 0",
  color: "#4f6b7a",
};

const statusStyle = {
  margin: 0,
  fontWeight: "bold",
  color: "#2f5973",
};

const pointsStyle = {
  margin: "0.4rem 0 0 0",
  color: "#ff8a00",
  fontWeight: "bold",
};