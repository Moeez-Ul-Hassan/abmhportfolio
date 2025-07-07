import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';
import contactImage from '../assets/bg2.jpg'; // Replace with your background image
import mapImage from '../assets/marker.png'; // Add a marker image (optional, or use a custom icon)

export default function Contact() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="contact-page bg-gray-50">
      {/* Hero Section with overlay */}
      <section className="contact-hero py-24 bg-gradient-to-r from-green-700 to-green-900 text-white relative flex items-center justify-center">
        <img src={contactImage} alt="Contact Hero" className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-800/80 via-green-900/60 to-black/80 z-10" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-20">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 drop-shadow-lg">Get In Touch</h1>
          <p className="text-xl md:text-2xl mb-6 font-semibold drop-shadow-lg text-black">We'd love to hear from you. Let's build something great together.</p>
          <p className="text-base md:text-lg mb-6 text-black drop-shadow-lg font-medium">Contact us for inquiries, partnerships, or career opportunities.</p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full" />
        </div>
      </section>

      {/* Contact Content */}
      <section className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 text-center">Contact Information</h2>
          <p className="text-base md:text-lg text-gray-600 mb-8 text-center">
            Reach out to us through any of these channels. Our team will respond promptly to your inquiries.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full mb-8">
            {/* Address */}
            <div className="bg-white rounded-xl shadow-md p-4 flex items-start gap-3 hover:shadow-green-200 transition-all duration-300 min-h-[90px]">
              <div className="bg-green-100 p-2 rounded-full">
                <FaMapMarkerAlt className="text-green-600 text-lg" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-1">Our Office</h3>
                <p className="text-base md:text-lg text-gray-600">House No. 480 B Block, Millat Town, Faisalabad, Pakistan</p>
              </div>
            </div>
            {/* Phone */}
            <div className="bg-white rounded-xl shadow-md p-4 flex items-start gap-3 hover:shadow-green-200 transition-all duration-300 min-h-[90px]">
              <div className="bg-green-100 p-2 rounded-full">
                <FaPhone className="text-green-600 text-lg" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-1">Phone</h3>
                <p className="text-base md:text-lg text-gray-600">+92 345 0795160</p>
                <p className="text-base md:text-lg text-gray-600">+92 300 0054638</p>
              </div>
            </div>
            {/* Email */}
            <div className="bg-white rounded-xl shadow-md p-4 flex items-start gap-3 hover:shadow-green-200 transition-all duration-300 min-h-[90px]">
              <div className="bg-green-100 p-2 rounded-full">
                <FaEnvelope className="text-green-600 text-lg" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-1">Email</h3>
                <p className="text-base md:text-lg text-gray-600">abmhconstructionpvttta@gmail.com</p>
              </div>
            </div>
            {/* Hours */}
            <div className="bg-white rounded-xl shadow-md p-4 flex items-start gap-3 hover:shadow-green-200 transition-all duration-300 min-h-[90px]">
              <div className="bg-green-100 p-2 rounded-full">
                <FaClock className="text-green-600 text-lg" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-1">Working Hours</h3>
                <p className="text-base md:text-lg text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM</p>
                <p className="text-base md:text-lg text-gray-600">Sat: 9:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>
          {/* Social Media */}
          <div className="pt-2 pb-6 w-full flex justify-center">
            <div className="flex space-x-4">
              <a href="#" className="social-icon bg-white rounded-full shadow-md p-3 hover:bg-green-100 hover:scale-110 transition-all duration-300 text-green-700">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="social-icon bg-white rounded-full shadow-md p-3 hover:bg-green-100 hover:scale-110 transition-all duration-300 text-green-700">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" className="social-icon bg-white rounded-full shadow-md p-3 hover:bg-green-100 hover:scale-110 transition-all duration-300 text-green-700">
                <FaTwitter className="text-xl" />
              </a>
            </div>
          </div>
          {/* Send a Message Button */}
          <div className="w-full">
            <button
              className="w-full bg-green-700 hover:bg-yellow-400 hover:text-green-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md text-lg"
              onClick={() => setShowForm(true)}
            >
              Send a Message
            </button>
          </div>
        </div>
        {/* Contact Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-2xl relative w-full max-w-lg mx-4 animate-fade-in">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-green-700 text-2xl font-bold focus:outline-none"
                onClick={() => setShowForm(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input type="text" id="name" className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-transparent" placeholder="Your name" />
                    <label htmlFor="name" className="absolute left-4 top-3 text-gray-500 text-base transition-all duration-200 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-green-700 bg-white px-1 pointer-events-none">Name</label>
                  </div>
                  <div className="relative">
                    <input type="email" id="email" className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-transparent" placeholder="Your email" />
                    <label htmlFor="email" className="absolute left-4 top-3 text-gray-500 text-base transition-all duration-200 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-green-700 bg-white px-1 pointer-events-none">Email</label>
                  </div>
                </div>
                <div className="relative">
                  <input type="text" id="subject" className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-transparent" placeholder="Subject" />
                  <label htmlFor="subject" className="absolute left-4 top-3 text-gray-500 text-base transition-all duration-200 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-green-700 bg-white px-1 pointer-events-none">Subject</label>
                </div>
                <div className="relative">
                  <textarea id="message" rows="5" className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-transparent" placeholder="Your message"></textarea>
                  <label htmlFor="message" className="absolute left-4 top-3 text-gray-500 text-base transition-all duration-200 peer-focus:-top-5 peer-focus:text-sm peer-focus:text-green-700 bg-white px-1 pointer-events-none">Message</label>
                </div>
                <button type="submit" className="w-full bg-green-700 hover:bg-yellow-400 hover:text-green-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md text-lg">Send Message</button>
              </form>
            </div>
          </div>
        )}
      </section>

      {/* Map Section with glassmorphism overlay */}
      <section className="w-full h-96 relative mt-12">
        <img src={contactImage} alt="Map Background" className="absolute top-0 left-0 w-full h-full object-cover opacity-50" />
        <iframe
          title="ABMH Construction Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3407.454678544547!2d73.1257893150995!3d31.35446598142012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392268a5c5a6e2a1%3A0x9a6a3b8d2b4b4b4b!2sMillat%20Town%2C%20Faisalabad%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0, position: 'relative', zIndex: 10 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        {/* Glassmorphism overlay card */}
        <div className="absolute left-8 bottom-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 flex items-center gap-4 z-20 border-l-4 border-green-700">
          <img src={mapImage} alt="Marker" style={{ width: '40px', height: '40px' }} className="mr-4" />
          <div>
            <h3 className="text-lg font-bold text-green-700 mb-1">Our Office</h3>
            <p className="text-gray-700">House No. 480 B Block, Millat Town, Faisalabad, Pakistan</p>
          </div>
        </div>
      </section>
    </div>
  );
}