import React from "react";
import Leaderboard from "./Leaderboard";
<Leaderboard userPoints={points} />

export default function Leaderboard({ userPoints }) {
const leaderboard = [
{ name: "Sarah", points: 120 },
{ name: "John", points: 95 },
{ name: "Alex", points: 80 },
{ name: "You", points: userPoints || 0 }
];

leaderboard.sort((a, b) => b.points - a.points);

return (
<div style={{ padding: "20px" }}>
<h1>Leaderboard 🏆</h1>

{leaderboard.map((user, index) => (
<div
key={index}
style={{
background: "#e6e6e6",
marginBottom: "10px",
padding: "15px",
borderRadius: "10px"
}}
>
<h3>
#{index + 1} {user.name}
</h3>
<p>{user.points} Points ⭐</p>
</div>
))}
</div>
);
}
<Card>
<CardContent>
<h3 className="text-lg font-bold mb-3">Leaderboard 🏆</h3>

<div className="space-y-2">
<div>1. Sarah — 120 ⭐</div>
<div>2. John — 95 ⭐</div>
<div>3. Alex — 80 ⭐</div>
<div>4. You — {points} ⭐</div>
</div>
</CardContent>
</Card>

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Leaderboard({ userPoints = 0 }) {
const leaderboard = [
{ name: "Sarah", points: 120, challenges: 5 },
{ name: "John", points: 95, challenges: 4 },
{ name: "Alex", points: 80, challenges: 3 },
{ name: "You", points: userPoints, challenges: 2 },
];

leaderboard.sort((a, b) => b.points - a.points);

return (
<Card className="rounded-2xl shadow">
<CardContent className="p-6">
<h2 className="text-xl font-bold mb-4">Leaderboard 🏆</h2>

<div className="space-y-3">
{leaderboard.map((user, index) => (
<div
key={index}
className="flex justify-between items-center bg-gray-100 rounded-xl p-4"
>
<div>
<p className="font-semibold">
#{index + 1} {user.name}
</p>
<p className="text-sm text-gray-600">
Challenges Completed: {user.challenges}
</p>
</div>

<div className="font-bold text-lg">
{user.points} ⭐
</div>
</div>
))}
</div>
</CardContent>
</Card>
);
}