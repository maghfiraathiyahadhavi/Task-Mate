import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";

import initialTasks from "./data/initialTasks";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

function AppContent() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : initialTasks;
    } catch {
      return initialTasks;
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (data) =>
    setTasks((prev) => [
      {
        ...data,
        id: Date.now(),
        completed: false,
        date: new Date().toLocaleDateString("id-ID")
      },
      ...prev
    ]);

  const updateTask = (id, data) =>
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...data } : task
      )
    );

  const deleteTask = (id) => {
    if (window.confirm("Yakin ingin menghapus tugas ini?")) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  const toggleTask = (id) =>
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );

  const editFromDashboard = (task) =>
    navigate("/tasks", { state: { editTask: task } });

  return (
    <>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <Dashboard
              tasks={tasks}
              onEdit={editFromDashboard}
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          }
        />

        <Route
          path="/tasks"
          element={
            <Tasks
              tasks={tasks}
              onAdd={addTask}
              onUpdate={updateTask}
              onDelete={deleteTask}
              onToggle={toggleTask}
            />
          }
        />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
