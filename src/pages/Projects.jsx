import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    api.get("/projects").then((res) => setProjects(res.data));
  }, []);

  const allTags = [
    "All",
    ...new Set(projects.flatMap((p) => p.tech_stack || [])),
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tech_stack?.includes(activeFilter));

  return (
    <main className="max-w-5xl mx-auto px-5 sm:px-8 pb-24">
      <motion.div
        className="pt-16 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p
          className="text-xs font-medium tracking-widest uppercase mb-3"
          style={{ color: "var(--text-muted)" }}
        >
          Portfolio
        </p>
        <h1
          className="text-3xl sm:text-4xl font-bold mb-3"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: "var(--text-primary)",
          }}
        >
          All Projects
        </h1>
        <p
          className="text-sm max-w-md leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          A collection of things I've built while learning full stack
          development: from ciphers to full CRUD apps with auth.
        </p>
      </motion.div>

      <div
        className="flex gap-2 pb-6 mb-8 border-b overflow-x-auto"
        style={{ borderColor: "var(--border)" }}
      >
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className="text-xs px-4 py-2 rounded-full transition-colors flex-shrink-0"
            style={
              activeFilter === tag
                ? {
                    background: "var(--accent)",
                    color: "var(--accent-text)",
                  }
                : {
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                  }
            }
          >
            {tag}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {filteredProjects.map((project) => (
          <motion.div
            layout
            key={project.id}
            variants={fadeUp}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative rounded-xl p-8"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
          >
            {project.image_url && (
              <div
                className="w-full h-40 overflow-hidden rounded-sm"
                style={{ background: "var(--surface-2)" }}
              >
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-6">
              {project.featured && (
                <span
                  className="absolute top-4 right-4 text-[10px] font-medium px-3 py-1 rounded-full"
                  style={{
                    background: "var(--surface-2)",
                    color: "var(--accent)",
                  }}
                >
                  Featured
                </span>
              )}
              <h3
                className="font-bold text-base mb-2 pr-16"
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
              <div className="flex gap-2 flex-wrap mb-4">
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
                className="flex gap-4 pt-4"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium flex items-center gap-1 hover:opacity-70 transition-opacity"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Github
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium flex items-center gap-1 hover:opacity-70 transition-opacity"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Live demo <span style={{ color: "var(--accent)" }}>→</span>
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
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredProjects.length === 0 && (
        <p
          className="text-sm text-center py-16"
          style={{ color: "var(--text-muted)" }}
        >
          No projects found for this filter.
        </p>
      )}
    </main>
  );
}

export default Projects;
