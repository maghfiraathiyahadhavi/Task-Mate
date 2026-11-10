import { useEffect, useState } from "react";

function TaskForm({ onSave, editingTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Sedang");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    } else {
      setTitle("");
      setDescription("");
      setPriority("Sedang");
    }
  }, [editingTask]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Judul dan deskripsi harus diisi.");
      return;
    }
    onSave({ title: title.trim(), description: description.trim(), priority });
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{editingTask ? "Edit Tugas" : "Tambah Tugas Baru"}</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nama tugas" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Deskripsi tugas" />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Rendah">Rendah</option>
        <option value="Sedang">Sedang</option>
        <option value="Tinggi">Tinggi</option>
      </select>
      <div className="form-buttons">
        <button className="primary-btn" type="submit">{editingTask ? "Simpan Perubahan" : "Tambah Tugas"}</button>
        <button type="button" onClick={onCancel}>Batal</button>
      </div>
    </form>
  );
}

export default TaskForm;
