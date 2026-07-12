import { useState, useEffect } from "react";
import api from "../../api/axios";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("adminToken");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  const fetchMessages = () => {
    api
      .get("/messages", authHeader)
      .then((res) => setMessages(res.data))
      .catch((err) => setError("Failed to load messages!"));
  };

  useEffect(() => {
    fetchMessages();
  });

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) {
      return;
    }

    try {
      await api.delete(`/messages/${id}`, authHeader);
      fetchMessages();
    } catch (err) {
      console.error("Failed to delete message!");
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
        Messages
      </h1>

      {error && (
        <p className="text-sm mb-4" style={{ color: "#A32D2D" }}>
          {error}
        </p>
      )}

      {messages.length === 0 && !error && (
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          No messages yet.
        </p>
      )}

      <div className="flex flex-col gap-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="rounded-lg p-4"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <p
                  className="font-bold text-sm"
                  style={{ color: "var(--text-primary)" }}
                >
                  {msg.name}
                </p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {msg.email}
                </p>
              </div>
              <button
                onClick={() => handleDelete(msg.id)}
                className="cursor-pointer text-xs px-3 py-1.5 rounded-md"
                style={{ background: "#791F1F", color: "#ffffff" }}
              >
                Delete
              </button>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {msg.message}
            </p>
            <p
              className="text-[10px] mt-2"
              style={{ color: "var(--text-muted)" }}
            >
              {new Date(msg.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminMessages;
