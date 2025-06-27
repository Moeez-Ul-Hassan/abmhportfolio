import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';
import contactImage from '../assets/bg2.jpg'; // Replace with your background image
import mapImage from '../assets/marker.png'; // Add a marker image (optional, or use a custom icon)

export default function Contact() {
  return (
    <div className="contact-page bg-gray-50">
      {/* Hero Section */}
      <section className="contact-hero py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            We'd love to hear from you. Contact us for inquiries, partnerships, or career opportunities.
          </p>
        </div>
      </section>


      {/* Contact Content */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <p className="text-lg text-gray-600">
                Reach out to us through any of these channels. Our team will respond promptly to your inquiries.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaMapMarkerAlt className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Our Office</h3>
                  <p className="text-gray-600">
                    House No. 480 B Block, Millat Town, Faisalabad, Pakistan
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaPhone className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Phone</h3>
                  <p className="text-gray-600">+92 345 0795160</p>
                  <p className="text-gray-600">+92 300 0054638</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaEnvelope className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600">abmhconstructionpvttta@gmail.com</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <FaClock className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Working Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="social-icon bg-green-100 hover:bg-green-200 text-green-700">
                  <FaLinkedin className="text-xl" />
                </a>
                <a href="#" className="social-icon bg-green-100 hover:bg-green-200 text-green-700">
                  <FaFacebook className="text-xl" />
                </a>
                <a href="#" className="social-icon bg-green-100 hover:bg-green-200 text-green-700">
                  <FaTwitter className="text-xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section with Background and Marker */}
      <section className="w-full h-96 relative">
        <img
          src={contactImage} // Use the same background image or a different one
          alt="Map Background"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-50"
        />
        <iframe
          title="ABMH Construction Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3407.454678544547!2d73.1257893150995!3d31.35446598142012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392268a5c5a6e2a1%3A0x9a6a3b8d2b4b4b4b!2sMillat%20Town%2C%20Faisalabad%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0, position: 'relative', zIndex: 10 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        {/* Custom Marker (Optional) */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 20,
          }}
        >
          <img src={mapImage} alt="Marker" style={{ width: '40px', height: '40px' }} />
        </div>
      </section>


      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          {/* Company Info Column */}
          <div>
            <h3 className="text-2xl font-bold mb-4">ABMH Construction</h3>
            <p className="mb-4">Building Pakistan's future with excellence since 2022</p>
            <div className="flex space-x-4">
              <a href="#" className="social-icon">
                {/* Twitter Icon */}
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="social-icon">
                {/* LinkedIn Icon */}
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Home</a></li>
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

        {/* Copyright Section */}
        <div className="copyright">
          <p>© {new Date().getFullYear()} ABMH Construction (Pvt) Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}