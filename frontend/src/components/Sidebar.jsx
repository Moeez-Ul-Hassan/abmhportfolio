import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Sidebar.css";
import { useState, useEffect, useRef } from "react";

export default function Sidebar({ setIsSidebarOpen }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const sidebarRef = useRef(null);

  const getLinkClass = (path) =>
    `sidebar-link ${location.pathname === path ? "active" : ""}`;

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth > 680;
      setIsDesktop(isLargeScreen);
      setIsOpen(isLargeScreen);
      setIsSidebarOpen(isLargeScreen);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarOpen]);

  useEffect(() => {
    setIsSidebarOpen(isOpen);
    const handleClickOutside = (event) => {
      if (!isDesktop && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setIsSidebarOpen, isDesktop]);

const toggleSidebar = () => {
  setIsOpen(!isOpen);
};

  return (
    <>
      {/* Mobile Toggle Button (only shows on mobile) */}
      {!isDesktop && (
        <button
          className="fixed top-4 left-4 z-50 bg-gray-900 p-2 rounded-md focus:outline-none"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {!isOpen && (
  <button 
    onClick={toggleSidebar}
    className="md:hidden focus:outline-none"
  >
    <div className="space-y-1.5 w-6">
      <span className="block h-0.5 w-6 bg-white"></span>
      <span className="block h-0.5 w-6 bg-white"></span>
      <span className="block h-0.5 w-6 bg-white"></span>
    </div>
  </button>
)}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`sidebar ${isOpen ? "active" : ""}`}
        ref={sidebarRef}
      >
        <div className="sidebar-header justify-between w-full items-center flex">
          <div className="flex items-center gap-2">
            <img src={logo} alt="ABMH Logo" className="sidebar-logo" />
            <h1 className="sidebar-title">ABMH</h1>
          </div>
          {!isDesktop && (
            <button
              onClick={toggleSidebar}
              className="text-white text-xl hover:text-red-400 focus:outline-none"
              aria-label="Close sidebar"
            >
              ✖
            </button>
          )}
        </div>

        <div className="sidebar-separator" />

        <nav className="sidebar-nav">
          <Link to="/" className={getLinkClass("/")} onClick={() => !isDesktop && toggleSidebar()}>
            Home
          </Link>
          <Link to="/about" className={getLinkClass("/about")} onClick={() => !isDesktop && toggleSidebar()}>
            About
          </Link>
          <Link to="/projects" className={getLinkClass("/projects")} onClick={() => !isDesktop && toggleSidebar()}>
            Projects
          </Link>
          <Link to="/contact" className={getLinkClass("/contact")} onClick={() => !isDesktop && toggleSidebar()}>
            Contact
          </Link>
          <div className="sidebar-separator mt-4" />
          {/* Removed Admin Panel link */}
        </nav>

        <div className="sidebar-footer">
          <div className="social-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.014-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.097-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 7.844c.85.004 1.705.114 2.504.336 1.909-1.295 2.747-1.026 2.747-1.026.545 1.377.201 2.394.099 2.647.64.698 1.03 1.591 1.03 2.682 0 3.841-2.337 4.687-4.565 4.935.359.308.678.916.678 1.846 0 1.332-.012 2.406-.012 2.734 0 .267.18.577.688.479C19.137 20.166 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.47 2H3.53A1.53 1.53 0 002 3.53v16.94A1.53 1.53 0 003.53 22h16.94A1.53 1.53 0 0022 20.47V3.53A1.53 1.53 0 0020.47 2zM8 19H5V9h3v10zm-1.5-11.32a1.82 1.82 0 110-3.64 1.82 1.82 0 010 3.64zm11.5 11.32h-3V14c0-1.12-.02-2.56-1.56-2.56-1.57 0-1.81 1.22-1.81 2.48v5.08h-3V9h2.88v1.33h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.58v5.65z" />
              </svg>
            </a>
          </div>
          <p className="footer-text">Developed by Tamaq Tech<br />All rights reserved</p>
        </div>
      </div>
    </>
  );
}