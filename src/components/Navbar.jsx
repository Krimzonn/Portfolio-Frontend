import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";
import RingAvatar from "./RingAvatar";
import { useState } from "react";

function Navbar() {
  const { theme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const navBg = theme === "light" ? "#1C1712" : "#F5F1EA";
  const logoColor = theme === "light" ? "#FAF7F2" : "#1C1712";
  const linkColor = theme === "light" ? "#C9C2B5" : "#5C5249";

  return (
    <nav
      className="relative flex items-center justify-between px-8 py-6"
      style={{ background: navBg }}
    >
      <Link
        to="/"
        className="font-bold text-lg"
        style={{
          color: logoColor,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        Krimzon.dev
      </Link>

      <RingAvatar />

      <div className="hidden md:flex items-center gap-8">
        <ThemeToggle />
        <Link
          to="/projects"
          style={{ color: linkColor }}
          className="text-sm hover:opacity-70 transition-opacity"
        >
          Projects
        </Link>
        <Link
          to="/now"
          style={{ color: linkColor }}
          className="text-sm hover:opacity-70 transition-opacity"
        >
          Now
        </Link>
        <Link
          to="/contact"
          style={{ color: linkColor }}
          className="text-sm hover:opacity-70 transition-opacity"
        >
          Contact
        </Link>
        <a
          href="#about"
          style={{ color: linkColor }}
          className="text-sm hover:opacity-70 transition-opacity"
        >
          About
        </a>
      </div>

      <div className="flex md:hidden items-center gap-3">
        <ThemeToggle />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ color: linkColor }}
          className="text-2xl leading-none"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 flex flex-col gap-1 p-4 md:hidden z-50"
          style={{
            background: navBg,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
            style={{ color: linkColor }}
            className="text-sm py-2"
          >
            About
          </a>
          <Link
            to="/projects"
            onClick={() => setMenuOpen(false)}
            style={{ color: linkColor }}
            className="text-sm py-2"
          >
            Projects
          </Link>
          <Link
            to="/now"
            onClick={() => setMenuOpen(false)}
            style={{ color: linkColor }}
            className="text-sm py-2"
          >
            Now
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            style={{ color: linkColor }}
            className="text-sm py-2"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
