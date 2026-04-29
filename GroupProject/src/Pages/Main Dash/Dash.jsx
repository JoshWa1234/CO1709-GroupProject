import React, { useState, useEffect } from "react";
import Leaderboard from "./Leaderboard";

export default function FitnessDashboard() {
const [steps, setSteps] = useState(0);
const [mood, setMood] = useState(0);
const [points, setPoints] = useState(0);
const [stepsRewarded, setStepsRewarded] = useState(false);
const [moodRewarded, setMoodRewarded] = useState(false);

const stepsGoal = 5000;
const moodGoal = 5;

// Load from API
useEffect(() => {
async function fetchData() {
try {
const res = await fetch("http://127.0.0.1:8000/test");
const data = await res.json();

setSteps(data.steps || 0);
setMood(data.mood || 0);
setPoints(data.points || 0);
} catch (err) {
console.log(err);
}
}

fetchData();
}, []);

// Auto update points
useEffect(() => {
let newPoints = points;

if (steps >= 5000 && !stepsRewarded) {
newPoints += 15;
setStepsRewarded(true);
}

if (mood >= 5 && !moodRewarded) {
newPoints += 30;
setMoodRewarded(true);
}

if (newPoints !== points) {
setPoints(newPoints);
}
}, [steps, mood]);

// Save to API
useEffect(() => {
async function saveData() {
try {
await fetch("http://127.0.0.1:8000/test", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
steps,
mood,
points,
}),
});
} catch (err) {
console.log(err);
}
}

saveData();
}, [steps, mood, points]);

return (
<div style={{ padding: 30 }}>
<h1>Fitness Dashboard</h1>

<h2>Points: {points} ⭐</h2>

<div>
<h3>Steps: {steps} / 5000</h3>
<button onClick={() => setSteps(steps + 500)}>
Add Steps
</button>
</div>

<div>
<h3>Mood Logs: {mood} / 5</h3>
<button onClick={() => setMood(mood + 1)}>
Log Mood
</button>
</div>

<Leaderboard userPoints={points} />
</div>
);
}
