import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { path: "/admin/projects", label: "Projects", icon: "📁" },
  { path: "/admin/timeline", label: "Timeline", icon: "🕒" },
  { path: "/admin/skills", label: "Skills", icon: "⚡" },
  { path: "/admin/messages", label: "Messages", icon: "✉️" },
];

function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);

    return window.removeEventListener("resize", checkWidth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg)" }}>
      <motion.aside
        animate={{ width: collapsed ? 64 : 220 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col py-5 px-3 flex-shrink-0"
        style={{ background: "#1C1712" }}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-lg mb-6 p-2 rounded-lg hover:opacity-70 transition-opacity self-start"
          style={{ color: "#C9C2B5" }}
        >
          ☰
        </button>

        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
                style={{
                  background: active ? "var(--accent)" : "transparent",
                  color: active ? "var(--accent-text)" : "#C9C2B5",
                }}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mt-auto hover:opacity-80 transition-opacity"
          style={{ color: "#C9C2B5" }}
        >
          {!collapsed && <span>Logout</span>}
        </button>
      </motion.aside>

      <main className="flex-1 p-4 sm:p-8 overflow-auto min-w-0">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
