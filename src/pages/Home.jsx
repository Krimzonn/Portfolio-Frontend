import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import StartupAnimation from "../components/StartupAnimation";
import { motion } from "framer-motion";
import iconMap from "../utils/iconMap";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function Home() {
  const [skills, setSkills] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    api
      .get("/skills")
      .then((res) => {
        console.log("Skills response:", res.data);
        setSkills(res.data);
      })
      .catch((err) => console.error("Failed to fetch skills:", err));
    api
      .get("/projects")
      .then((res) => {
        console.log("Projects response:", res.data);
        const featured = res.data.filter((p) => p.featured);
        setFeaturedProjects(featured);
      })
      .catch((err) => console.error("Failed to fetch skills:", err));
  }, []);

  return (
    <>
      <StartupAnimation onComplete={() => setReady(true)} />

      {ready && (
        <main className="max-w-5xl mx-auto px-8 pb-24">
          <motion.section
            className="relative pt-12 sm:pt-16 md:pt-20 pb-16"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: "500px",
                height: "500px",
                top: "-200px",
                right: "-250px",
                background: "var(--accent)",
                filter: "blur(80px)",
                opacity: 0.2,
                zIndex: 0,
              }}
            />

            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: "320px",
                height: "320px",
                bottom: "-160px",
                right: "-60px",
                background: "var(--accent)",
                filter: "blur(80px)",
                opacity: 0.1,
                zIndex: 0,
              }}
            />

            <div className="relative z-10">
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="text-sm font-medium tracking-widest uppercase mb-4"
                style={{ color: "var(--accent)" }}
              >
                Full Stack Developer
              </motion.p>
              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 max-w-xl"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  color: "var(--text-primary)",
                }}
              >
                Building{" "}
                <span className="relative" style={{ color: "var(--accent)" }}>
                  unique
                  <span
                    className="absolute left-0 right-0 rounded-sm"
                    style={{
                      bottom: "4px",
                      height: "6px",
                      background: "var(--accent)",
                      opacity: 0.25,
                      zIndex: -1,
                    }}
                  />
                </span>{" "}
                software, one project at a time
              </motion.h1>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-base leading-relaxed max-w-lg mb-8"
                style={{ color: "var(--text-secondary)" }}
              >
                I design and build full stack web applications with React, Node
                and Postgres with a strong focus on clean code and real problem
                solving.
              </motion.p>
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="flex gap-4"
              >
                <Link
                  to="/projects"
                  className="px-6 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                  style={{
                    background: "var(--accent)",
                    color: "var(--accent-text)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  View Projects
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  Get in touch
                </Link>
              </motion.div>
            </div>
          </motion.section>

          <motion.section
            id="about"
            className="py-12 border-t"
            style={{ borderColor: "var(--border)" }}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="text-xs font-medium tracking-widest uppercase mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              About
            </motion.p>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-7 mb-8"
            >
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center font-bold text-2xl flex-shrink-0"
                style={{
                  background: "var(--surface-2)",
                  color: "var(--accent)",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                AA
              </div>
              <div className="space-y-3">
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  I'm an ambitious BSSE student at FAST, building software
                  driven by a simple idea; work on things that feel
                  underexplored, rather than following the same well-worn
                  tutorial paths everyone else takes.
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  My approach to learning is self-directed and project-oriented.
                  I don't just study concepts in isolation; I build real,
                  working systems from the ground up, debugging and iterating
                  until they actually work.
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Beyond software, I have a genuine interest in engineering more
                  broadly; how systems are designed, how mechanisms work, and
                  the underlying logic that connects disciplines.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {[
                { num: "8+", label: "Months coding" },
                { num: "5", label: "Projects built" },
                { num: "9+", label: "Tools learned" },
                { num: "100%", label: "Self-directed" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-4 text-center"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <p
                    className="text-2xl font-bold mb-1"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      color: "var(--accent)",
                    }}
                  >
                    {stat.num}
                  </p>
                  <p
                    className="text-[10px] uppercase tracking-wide"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      color: "var(--text-muted)",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section
            className="py-12 border-t"
            style={{ borderColor: "var(--border)" }}
            variants={stagger}
            initial="hidden"
            animate={skills.length > 0 ? "visible" : "hidden"}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.4 }}
              className="text-xs font-medium tracking-widest uppercase mb-6"
              style={{ color: "var(--text-muted)" }}
            >
              Skills and tools
            </motion.p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
              {skills.map((skill) => {
                const Icon = iconMap[skill.icon];
                return (
                  <motion.div
                    key={skill.id}
                    variants={fadeUp}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center gap-2 rounded-xl p-3"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {Icon ? (
                      <Icon size={22} style={{ color: "var(--accent)" }} />
                    ) : (
                      <div
                        className="w-[22px] h-[22px] rounded-full"
                        style={{ background: "var(--surface-2)" }}
                      />
                    )}
                    <span
                      className="text-[10px] text-center"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            className="pt-12"
            variants={stagger}
            initial="hidden"
            animate={featuredProjects.length > 0 ? "visible" : "hidden"}
          >
            <motion.p
              className="text-xs font-medium tracking-widest uppercase mb-6"
              style={{ color: "var(--text-muted)" }}
              variants={fadeUp}
              transition={{ duration: 0.4 }}
            >
              Featured Projects
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  className="rounded-xl p-6"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <h3
                    className="font-bold text-base mb-2"
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      color: "var(--text-primary)",
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-4"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {project.description}
                  </p>

                  <div className="flex gap-2 flex-wrap">
                    {project.tech_stack?.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          background: "var(--surface-2)",
                          color: "var(--accent)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div
                    className="flex gap-4 mt-4 pt-4"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-medium hover:opacity-70 transition-opacity"
                        style={{ color: "var(--accent)" }}
                      >
                        GitHub
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-medium hover:opacity-70 transition-opacity"
                        style={{ color: "var(--accent)" }}
                      >
                        Live
                      </a>
                    )}
                    {!project.github_url && !project.live_url && (
                      <span
                        className="text-xs"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Links coming soon
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </main>
      )}
    </>
  );
}

export default Home;
