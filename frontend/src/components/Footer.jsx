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
              <a href="#" className="social-icon">
                {/* Twitter Icon */}
                <svg fill="#FFFFFF" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="social-icon">
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