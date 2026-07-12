import { useTheme } from "../context/ThemeContext";

function RingAvatar({ initials = "AA" }) {
  const { theme } = useTheme();

  const gradientColor = theme === "light" ? "#EF9F27" : "#BA7517";
  const bgColor = theme === "light" ? "#2C2420" : "#FAF7F2";
  const textColor = theme === "light" ? "#FAC775" : "#854F0B";

  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <svg
        viewBox="0 0 56 56"
        className="absolute top-0 left-0 w-14 h-14"
        style={{ animation: "spin 4s linear infinite" }}
      >
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientColor} stopOpacity="0" />
            <stop offset="50%" stopColor={gradientColor} stopOpacity="1" />
            <stop offset="100%" stopColor={gradientColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle
          cx="28"
          cy="28"
          r="24"
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      <div
        className="relative w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10"
        style={{
          background: bgColor,
          color: textColor,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {initials}
      </div>

      <style>{`
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
    </div>
  );
}

export default RingAvatar;
