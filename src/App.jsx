import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Now from "./pages/Now.jsx";
import Contact from "./pages/Contact.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute.jsx";
import AdminProjects from "./pages/admin/AdminProjects.jsx";
import AdminSkills from "./pages/admin/AdminSkills.jsx";
import AdminTimeline from "./pages/admin/AdminTimeline.jsx";
import AdminMessages from "./pages/admin/AdminMessages.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes with navbar */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route
          path="/projects"
          element={
            <>
              <Navbar />
              <Projects />
            </>
          }
        />
        <Route
          path="/now"
          element={
            <>
              <Navbar />
              <Now />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
            </>
          }
        />

        {/* Admin routes - no navbar */}
        <Route path="/admin" element={<AdminLogin />} />

        <Route
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/timeline" element={<AdminTimeline />} />
          <Route path="/admin/skills" element={<AdminSkills />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
