import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../api/axios";
import RingAvatar from "../../components/RingAvatar";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      return setError("Email and Password are required!");
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/projects");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden"
      style={{
        background: "#0B0B0A",
        backgroundImage:
          "linear-gradient(#1A1A18 1px, transparent 1px), linear-gradient(90deg, #1A1A18 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "380px",
          height: "380px",
          top: "-140px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#BA7517",
          filter: "blur(90px)",
          opacity: 0.1,
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm rounded-2xl p-6 sm:p-8"
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="flex items-center justify-between mb-6 pb-4"
          style={{ borderBottom: "0.5px solid #2A2620" }}
        >
          <span
            className="text-[10px] tracking-widest px-2 py-1 rounded-sm"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#FAC775",
              border: "0.5px solid #4A3A1E",
              background: "#1E1810",
            }}
          >
            RESTRICTED
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#639922" }}
            />
            <span
              className="text-[10px] tracking-wide"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "#6B6B68",
              }}
            >
              SYS ONLINE
            </span>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <RingAvatar initials="AA" />
        </div>

        <p
          className="text-[10px] tracking-widest uppercase text-center mb-1.5"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "#6B6B68",
          }}
        >
          Authorized personnel only
        </p>
        <h1
          className="text-lg font-bold text-center mb-6"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: "#F0EDE8",
          }}
        >
          Admin access
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {error && (
            <p
              className="text-sm mb-3"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "#E24B4A",
              }}
            >
              {error}
            </p>
          )}

          <label
            className="text-[10px] tracking-wide uppercase mb-1"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#8A8880",
            }}
          >
            Identifier
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-sm px-3 py-2.5 text-sm mb-4"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: "#0E0E0C",
              border: "0.5px solid #2E2A22",
              color: "#D3D1C7",
            }}
          />

          <label
            className="text-[10px] tracking-wide uppercase mb-1"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "#8A8880",
            }}
          >
            Passphrase
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-sm px-3 py-2.5 text-sm mb-5"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: "#0E0E0C",
              border: "0.5px solid #2E2A22",
              color: "#D3D1C7",
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-sm text-xs tracking-widest uppercase font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: "#BA7517",
              color: "#FAEEDA",
            }}
          >
            {loading ? "Authenticating" : "Authenticate"}
          </button>

          <div className="flex justify-between mt-4">
            <span
              className="text-[9.5px]"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "#4A4A46",
              }}
            >
              SESSION: NOT VERIFIED
            </span>
            <span
              className="text-[9.5px]"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "#4A4A46",
              }}
            >
              v1.0.0
            </span>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default AdminLogin;
