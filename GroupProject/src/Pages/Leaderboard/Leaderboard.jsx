import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function WeeklyChallenges() {
const [steps, setSteps] = useState(0);
const [mood, setMood] = useState(0);
const [points, setPoints] = useState(0);
const [stepsRewarded, setStepsRewarded] = useState(false);
const [moodRewarded, setMoodRewarded] = useState(false);

// LOAD DATA FROM API
useEffect(() => {
async function loadData() {
try {
const res = await fetch("http://127.0.0.1:8000/test");
const data = await res.json();

setSteps(data.steps || 0);
setMood(data.mood || 0);
setPoints(data.points || 0);
} catch (err) {
console.error("Load error:", err);
}
}

loadData();
}, []);

// POINTS SYSTEM
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

// SAVE TO API
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
console.error("Save error:", err);
}
}

if (steps !== 0 || mood !== 0 || points !== 0) {
saveData();
}
}, [steps, mood, points]);

const addSteps = () => {
setSteps((prev) => prev + 500);
};

const logMood = () => {
if (mood < 5) {
setMood((prev) => prev + 1);
}
};

const completed =
(steps >= 5000 ? 1 : 0) +
(mood >= 5 ? 1 : 0);

const stepsData = {
labels: ["Completed", "Remaining"],
datasets: [
{
data: [steps, Math.max(5000 - steps, 0)],
backgroundColor: ["#1e88e5", "#cfd8dc"],
},
],
};

const moodData = {
labels: ["Logged", "Remaining"],
datasets: [
{
data: [mood, Math.max(5 - mood, 0)],
backgroundColor: ["#42a5f5", "#cfd8dc"],
},
],
};

return (
<div>
<h1>Weekly Challenges</h1>

<h2>Points: {points} ⭐</h2>

<div>
<h3>Walk 5k Steps</h3>
<p>{steps}/5000</p>
<button onClick={addSteps}>Log Steps</button>
</div>

<div>
<h3>Log Mood 5 Times</h3>
<p>{mood}/5</p>
<button onClick={logMood}>Log Mood</button>
</div>

<div>
<h3>Completed Challenges: {completed}/2</h3>
</div>

<div style={{ width: "300px" }}>
<Doughnut data={stepsData} />
</div>

<div style={{ width: "300px" }}>
<Doughnut data={moodData} />
</div>
</div>
);
}
