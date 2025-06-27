// React Router imports for routing between pages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout component
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Page components
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AdminPanel from "./pages/AdminPanel";

// Global styles (Tailwind & custom)
import "./App.css";

// Main App Component
function App() {
  return (
    <Router basename="/abmhportfolio">
      {/* Layout wrapper: sidebar + main page content */}
      <div className="app-layout flex flex-col min-h-screen">
        {/* Sidebar stays fixed on left (or top on mobile) */}
        <Sidebar />

        {/* Main page content, pushed right by sidebar width, full height */}
        <main className="main-content w-full ml-0 md:ml-60 p-4 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
          {/* Footer placed inside main-content to ensure full width */}
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;