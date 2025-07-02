// src/components/Footer.jsx
import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info Column */}
          <div>
            <h3 className="text-2xl font-bold mb-4">ABMH Construction</h3>
            <p className="mb-4">Building Pakistan's future with excellence since 2022</p>
            <div className="flex space-x-4">
              <a href="https://x.com/yourprofile" className="social-icon" target="_blank" rel="noopener noreferrer">
                {/* X (Twitter) Icon */}
                <svg viewBox="0 0 1200 1227" fill="#FFFFFF" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1199.61 21.5H1092.6L600.5 726.5L1087.5 1205.5H1199.61L712.5 726.5L1199.61 21.5ZM0.5 21.5H107.5L599.5 726.5L112.5 1205.5H0.5L487.5 726.5L0.5 21.5Z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/yourprofile" className="social-icon" target="_blank" rel="noopener noreferrer">
                {/* LinkedIn Icon */}
                <svg fill="#FFFFFF" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="./abmhportfolio" className="footer-link">Home</a></li>
              <li><a href="/abmhportfolio/About" className="footer-link">About Us</a></li>
              <li><a href="#services" className="footer-link">Services</a></li>
              <li><a href="./abmhportfolio/projects" className="footer-link">Projects</a></li>
              <li><a href="/abmhportfolio/contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Clients Column */}
          <div>
            <h4 className="footer-heading">Our Clients</h4>
            <ul className="footer-links">
              <li>DHA Bahawalpur</li>
              <li>Frontier Works Organization</li>
              <li>National Highway Authority</li>
              <li>Pakistan Atomic Energy</li>
              <li>UNHCR Pakistan</li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="footer-heading">Contact Us</h4>
            <address className="address">
              <p className="mb-2">House No. 480 B Block</p>
              <p className="mb-2">Millat Town, Faisalabad</p>
              <p className="mb-2">Pakistan</p>
              <p className="mb-2">Phone: +92 345 0795160</p>
              <p className="mb-2">Email: abmhconstruction@gmail.com</p>
            </address>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="copyright">
        <p>© {new Date().getFullYear()} ABMH Construction (Pvt) Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;