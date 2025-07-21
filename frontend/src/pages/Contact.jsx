import React, { useState } from 'react';
import './Contact.css';
import heroBg from '../assets/bg4.jpg';
import mapMarker from '../assets/marker.png';
import emailjs from 'emailjs-com'; // <-- Add this import

import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaUser, FaRegEnvelope, FaRegCommentDots, FaBuilding, FaFileAlt, FaUserTie } from 'react-icons/fa';

const CONTACT_INFO = {
  address: 'House No. 480 B Block, Millat Town, Faisalabad, Pakistan',
  phoneLandline: '+92 345 0795160',
  phoneMobile: '+92 300 0054638',
  email: 'abmhconstructions@gmail.com',
  hours: 'Monday to Friday  9:00 AM to 5:00 PM',
};

const FAQS = [
  {
    q: 'How soon will I get a response?',
    a: 'We aim to respond to all inquiries within 1 business day.'
  },
  {
    q: 'Can I request a project proposal online?',
    a: 'Yes, use the form or the quick access card below to request a proposal.'
  },
  {
    q: 'How do I apply for a job or register as a vendor?',
    a: 'See the quick access cards below for careers and vendor registration.'
  }
];

const QUICK_LINKS = [
  { icon: <FaUserTie />, label: 'Work With Us', href: '#' },
  { icon: <FaFileAlt />, label: 'Request a Proposal', href: '#' },
  { icon: <FaBuilding />, label: 'Vendor Registration', href: '#' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full Name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Invalid email.';
    if (!form.message.trim()) errs.message = 'Message is required.';
    return errs;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSendError('');
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setSuccess(false);
      return;
    }
    setSending(true);
    // TODO: Replace these with your actual EmailJS service/template/user IDs
    const service_id = 'service_0qcvsd5';
    const template_id = 'template_l8dxfmm';
    const user_id = 'Q1xhwy7bmowu62AfY';
    const templateParams = {
      name: form.name,
      email: form.email,
      message: form.message,
      title: form.subject, // or subject if your template uses {{subject}}
      phone: form.phone,   // optional, if you want to add it to the template
    };
    emailjs.send(service_id, template_id, templateParams, user_id)
      .then(() => {
        setSuccess(true);
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
        setErrors({});
        setSending(false);
        setTimeout(() => setSuccess(false), 4000);
      })
      .catch((err) => {
        setSendError('Failed to send. Please try again later.');
        setSending(false);
      });
  }

  return (
    <div className="contact-root bg-[#23272f] text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="about-hero relative min-h-[50vh] flex items-center justify-center">
        <img src={heroBg} alt="Contact Hero" className="absolute inset-0 w-full h-full object-cover object-center brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-700/80 via-green-900/60 to-black/80" />
        <div className="relative z-10 text-center px-4 py-20 w-full flex flex-col items-center justify-center">
          <h1 className="about-hero-title text-4xl md:text-6xl font-bold mb-6 drop-shadow-xl">Get in Touch With Us</h1>
          <p className="about-hero-desc text-lg md:text-2xl max-w-2xl mx-auto mb-8 text-white/90">
            We’re here to answer your queries and discuss your next big idea.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="section-spacer bg-white text-[#23232b]">
        <div className="section-container grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="unified-card p-8 md:p-12 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-green-700">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2 font-semibold flex items-center gap-2"><FaUser className="text-green-600" /> Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.name ? 'border-red-500 animate-shake' : 'border-gray-300'}`}
                      placeholder="Your full name"
                    />
                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2 font-semibold flex items-center gap-2"><FaRegEnvelope className="text-green-600" /> Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.email ? 'border-red-500 animate-shake' : 'border-gray-300'}`}
                      placeholder="you@email.com"
                    />
                    {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 mb-2 font-semibold flex items-center gap-2"><FaPhone className="text-green-600" /> Phone Number</label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 mb-2 font-semibold flex items-center gap-2"><FaRegCommentDots className="text-green-600" /> Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Subject"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700 mb-2 font-semibold flex items-center gap-2"><FaRegCommentDots className="text-green-600" /> Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${errors.message ? 'border-red-500 animate-shake' : 'border-gray-300'}`}
                    placeholder="Type your message here..."
                  ></textarea>
                  {errors.message && <div className="text-red-500 text-sm mt-1">{errors.message}</div>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 mt-2"
                  disabled={sending}
                >
                  {sending ? 'Sending...' : 'Send Inquiry'}
                </button>
                {success && <div className="text-green-600 text-center font-semibold mt-4 animate-fade-in">We've got your message. Our team will respond shortly.</div>}
                {sendError && <div className="text-red-600 text-center font-semibold mt-4 animate-fade-in">{sendError}</div>}
              </form>
            </div>
          </div>
          {/* Contact Info */}
          <div className="unified-card p-8 rounded-2xl shadow-xl flex flex-col gap-6 justify-between">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Reach Us Directly</h2>
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-green-600 text-2xl mt-1" />
              <div>
                <div className="font-semibold">Head Office Address</div>
                <div className="text-gray-700">{CONTACT_INFO.address}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaPhone className="text-green-600 text-2xl mt-1" />
              <div>
                <div className="font-semibold">Phone Numbers</div>
                <div className="text-gray-700">{CONTACT_INFO.phoneLandline}</div>
                <div className="text-gray-700">{CONTACT_INFO.phoneMobile}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-green-600 text-2xl mt-1" />
              <div>
                <div className="font-semibold">Email Address</div>
                <div className="text-gray-700 break-all">{CONTACT_INFO.email}</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FaClock className="text-green-600 text-2xl mt-1" />
              <div>
                <div className="font-semibold">Office Hours</div>
                <div className="text-gray-700">{CONTACT_INFO.hours}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section w-full h-96 relative">
        <img
          src={heroBg}
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
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 20,
          }}
        >
          <img src={mapMarker} alt="Marker" style={{ width: '40px', height: '40px' }} />
        </div>
      </section>

      {/* FAQ & Quick Access */}
      <section className="section-spacer bg-white text-[#23232b]">
        <div className="section-container grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* FAQs */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-green-700">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="unified-card p-6">
                  <div className="font-semibold mb-2">{faq.q}</div>
                  <div className="text-gray-700">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Quick Access Cards */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-green-700">Quick Access</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {QUICK_LINKS.map((link, idx) => (
                <a key={idx} href={link.href} className="unified-card flex flex-col items-center justify-center p-8 hover:shadow-2xl transition-all duration-300 text-center">
                  <div className="text-3xl text-green-700 mb-2">{link.icon}</div>
                  <div className="font-semibold text-lg text-green-800">{link.label}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}