import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api/axios";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const isSubmitting = useRef(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isSubmitting.current) {
      return;
    }

    if (!form.name || !form.email || !form.message) {
      return setError("All fields are required!");
    }

    isSubmitting.current = true;
    setLoading(true);

    try {
      await api.post("/messages", form);
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
      isSubmitting.current = false;
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-5 sm:px-8 pb-24">
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
          Contact
        </p>
        <h1
          className="text-3xl sm:text-4xl font-bold mb-3"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: "var(--text-primary)",
          }}
        >
          Get in touch
        </h1>
        <p
          className="text-sm max-w-md leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Have a question, an opportunity, or just want to say hi? Send a
          message and I'll get back to you.
        </p>
      </motion.section>

      <div className="grid grid-cols-1  sm:grid-cols-[1fr_260px] gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                {error && (
                  <p className="text-sm" style={{ color: "#A32D2D" }}>
                    {error}
                  </p>
                )}

                <div>
                  <label
                    className="text-xs font-medium block mb-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-lg px-3 py-2 text-sm"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="text-xs font-medium block mb-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg px-3 py-2 text-sm"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="text-xs font-medium block mb-1"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-lg px-3 py-2 text-sm resize-none"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="self-start px-6 py-2.5 rounded-lg text-sm font-medium mt-1 transition-opacity hover:opacity-90 disabled:opacity-50"
                  style={{
                    background: "var(--accent)",
                    color: "var(--accent-text)",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center py-16"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl"
                  style={{
                    background: "var(--surface-2)",
                    color: "var(--accent)",
                  }}
                >
                  ✓
                </div>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    color: "var(--text-primary)",
                  }}
                >
                  Message sent
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Thanks for reaching out! I'll get back to you soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl p-5 h-fit"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="text-[11px] font-medium tracking-widest uppercase mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            Find me elsewhere
          </p>

          <a
            href="https://github.com/Krimzonn"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm mb-3 hover:opacity-70 transition-opacity"
            style={{ color: "var(--text-secondary)" }}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/abdul-ahad-0bbb94408"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
            style={{ color: "var(--text-secondary)" }}
          >
            LinkedIn
          </a>
        </motion.div>
      </div>
    </main>
  );
}

export default Contact;
