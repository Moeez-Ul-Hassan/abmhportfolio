// src/App.jsx

// React Router imports for modern routing
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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

// Define routes configuration
const router = createBrowserRouter(
  [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/projects", element: <Projects /> },
    { path: "/contact", element: <Contact /> },
    { path: "/admin", element: <AdminPanel /> },
  ],
  {
    basename: "/abmhportfolio",
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

// Main App Component
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>}>
      <div className="app-layout flex flex-col min-h-screen">
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
        <main
          className={`main-content w-full ml-0 md:ml-60 p-4 flex-1 ${
            isSidebarOpen ? "active md:ml-60" : ""
          } transition-[margin-left] duration-300 ease-in-out`}
        >
          <Footer />
        </main>
      </div>
    </RouterProvider>
  );
}

export default App;