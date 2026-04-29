import { activeChallenges, historyItems } from "@/data/TestData";

export default function HistoryPage() {
    const storedChallenges = localStorage.getItem("activeChallenges");
    const inProgressChallenges = storedChallenges
        ? JSON.parse(storedChallenges)
        : activeChallenges.filter((challenge) => challenge.status === "In Progress");

    const storedHistory = localStorage.getItem("challengeHistory");
    const history = storedHistory ? JSON.parse(storedHistory) : historyItems;

    const sortedHistory = [...history].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
        <div style={pageStyle}>
            <h1 style={headingStyle}>History</h1>
          
            <section style={sectionStyle}>
                <h2 style={sectionHeadingStyle}>In Progress</h2>

                {inProgressChallenges.length === 0 ? (
                    <p style={metaStyle}>No challenges currently in progress.</p>
                ) : (
                    inProgressChallenges.map((item) => (
                        <div key={item.id} style={cardStyle}>
                            <div>
                                <h3 style={titleStyle}>{item.title}</h3>
                                <p style={metaStyle}>Due: {item.dueDate}</p>
                            </div>

                            <div style={rightSideStyle}>
                                <p style={statusStyle}>Status: {item.status}</p>
                                <p style={pointsStyle}>⭐ {item.points}</p>
                            </div>
                        </div>
                    ))
                )}
            </section>

            <section style={sectionStyle}>
                <h2 style={sectionHeadingStyle}>Challenge History</h2>

                {sortedHistory.length === 0 ? (
                    <p style={metaStyle}>No challenge history available.</p>
                ) : (
                    sortedHistory.map((item) => (
                        <div key={item.id} style={cardStyle}>
                            <div>
                                <h3 style={titleStyle}>{item.title}</h3>
                                <p style={metaStyle}>
                                    {item.month} - {item.date}
                                </p>
                            </div>

                            <div style={rightSideStyle}>
                                <p
                                    style={{
                                        ...statusStyle,
                                        color:
                                            item.status === "Cancelled by Challenge Master"
                                                ? "#d93025"
                                                : "#1f3b57",
                                    }}
                                >
                                    Status: {item.status}
                                </p>
                                <p style={pointsStyle}>⭐ {item.points}</p>
                            </div>
                        </div>
                    ))
                )}
            </section>
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
    marginBottom: "0.8rem",
};

const titleStyle = {
    margin: 0,
    color: "#1f3b57",
};

const metaStyle = {
    margin: "0.4rem 0 0 0",
    color: "#4f6b7a",
};

const rightSideStyle = {
    textAlign: "right",
};

const statusStyle = {
    margin: 0,
    fontWeight: "bold",
    color: "#1f3b57",
};

const pointsStyle = {
    margin: "0.4rem 0 0 0",
    color: "#ff8a00",
    fontWeight: "bold",
};