import { useEffect, useState } from "react";

export default function PointsSystem() {
const [steps, setSteps] = useState(0);
const [mood, setMood] = useState(0);
const [points, setPoints] = useState(0);
const [stepsRewarded, setStepsRewarded] = useState(false);
const [moodRewarded, setMoodRewarded] = useState(false);

// Auto update points when goals are completed
useEffect(() => {
let newPoints = points;

// +15 points when steps reach 5000
if (steps >= 5000 && !stepsRewarded) {
newPoints += 15;
setStepsRewarded(true);
}

// +30 points when mood reaches 5 logs
if (mood >= 5 && !moodRewarded) {
newPoints += 30;
setMoodRewarded(true);
}

// Update points only if changed
if (newPoints !== points) {
setPoints(newPoints);
}
}, [steps, mood]);

return null;
}