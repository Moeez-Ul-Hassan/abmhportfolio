// 🔁 React Router imports for routing between pages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🧱 Layout component
import Sidebar from "./components/Sidebar";

// 📄 Page components
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AdminPanel from "./pages/AdminPanel"; // ✅ import added

// 🎨 Global styles (Tailwind & custom)
import "./App.css";

// 🚀 Main App Component
function App() {
  return (
    <Router>
      {/* Layout wrapper: sidebar + main page content */}
      <div className="app-layout flex">
        
        {/* Sidebar stays fixed on left (or top on mobile) */}
        <Sidebar />

        {/* Main page content, pushed right by sidebar width */}
        <main className="main-content w-full ml-0 md:ml-60 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPanel />} /> {/* ✅ New Route */}
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;
