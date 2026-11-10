import PropTypes from "prop-types";
import { Pencil, Trash2, Check } from "lucide-react";

function TaskCard({ task, onEdit, onDelete, onToggle }) {
  return (
    <article className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-info">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <div className="task-meta">
          <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
          <small>{task.date}</small>
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => onToggle(task.id)} aria-label="Ubah status" title="Ubah status"><Check size={18} /></button>
        <button onClick={() => onEdit(task)} aria-label="Edit tugas" title="Edit"><Pencil size={18} /></button>
        <button onClick={() => onDelete(task.id)} aria-label="Hapus tugas" title="Hapus"><Trash2 size={18} /></button>
      </div>
    </article>
  );
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    priority: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default TaskCard;
