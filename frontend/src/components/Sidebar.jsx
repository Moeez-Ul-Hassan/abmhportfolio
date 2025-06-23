// Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/logo.png'
import "./Sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  const getLinkClass = (path) =>
    `sidebar-link ${location.pathname === path ? "active" : ""}`;

  return (
    <div className="sidebar">
      {/* Logo + Company Name  */}
      <div className="sidebar-header">
        <img src={logo} alt="ABMH Logo" className="sidebar-logo" />
        <h1 className="sidebar-title">ABMH</h1>
      </div>

      {/*  Green line under logo  */}
      <div className="sidebar-separator" />

      {/*  Main Navigation  */}
      <nav className="sidebar-nav">
        <Link to="/" className={getLinkClass("/")}>Home</Link>
        <Link to="/about" className={getLinkClass("/about")}>About</Link>
        <Link to="/projects" className={getLinkClass("/projects")}>Projects</Link>
        <Link to="/contact" className={getLinkClass("/contact")}>Contact</Link>

        <div className="sidebar-separator mt-4" />

        <Link to="/admin" className="sidebar-link admin-link">
          Admin Panel
        </Link>
      </nav>

      {/*  Footer */}
      <div className="sidebar-footer">
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <p className="footer-text">
          Developed by Tamaq Tech<br />All rights reserved
        </p>
      </div>
    </div>
  );
}
