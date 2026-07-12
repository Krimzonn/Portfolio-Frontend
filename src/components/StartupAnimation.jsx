import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function StartupAnimation({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState("intro");

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("startupPlayed");
    if (hasPlayed) {
      setVisible(false);
      onComplete();
    }

    const t1 = setTimeout(() => setPhase("blink"), 1400);
    const t2 = setTimeout(() => setPhase("click"), 2400);
    const t3 = setTimeout(() => setPhase("exit"), 2800);
    const t4 = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("startupPlayed", "true");
      onComplete();
    }, 3400);

    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "var(--bg)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="text-center">
            <motion.p
              className="text-sm font-medium tracking-widest uppercase mb-1"
              style={{
                color: "var(--accent)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Welcome
            </motion.p>
            <motion.h1
              className="text-6xl font-bold"
              style={{
                color: "var(--text-primary)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={
                phase === "blink" || phase === "click"
                  ? { opacity: [1, 0, 1, 0, 1, 0, 1] }
                  : phase === "exit"
                    ? { opacity: 1 }
                    : { opacity: 1, y: 20 }
              }
              transition={
                phase === "blink" || phase === "click"
                  ? {
                      duration: 2.1,
                      times: [0, 0.14, 0.28, 0.42, 0.57, 0.71, 1],
                      ease: "easeInOut",
                    }
                  : {
                      opacity: { duration: 0.6, delay: 0.4 },
                      y: { duration: 0.6, delay: 0.4 },
                    }
              }
            >
              <span style={{ color: "var(--accent)" }}>A</span>bdul
              <span style={{ color: "var(--accent)" }}>A</span>had
            </motion.h1>
            <motion.div
              className="mt-6 mx-auto rounded-full"
              style={{ background: "var(--accent)", height: "2px" }}
              initial={{ width: 0 }}
              animate={
                phase === "exit" ? { width: "100%" } : { width: "120px" }
              }
              transition={{
                width:
                  phase === "exit"
                    ? { duration: 0.4, ease: "easeOut" }
                    : { duration: 0.8, delay: 0.8, ease: "easeOut" },
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default StartupAnimation;
