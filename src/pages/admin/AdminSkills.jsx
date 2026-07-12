import { useState, useEffect } from "react";
import api from "../../api/axios";
import iconMap from "../../utils/iconMap";

function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", icon: "" });
  const [error, setError] = useState(null);

  const token = localStorage.getItem("adminToken");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchSkills = () => {
    api
      .get("/skills")
      .then((res) => setSkills(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.name) {
      return setError("Name is required!");
    }

    try {
      await api.post("/skills", form, authHeader);
      setForm({ name: "", category: "", icon: "" });
      fetchSkills();
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this skill?")) {
      return;
    }

    try {
      await api.delete(`/skills/${id}`, authHeader);
      fetchSkills();
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
        Skills
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
          name="name"
          placeholder="Skill name"
          value={form.name}
          onChange={handleChange}
          className="rounded-lg px-3 py-2 text-sm"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        />

        <input
          name="category"
          placeholder="Category (e.g. Frontend)"
          value={form.category}
          onChange={handleChange}
          className="rounded-lg px-3 py-2 text-sm"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        />

        <input
          name="icon"
          placeholder="Icon name (e.g. FaReact)"
          value={form.icon}
          onChange={handleChange}
          className="rounded-lg px-3 py-2 text-sm"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
          }}
        />

        <button
          type="submit"
          className="cursor-pointer self-start px-5 py-2 rounded-lg text-sm font-medium"
          style={{ background: "var(--accent)", color: "var(--accent-text)" }}
        >
          Add skill
        </button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {skills.map((skill) => {
          const Icon = iconMap[skill.icon];

          return (
            <div
              key={skill.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg p-4"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                {Icon && <Icon size={16} style={{ color: "var(--accent)" }} />}
                <span
                  className="text-sm"
                  style={{ color: "var(--text-primary)" }}
                >
                  {skill.name}
                </span>
              </div>
              <button
                onClick={() => handleDelete(skill.id)}
                className="cursor-pointer text-xs px-2 py-1 rounded-md"
                style={{ background: "#791F1F", color: "#ffffff" }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminSkills;
