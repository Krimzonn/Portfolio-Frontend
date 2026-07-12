import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
      style={{ background: "var(--surface-2)", color: "var(--accent)" }}
      aria-label="Toggle Theme"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

export default ThemeToggle;
