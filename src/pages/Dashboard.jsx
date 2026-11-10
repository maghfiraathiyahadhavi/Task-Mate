import { useNavigate } from "react-router-dom";
import { ListTodo, CheckCircle, Clock, Plus } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";

function Dashboard({ tasks, onEdit, onDelete, onToggle }) {
  const navigate = useNavigate();
  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;

  return (
    <>
      <Navbar />
      <div className="main-layout">
        <Sidebar />
        <main className="content">
          <div className="welcome">
            <div><h1>Dashboard</h1><p>Selamat datang! Yuk, selesaikan tugasmu.</p></div>
            <button className="primary-btn" onClick={() => navigate("/tasks")}><Plus size={18} /> Kelola Tugas</button>
          </div>
          <section className="stats">
            <div className="stat-card"><ListTodo /><h2>{tasks.length}</h2><p>Total Tugas</p></div>
            <div className="stat-card"><CheckCircle /><h2>{completed}</h2><p>Tugas Selesai</p></div>
            <div className="stat-card"><Clock /><h2>{pending}</h2><p>Belum Selesai</p></div>
          </section>
          <div className="section-heading"><h2>Daftar Tugas</h2><span>{tasks.length} tugas</span></div>
          <div className="task-list">
            {tasks.length ? tasks.map((task) => (
              <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle} />
            )) : <p>Belum ada tugas. Tambahkan tugas pertamamu!</p>}
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
