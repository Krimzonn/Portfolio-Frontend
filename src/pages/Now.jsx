import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function Now() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    api
      .get("/timeline")
      .then((res) => {
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        );

        setEntries(sorted);
      })
      .catch((err) => console.log("Failed to fetch timeline: ", err));
  }, []);

  const current = entries[0];
  const rest = entries.slice(1);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <main className="max-w-3xl mx-auto px-8 pb-24">
      <motion.section
        className="pt-16 pb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p
          className="text-xs font-medium tracking-widest uppercase mb-3"
          style={{ color: "var(--text-muted)" }}
        >
          Now
        </p>
        <h1
          className="text-4xl font-bold mb-3"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: "var(--text-primary)",
          }}
        >
          What I'm working on
        </h1>
        <p
          className="text-sm max-w-md leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          A running log of what I'm building, learning, and figuring out -
          updated as things change.
        </p>
      </motion.section>

      {current && (
        <motion.div
          className="relative overflow-hidden rounded-2xl p-7 mb-12"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: "180px",
              height: "180px",
              top: "-80px",
              right: "-60px",
              background: "var(--accent)",
              filter: "blur(50px)",
              opacity: 0.18,
            }}
          />

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-[7px] h-[7px] rounded-full"
                style={{ background: "var(--accent)" }}
              />
              <p
                className="text-[11px] font-medium tracking-widest uppercase"
                style={{ color: "var(--accent)" }}
              >
                Currently
              </p>
            </div>
            <h3
              className="font-bold text-base mb-2"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: "var(--text-primary)",
              }}
            >
              {current.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {current.description}
            </p>
          </div>
        </motion.div>
      )}

      <motion.section
        variants={stagger}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
      >
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.4 }}
          className="text-xs font-medium tracking-widest uppercase mb-6"
          style={{ color: "var(--text-muted)" }}
        >
          Timeline
        </motion.p>

        <div>
          {rest.map((entry, index) => (
            <motion.div
              key={entry.id}
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="relative flex gap-4 pb-7"
            >
              {index !== rest.length - 1 && (
                <span
                  className="absolute w-px"
                  style={{
                    left: "6px",
                    top: "18px",
                    bottom: 0,
                    background: "var(--border)",
                  }}
                />
              )}
              <span
                className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                style={{
                  background: "var(--accent)",
                  border: "3px solid var(--bg)",
                }}
              />
              <div>
                <p
                  className="text-xs font-medium mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {formatDate(entry.date)}
                </p>
                <h4
                  className="font-bold text-sm mb-1"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: "var(--text-primary)",
                  }}
                >
                  {entry.title}
                </h4>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {entry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {rest.length === 0 && entries.length > 0 && (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            That's the only entry so far. More to come soon!
          </p>
        )}

        {entries.length === 0 && (
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            No timeline entries yet.
          </p>
        )}
      </motion.section>
    </main>
  );
}

export default Now;
