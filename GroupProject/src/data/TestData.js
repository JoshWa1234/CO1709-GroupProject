export const currentUser = {
  id: 2,
  name: "Sam",
  role: "Staff",
  points: 10,
  badges: 1,
};

export const users = [
  { id: 1, name: "Josh", role: "Team Leader", points: 95, badges: 3 },
  { id: 2, name: "Sam", role: "Staff", points: 10, badges: 1 },
  { id: 3, name: "Zack", role: "Staff", points: 60, badges: 1 },
  { id: 4, name: "Maryam", role: "Admin", points: 120, badges: 4 },
];

export const activeChallenges = [
  {
    id: 1,
    title: "Desk to 5k! In steps..",
    description: "Get those steps in! 5000 to get that heart working mildly!",
    points: 15,
    progress: 3200,
    target: 5000,
    status: "In Progress",
    frequency: "Daily",
    dueDate: "2026-04-24",
  },
  {
    id: 2,
    title: "Mood Log Weekly! 5 Entries",
    description: "Track your mental! Ups, Downs, Lefts and Rights!",
    points: 30,
    progress: 3,
    target: 5,
    status: "In Progress",
    frequency: "Weekly",
    dueDate: "2026-04-30",
  },
  {
    id: 3,
    title: "Become the Hydro-Homie",
    description: "Drink your 2 litres of water daily",
    points: 10,
    progress: 6,
    target: 6,
    status: "Completed",
    frequency: "Daily",
    dueDate: "2026-04-23",
  },
  {
    id: 4,
    title: "Screen Break Challenge",
    description: "Take regular screen breaks during the month.",
    points: 20,
    progress: 8,
    target: 20,
    status: "In Progress",
    frequency: "Monthly",
    dueDate: "2026-04-30",
  },
];

export const historyItems = [
  {
    id: 1,
    title: "Desk to 5k! In steps..",
    date: "2026-01-15",
    month: "January",
    status: "Completed",
    points: 15,
  },
  {
    id: 2,
    title: "Mood Log Weekly! 5 Entries",
    date: "2026-02-15",
    month: "February",
    status: "Completed",
    points: 30,
  },
  {
    id: 3,
    title: "Square eye rehabilitation",
    date: "2026-03-15",
    month: "March",
    status: "Missed",
    points: 0,
  },
];

export const challengeTemplates = [
  {
    id: 1,
    title: "Desk to 5k! In steps..",
    points: 15,
    recurrence: "Daily",
    assignedTo: "Staff",
  },
  {
    id: 2,
    title: "Mood Log Weekly! 5 Entries",
    points: 30,
    recurrence: "Weekly",
    assignedTo: "Staff",
  },
];