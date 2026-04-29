import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function DashboardAnalytics() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [weeklyData, setWeeklyData] = useState([]);

  const [metrics, setMetrics] = useState({
    totalPoints: 0,
    activeUsers: 0,
    completedChallenges: 0,
    totalChallenges: 0,
    completionRate: 0,
  });

  // LIVE API FETCH FROM DATABASE
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch("http://127.0.0.1:8000/users");
        const data = await response.json();

        if (!Array.isArray(data)) return;

        setUsers(data);

        // Current logged in user example = Sam
        const loggedInUser =
          data.find((user) => user.username === "Sam") || data[0];

        if (loggedInUser) {
          setCurrentUser(loggedInUser);
        }

        // WEEKLY REAL DATA FROM DATABASE
        const generatedWeeklyData = data.map((user, index) => ({
          day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index % 7],
          steps: user.steps || 0,
          mood: user.mood || 0,
        }));

        setWeeklyData(generatedWeeklyData);

        // KEY METRICS
        setMetrics({
          totalPoints,
          activeUsers: data.length,
          completedChallenges,
          totalChallenges,
          completionRate,
        });
      } catch (error) {
        console.error("Dashboard API Error:", error);
      }
    }

    fetchDashboardData();

    // Auto refresh every 5 seconds for live updates
    const interval = setInterval(fetchDashboardData, 5000);

    return () => clearInterval(interval);
  }, []);

  // LEADERBOARD
  const leaderboard = [...users].sort(
    (a, b) => (b.points || 0) - (a.points || 0)
  );

  // PIE CHART DATA
  const pieData = [
    {
      name: "Completed",
      value: metrics.completedChallenges,
    },
    {
      name: "Remaining",
      value: Math.max(
        metrics.totalChallenges - metrics.completedChallenges,
        0
      ),
    },
  ];

  const pieColors = ["#2563eb", "#cbd5e1"];

  return (
    <div className="min-h-screen bg-blue-100 p-6">
      {/* TOP HEADER */}
      <div className="bg-blue-300 rounded-2xl p-5 shadow flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Analytics</h1>
          <p className="text-sm">
            Live analytics from database + API integration
          </p>
        </div>

        {currentUser && (
          <div className="text-right">
            <p className="font-semibold">{currentUser.username}</p>
            <p>{currentUser.role}</p>
            <p>⭐ {currentUser.points || 0} Points</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {/* SIDEBAR */}
        <div className="bg-white rounded-2xl p-4 shadow">
          <ul className="space-y-4 font-medium">
            <li>Dashboard</li>
            <li>Analytics</li>
            <li>Leaderboard</li>
            <li>Reports</li>
            <li>Profile</li>
          </ul>
        </div>

        {/* MAIN CONTENT */}
        <div className="col-span-3 space-y-5">
          {/* KEY METRICS */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <p>Total Points Earned</p>
                <h2 className="text-2xl font-bold">
                  {metrics.totalPoints}
                </h2>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p>Completed Challenges</p>
                <h2 className="text-2xl font-bold">
                  {metrics.completedChallenges}
                </h2>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p>Active Users</p>
                <h2 className="text-2xl font-bold">
                  {metrics.activeUsers}
                </h2>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <p>Completion Rate</p>
                <h2 className="text-2xl font-bold">
                  {metrics.completionRate}%
                </h2>
              </CardContent>
            </Card>
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Weekly Step Analytics</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weeklyData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="steps"
                      stroke="#2563eb"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Mood Analytics</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={weeklyData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="mood" fill="#16a34a" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* PIE + LEADERBOARD */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">
                  Challenge Completion Overview
                </h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={pieColors[index % pieColors.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Leaderboard</h3>

                <div className="space-y-3">
                  {leaderboard.map((user, index) => (
                    <div
                      key={user.id}
                      className="flex justify-between border-b pb-2"
                    >
                      <div>
                        #{index + 1} {user.username}
                      </div>

                      <div>
                        ⭐ {user.points || 0}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
