import React, { useEffect, useState } from "react";

export default function Leaderboard() {
const [users, setUsers] = useState([]);

useEffect(() => {
async function fetchLeaderboard() {
try {
const res = await fetch("http://127.0.0.1:8000/users");
const data = await res.json();

// Sort highest points first
const sortedUsers = data.sort((a, b) => b.points - a.points);
setUsers(sortedUsers);
} catch (error) {
console.error("Leaderboard error:", error);
}
}

fetchLeaderboard();
}, []);

return (
<div style={{ marginTop: "30px" }}>
<h2>Leaderboard 🏆</h2>

{users.length === 0 ? (
<p>No users found</p>
) : (
users.map((user, index) => (
<div
key={user.id}
style={{
background: "#f2f2f2",
padding: "15px",
marginBottom: "10px",
borderRadius: "10px",
}}
>
<h3>
#{index + 1} {user.username}
</h3>
<p>Points: {user.points} ⭐</p>
<p>Steps: {user.steps}</p>
<p>Mood Logs: {user.mood}</p>
<p>Challenges Completed: {user.challenges_completed}</p>
</div>
))
)}
</div>
);
}
