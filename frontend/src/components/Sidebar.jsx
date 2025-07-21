import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import linkedinIcon from "../assets/icons/linkedin.png";
import githubIcon from "../assets/icons/github.png";
import xIcon from "../assets/icons/X.png";
import "./Sidebar.css";
import { useState, useEffect, useRef } from "react";
import thIcon from "../assets/icons/th.png";

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(window.innerWidth > 680);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 680);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth > 680;
      setIsDesktop(isLargeScreen);
      setIsOpen(isLargeScreen);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isDesktop || !isOpen) return;
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isDesktop]);

  const getLinkClass = (path) =>
    `sidebar-link${location.pathname === path ? " active" : ""}`;

  return (
    <>
      {/* Hamburger Toggle Button (mobile only) */}
      {!isDesktop && (
        <button
          className="sidebar-hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle sidebar"
        >
          <img src={thIcon} alt="Menu" style={{ width: 28, height: 28 }} />
        </button>
      )}
      <div
        className={`sidebar${isOpen ? " active" : ""}`}
        ref={sidebarRef}
        style={
          !isDesktop
            ? {
                transform: isOpen ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 0.3s",
                zIndex: 100,
              }
            : {}
        }
      >
        <div className="sidebar-header">
          <img src={logo} alt="ABMH Logo" className="sidebar-logo" />
          <h1 className="sidebar-title">ABMH</h1>
        </div>
        <div className="sidebar-separator" />
        <nav className="sidebar-nav">
          <Link to="/" className={getLinkClass("/")}>Home</Link>
          <Link to="/about" className={getLinkClass("/about")}>About</Link>
          <Link to="/projects" className={getLinkClass("/projects")}>Projects</Link>
          <Link to="/contact" className={getLinkClass("/contact")}>Contact</Link>
        </nav>
        <div className="sidebar-separator mt-4" />
        <div className="sidebar-footer">
          <div className="sidebar-footer-text">Developed by Tamaq Tech</div>
          <div className="sidebar-footer-icons-row">
            <div className="sidebar-footer-icons">
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <img src={linkedinIcon} alt="LinkedIn" className="sidebar-footer-img" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <img src={githubIcon} alt="GitHub" className="sidebar-footer-img" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}