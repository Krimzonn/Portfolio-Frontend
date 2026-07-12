import { useState, useEffect } from "react";
import api from "../../api/axios";

function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    tech_stack: "",
    github_url: "",
    live_url: "",
    image_url: "",
    featured: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("adminToken");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchProjects = () => {
    api
      .get("/projects")
      .then((res) => setProjects(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      tech_stack: "",
      github_url: "",
      live_url: "",
      image_url: "",
      featured: false,
    });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.title) {
      return setError("Title is required!");
    }

    const payload = {
      ...form,
      tech_stack: form.tech_stack
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, payload, authHeader);
      } else {
        await api.post("/projects", payload, authHeader);
      }
      resetForm();
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  const handleEdit = (project) => {
    setForm({
      title: project.title || "",
      description: project.description || "",
      tech_stack: (project.tech_stack || []).join(", "),
      github_url: project.github_url || "",
      live_url: project.live_url || "",
      image_url: project.image_url || "",
      featured: project.featured || false,
    });
    setEditingId(project.id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) {
      return;
    }

    try {
      await api.delete(`/projects/${id}`, authHeader);
      fetchProjects();
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
        Projects
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl p-4 sm:p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        {error && (
          <p className="col-span-2 text-sm" style={{ color: "#A32D2D" }}>
            {error}
          </p>
        )}

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="rounded-lg px-3 py-2 text-sm col-span-2"
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
          className="rounded-lg px-3 py-2 text-sm col-span-2 resize-none"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        />

        <input
          name="tech_stack"
          placeholder="Tech stack (comma separated)"
          value={form.tech_stack}
          onChange={handleChange}
          className="rounded-lg px-3 py-2 text-sm col-span-2"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        />

        <input
          name="github_url"
          placeholder="GitHub URL"
          value={form.github_url}
          onChange={handleChange}
          className="rounded-lg px-3 py-2 text-sm"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        />

        <input
          name="live_url"
          placeholder="Live URL"
          value={form.live_url}
          onChange={handleChange}
          className="rounded-lg px-3 py-2 text-sm"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        />

        <input
          name="image_url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={handleChange}
          className="rounded-lg px-3 py-2 text-sm col-span-2"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        />

        <label
          className="flex items-center gap-2 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured
        </label>

        <div className="col-span-2 flex gap-3">
          <button
            type="submit"
            className="cursor-pointer px-5 py-2 rounded-lg text-sm font-medium"
            style={{ background: "var(--accent)", color: "var(--accent-text)" }}
          >
            {editingId ? "Update Project" : "Add Project"}
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
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg p-4"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div>
              <p
                className="font-bold text-sm flex gap-2"
                style={{ color: "var(--text-primary)" }}
              >
                {project.title}
                {project.featured && (
                  <span style={{ color: "var(--accent)" }}>
                    <img
                      className="w-4 h-4"
                      src="/feature.png"
                      title="star icon"
                    />
                  </span>
                )}
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {(project.tech_stack || []).join(", ")}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="cursor-pointer text-xs px-3 py-1.5 rounded-md"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
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

export default AdminProjects;
