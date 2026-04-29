Leaderboard
import React from "react";

export default function Leaderboard({ userPoints }) {
const leaderboard = [
{ name: "Sarah", points: 120 },
{ name: "John", points: 95 },
{ name: "Alex", points: 80 },
{ name: "You", points: userPoints },
];

leaderboard.sort((a, b) => b.points - a.points);

return (
<div style={{ marginTop: 30 }}>
<h2>Leaderboard 🏆</h2>

{leaderboard.map((user, index) => (
<div key={index}>
#{index + 1} {user.name} — {user.points} ⭐
</div>
))}
</div>
);
}
