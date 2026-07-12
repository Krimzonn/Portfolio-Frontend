import { useState, useEffect, use } from "react";
import api from "../../api/axios";

function AdminTimeline() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", date: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("adminToken");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchEntries = () => {
    api
      .get("/timeline")
      .then((res) => {
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );
        setEntries(sorted);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const resetForm = () => {
    setForm({ title: "", description: "", date: "" });
    setEditingId(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.title || !form.date) {
      return setError("Title and Date are required!");
    }

    try {
      if (editingId) {
        await api.put(`/timeline/${editingId}`, form, authHeader);
      } else {
        await api.post("/timeline", form, authHeader);
      }

      resetForm();
      fetchEntries();
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  const handleEdit = (entry) => {
    setForm({
      title: entry.title || "",
      description: entry.description || "",
      date: entry.date ? entry.date.split("T")[0] : "",
    });
    setEditingId(entry.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this timeline entry?")) return;
    try {
      await api.delete(`/timeline/${id}`, authHeader);
      fetchEntries();
    } catch (err) {
      setError("Failed to delete.");
    }
  };

  return (
    <div>
      <h1
        className="text-2xl font-bold mb-6"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          color: "var(--text-primary)",
        }}
      >
        Timeline
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl p-6 mb-8 flex flex-col gap-3"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        {error && (
          <p className="text-sm" style={{ color: "#A32D2D" }}>
            {error}
          </p>
        )}

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="rounded-lg px-3 py-2 text-sm"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="rounded-lg px-3 py-2 text-sm resize-none"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        />

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="rounded-lg px-3 py-2 text-sm"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="cursor-pointer px-5 py-2 rounded-lg text-sm font-medium"
            style={{ background: "var(--accent)", color: "var(--accent-text)" }}
          >
            {editingId ? "Update entry" : "Add entry"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="cursor-pointer px-5 py-2 rounded-lg text-sm"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="flex flex-col gap-3">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg p-4"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div>
              <p
                className="text-xs mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                {new Date(entry.date).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p
                className="font-bold text-sm"
                style={{ color: "var(--text-primary)" }}
              >
                {entry.title}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(entry)}
                className="cursor-pointer text-xs px-3 py-1.5 rounded-md"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(entry.id)}
                className="cursor-pointer text-xs px-3 py-1.5 rounded-md"
                style={{ background: "#791F1F", color: "#ffffff" }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminTimeline;
