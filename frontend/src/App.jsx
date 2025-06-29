// src/App.jsx

// React Router imports for routing between pages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout components
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
import { useState } from "react";

// Main App Component
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  
  return (
    <Router basename="/abmhportfolio">
      <div className="app-layout flex flex-col min-h-screen">

        {/* Sidebar with toggle control */}
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        {/* Main content area */}
       <main
  className={`main-content flex-1 transition-all duration-300 ${
    isSidebarOpen || window.innerWidth >= 680 ? "ml-64" : "ml-0"
  }`}
>



          <div className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </div>
    </Router>
  );
}

export default App;