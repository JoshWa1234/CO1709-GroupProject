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

  // Load from localStorage
  useEffect(() => {
    setSteps(parseInt(localStorage.getItem("steps")) || 0);
    setMood(parseInt(localStorage.getItem("mood")) || 0);
    setPoints(parseInt(localStorage.getItem("points")) || 0);
    setStepsRewarded(localStorage.getItem("stepsRewarded") === "true");
    setMoodRewarded(localStorage.getItem("moodRewarded") === "true");
  }, []);

  // Update logic
  useEffect(() => {
    let newPoints = points;

    if (steps >= 5000 && !stepsRewarded) {
      newPoints += 15;
      setStepsRewarded(true);
      localStorage.setItem("stepsRewarded", true);
    }

    if (mood >= 5 && !moodRewarded) {
      newPoints += 30;
      setMoodRewarded(true);
      localStorage.setItem("moodRewarded", true);
    }

    setPoints(newPoints);

    localStorage.setItem("steps", steps);
    localStorage.setItem("mood", mood);
    localStorage.setItem("points", newPoints);
  }, [steps, mood]);

  const addSteps = () => {
    setSteps((prev) => prev + 500);
  };

  const logMood = () => {
    if (mood < 5) {
      setMood((prev) => prev + 1);
    }
  };

  const completed =
    (steps >= 5000 ? 1 : 0) + (mood >= 5 ? 1 : 0);

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
    <div style={{ fontFamily: "Arial", background: "#8ec6d9", minHeight: "100vh" }}>
      
      {/* Top Bar */}
      <div style={{
        background: "#7fb7cc",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between"
      }}>
        <div>Home | Dashboard</div>
        <div>Points: {points} ⭐ | Profile</div>
      </div>

      {/* Weekly */}
      <div className="section">
        <h2>Weekly Challenges</h2>
        <div className="card">
          <h3>Complete 3 tasks</h3>
          <div>{completed}/3 Completed</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(completed / 3) * 100}%` }}
            />
          </div>
          <div className="points">⭐ 10</div>
        </div>
      </div>

      {/* Challenges */}
      <div className="section">
        <h2>Challenges</h2>

        {/* Steps */}
        <div className="card">
          <h3>Walk 5k Steps</h3>
          <div>{steps}/5000 Completed</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${Math.min((steps / 5000) * 100, 100)}%` }}
            />
          </div>
          <button onClick={addSteps}>Log Steps</button>
          <div className="points">⭐ 15</div>
        </div>

        {/* Mood */}
        <div className="card">
          <h3>Log Mood 5 Times</h3>
          <div>{mood}/5 Completed</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${Math.min((mood / 5) * 100, 100)}%` }}
            />
          </div>
          <button onClick={logMood}>Log Mood</button>
          <div className="points">⭐ 30</div>
        </div>

        {/* Charts */}
        <div className="section">
          <h2>Progress Charts</h2>

          <div style={{ width: "300px", marginBottom: "30px" }}>
            <Doughnut data={stepsData} />
          </div>

          <div style={{ width: "300px" }}>
            <Doughnut data={moodData} />
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .section {
          background: #e6e6e6;
          margin: 20px;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 3px 5px rgba(0,0,0,0.2);
        }

        .card {
          background: #79b7c9;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 15px;
          position: relative;
        }

        .progress-bar {
          height: 8px;
          background: #5f9fb2;
          border-radius: 5px;
          margin: 8px 0;
        }

        .progress-fill {
          height: 8px;
          background: #1e88e5;
          border-radius: 5px;
        }

        .points {
          position: absolute;
          right: 15px;
          top: 15px;
          font-size: 20px;
          color: gold;
        }

        button {
          background: #ff7a21;
          border: none;
          padding: 6px 10px;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}