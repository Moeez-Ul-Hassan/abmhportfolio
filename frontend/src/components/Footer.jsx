// src/components/Footer.jsx
import React from 'react';
import "./Footer.css";
import xIcon from "../assets/icons/X.png";
import linkedinIcon from "../assets/icons/linkedin.png";
import githubIcon from "../assets/icons/github.png";

const Footer = () => {
  return (
    <footer className="footer">
      {/* Removed the accent bar for a more compact footer */}
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info Column */}
          <div className="footer-col company-info">
            <h3 className="footer-title">ABMH Construction</h3>
            <p className="footer-tagline">Building Pakistan's future with excellence since 2022</p>
            <div className="footer-socials">
              <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <img src={xIcon} alt="X (Twitter)" className="footer-social-img" />
              </a>
              <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <img src={linkedinIcon} alt="LinkedIn" className="footer-social-img" />
              </a>
              <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <img src={githubIcon} alt="GitHub" className="footer-social-img" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <nav className="footer-col footer-links-col" aria-label="Footer Navigation">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="./abmhportfolio" className="footer-link">Home</a></li>
              <li><a href="/abmhportfolio/About" className="footer-link">About Us</a></li>
              <li><a href="#services" className="footer-link">Services</a></li>
              <li><a href="./abmhportfolio/projects" className="footer-link">Projects</a></li>
              <li><a href="/abmhportfolio/contact" className="footer-link">Contact</a></li>
            </ul>
          </nav>

          {/* Contact Column */}
          <div className="footer-col contact-info">
            <h4 className="footer-heading">Contact Us</h4>
            <address className="footer-address">
              <span>House No. 480 B Block</span>
              <span>Millat Town, Faisalabad</span>
              <span>Pakistan</span>
              <span>Phone: <a href="tel:+923450795160" className="footer-link">+92 345 0795160</a></span>
              <span>Email: <a href="mailto:abmhconstruction@gmail.com" className="footer-link">abmhconstruction@gmail.com</a></span>
            </address>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>© {new Date().getFullYear()} ABMH Construction (Pvt) Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;