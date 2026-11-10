import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

function Tasks({ tasks, onAdd, onUpdate, onDelete, onToggle }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const selectedTask = location.state?.editTask;
    if (selectedTask) {
      setEditingTask(selectedTask);
      setShowForm(true);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const filteredTasks = tasks.filter((task) => {
    const matchSearch = `${task.title} ${task.description}`.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "Semua" ||
      (filter === "Selesai" && task.completed) ||
      (filter === "Belum Selesai" && !task.completed);
    return matchSearch && matchFilter;
  });

  function handleSave(data) {
    if (editingTask) onUpdate(editingTask.id, data);
    else onAdd(data);
    setEditingTask(null);
    setShowForm(false);
  }

  function handleEdit(task) {
    setEditingTask(task);
    setShowForm(true);
  }

  function handleCancel() {
    setEditingTask(null);
    setShowForm(false);
  }

  return (
    <>
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <main className="content">
          <div className="welcome">
            <div><h1>My Tasks</h1><p>Atur dan selesaikan semua tugasmu.</p></div>
            <button className="primary-btn" onClick={() => { setEditingTask(null); setShowForm(!showForm); }}>
              <Plus size={18} /> Tambah Tugas
            </button>
          </div>
          <div className="search-box"><Search size={20} /><input placeholder="Cari tugas..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
          <div className="filter-box">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="Semua">Semua Tugas</option>
              <option value="Selesai">Selesai</option>
              <option value="Belum Selesai">Belum Selesai</option>
            </select>
          </div>
          {showForm && <TaskForm onSave={handleSave} editingTask={editingTask} onCancel={handleCancel} />}
          <div className="task-list">
            {filteredTasks.length ? filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={handleEdit} onDelete={onDelete} onToggle={onToggle} />
            )) : <p>Tugas tidak ditemukan.</p>}
          </div>
        </main>
      </div>
    </>
  );
}

export default Tasks;
