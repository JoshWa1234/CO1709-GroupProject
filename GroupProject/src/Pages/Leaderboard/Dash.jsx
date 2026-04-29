import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function FitnessDashboard() {
  const [steps, setSteps] = useState(0);
  const [mood, setMood] = useState(0);
  const [points, setPoints] = useState(0);

  const stepsGoal = 5000;
  const moodGoal = 5;

  // FETCH FROM API
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://127.0.0.1:8000/test");
        const data = await res.json();

        setSteps(data.steps || 0);
        setMood(data.mood || 0);
        setPoints(data.points || 0);

        // save locally too
        localStorage.setItem("steps", data.steps || 0);
        localStorage.setItem("mood", data.mood || 0);
        localStorage.setItem("points", data.points || 0);
      } catch (err) {
        console.error("API error:", err);
      }
    }

    fetchData();
  }, []);

  // SAVE TO API WHEN DATA CHANGES
  useEffect(() => {
    async function saveData() {
      try {
        await fetch("http://127.0.0.1:8000/test", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ steps, mood, points }),
        });
      } catch (err) {
        console.error("Save error:", err);
      }

      localStorage.setItem("steps", steps);
      localStorage.setItem("mood", mood);
      localStorage.setItem("points", points);
    }

    saveData();
  }, [steps, mood, points]);

  const challengesCompleted = (steps >= stepsGoal ? 1 : 0) + (mood >= moodGoal ? 1 : 0);

  const weeklyData = [
    { day: "Mon", steps: 2000, mood: 2 },
    { day: "Tue", steps: 3500, mood: 3 },
    { day: "Wed", steps: 5000, mood: 4 },
    { day: "Thu", steps: 4200, mood: 3 },
    { day: "Fri", steps: 6000, mood: 5 },
    { day: "Sat", steps: 3000, mood: 2 },
    { day: "Sun", steps: 4500, mood: 4 },
  ];

  return (
    <div className="min-h-screen bg-blue-200 p-4">
      <div className="flex justify-between items-center bg-blue-300 p-4 rounded-2xl shadow">
        <h1 className="text-xl font-bold">Fitness Dashboard</h1>
        <div>Points: {points} ⭐</div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <div className="col-span-1 bg-white rounded-2xl p-4 shadow">
          <ul className="space-y-3">
            <li>Dashboard</li>
            <li>Challenges</li>
            <li>Progress</li>
            <li>Profile</li>
          </ul>
        </div>

        <div className="col-span-3 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent>
                <p>Steps</p>
                <h2>{steps} / {stepsGoal}</h2>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <p>Mood</p>
                <h2>{mood} / {moodGoal}</h2>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <p>Challenges</p>
                <h2>{challengesCompleted} / 2</h2>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent>
                <h3>Steps This Week</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={weeklyData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="steps" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h3>Mood This Week</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="mood" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setSteps((prev) => prev + 500)}
              className="bg-orange-500 text-white px-4 py-2 rounded-xl"
            >
              Add Steps
            </button>

            <button
              onClick={() => mood < moodGoal && setMood((prev) => prev + 1)}
              className="bg-green-500 text-white px-4 py-2 rounded-xl"
            >
              Log Mood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
