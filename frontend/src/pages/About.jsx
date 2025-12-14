import React from "react";
import "./About.css";
import heroBg from "../assets/bg3.jpg";
import team1 from "../assets/1.jpg";
import team2 from "../assets/2.jpg";
import team3 from "../assets/oth.jpg";
import pecLogo from "../assets/pec.jpeg";
import seLogo from "../assets/se.jpeg";
import fbrLogo from "../assets/fbr.jpeg";
import paecLogo from "../assets/PAEC.png";
import caaLogo from "../assets/caa.png";
import unhcrLogo from "../assets/UNHCR.png";

import { FaShieldAlt, FaHardHat, FaLightbulb, FaAward, FaLeaf, FaHandshake, FaTrophy } from "react-icons/fa";

const vision = "To be the benchmark of quality and reliability in national and international construction.";
const mission = "To design, develop, and deliver infrastructure solutions that meet the highest engineering and ethical standards.";

const team = [
  {
    name: "Abdul Sattar",
    title: "Chief Executive Officer (CEO)",
    img: team1,
    bio: "A visionary leader with 25+ years in civil engineering, driving ABMH Construction's growth and reputation.",
  },
  {
    name: "Ghulam Murtaza",
    title: "Chief Operating Officer (COO)",
    img: team2,
    bio: "Expert in operations and project delivery, ensuring every project meets the highest standards.",
  },
  {
    name: "Engr. Muhammad Salman Yaseen",
    title: "Chief Engineer",
    img: team3,
    bio: "Leads engineering teams with a focus on innovation, safety, and technical excellence.",
  },
  {
    name: "Engr. Syed Zohaib Ali Shah",
    title: "Chief Engineer",
    img: team3,
    bio: "Leads engineering teams with a focus on innovation, safety, and technical excellence.",
  },
  {
    name: "Associate Engr. Manzar Hussain",
    title: "Associate Engineer",
    img: team3,
    bio: "Leads engineering teams with a focus on innovation, safety, and technical excellence.",
  },
  {
    name: "Associate Engr. Abdur Rehman",
    title: "Electrical Engineer",
    img: team3,
    bio: "Leads engineering teams with a focus on innovation, safety, and technical excellence.",
  },
  
  
];

const coreValues = [
  { icon: <FaShieldAlt />, label: "Integrity", desc: "Honest, fair, and ethical operations." },
  { icon: <FaHardHat />, label: "Safety", desc: "No one gets hurt – everyone goes home safe." },
  { icon: <FaLightbulb />, label: "Innovation", desc: "Embracing new ideas and technologies." },
  { icon: <FaAward />, label: "Excellence", desc: "Uncompromising standards in all projects." },
  { icon: <FaLeaf />, label: "Sustainability", desc: "Environmentally responsible construction." },
  { icon: <FaHandshake />, label: "Reliability", desc: "We deliver on every promise." },
];

const certifications = [
  { name: "PEC Registered (Pakistan Engineering Council)", logo: pecLogo },
  { name: "FBR Registered", logo: fbrLogo },
];

const timeline = [
  { year: "2022", event: "Company Founded" },
  { year: "2023", event: "Got Work from PAEC" },
  { year: "2023", event: "Got Registered in WASO" },
  { year: "2024", event: "Expanded to C4-Category" },
];

export default function About() {
  return (
    <div className="about-root bg-[#23272f] text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="about-hero relative min-h-[60vh] flex items-center justify-center">
        <img src={heroBg} alt="About Hero" className="absolute inset-0 w-full h-full object-cover object-center brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-700/80 via-green-900/60 to-black/80" />
        <div className="relative z-10 text-center px-4 py-24 w-full flex flex-col items-center justify-center">
          <h1 className="about-hero-title text-4xl md:text-6xl font-bold mb-6 drop-shadow-xl">Building the Future of Pakistan</h1>
          <p className="about-hero-desc text-lg md:text-2xl max-w-2xl mx-auto mb-8 text-white/90">
            ABMH Construction is a leading construction and infrastructure development firm committed to excellence, innovation, and nation-building. With a legacy of high-impact projects across roads, bridges, dams, and industrial zones, we deliver quality and trust in every brick.
          </p>
        </div>
      </section>

      {/* Vision & Mission (unified green border) */}
      <section className="about-vision-mission section-spacer bg-white text-[#23272f]">
        <div className="section-container grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="vision-mission-card unified-card">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Our Vision</h2>
            <p className="text-lg">{vision}</p>
          </div>
          <div className="vision-mission-card unified-card">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Our Mission</h2>
            <p className="text-lg">{mission}</p>
          </div>
        </div>
      </section>

      {/* Our Leadership & Experts - CEO/COO only */}
      <section className="about-experts section-spacer bg-[#23272f] text-white dark-section">
        <div className="section-container">
          <h2 className="section-title">Meet Our Leadership & Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 mb-8">
            {team.slice(0,2).map((member, idx) => (
              <div key={idx} className="team-card prominent-team-card bg-white text-[#23232b] rounded-2xl shadow-xl border border-green-100 flex flex-col items-center p-8 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <img src={member.img} alt={member.name} className="w-32 h-32 object-cover rounded-full border-4 border-green-200 mb-4" />
                <h3 className="text-xl font-bold mb-1 text-green-700">{member.name}</h3>
                <p className="text-base font-semibold mb-2 text-yellow-700">{member.title}</p>
                <p className="text-sm text-gray-700 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Engineering Team - Carousel/Slider for engineers */}
      <section className="about-team section-spacer bg-white text-[#23232b]">
        <div className="section-container">
          <h2 className="section-title">Our Engineering Team</h2>
          <EngineerCarousel engineers={team.slice(2)} />
          {team.length - 2 > 3 && (
            <div className="flex justify-center mt-6">
              <EngineerSeeMoreBtn />
            </div>
          )}
        </div>
      </section>

      {/* Core Values - unified card style */}
      <section className="about-values section-spacer bg-white text-[#23272f]">
        <div className="section-container">
          <h2 className="section-title">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
            {coreValues.map((val, idx) => (
              <div key={idx} className="value-card unified-card flex flex-col items-center p-8 hover:shadow-2xl transition-all duration-300">
                <div className="text-4xl text-green-600 mb-4">{val.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-green-700">{val.label}</h3>
                <p className="text-sm text-gray-700 text-center">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Affiliations - Carousel/Slider */}
      <section className="about-certs section-spacer bg-[#23272f] text-white dark-section">
        <div className="section-container">
          <h2 className="section-title">Certifications & Affiliations</h2>
          <CertCarousel certifications={certifications} />
        </div>
      </section>

      {/* Legacy Timeline */}
      <section className="about-timeline section-spacer bg-white text-[#23272f]">
        <div className="section-container">
          <h2 className="section-title">Our Legacy</h2>
          <LegacyTimeline timeline={timeline} />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="about-cta bg-gradient-to-r from-green-700 to-green-900 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Want to partner with us or learn more?</h2>
        <p className="text-lg text-white/90 mb-8">Get in touch today and let’s build the future together.</p>
        <a href="/contact" className="inline-block px-8 py-3 rounded-full bg-yellow-400 text-gray-900 font-bold text-lg shadow-lg hover:bg-yellow-300 transition-all duration-300">Contact Us</a>
      </section>
    </div>
  );
}

function CertCarousel({ certifications }) {
  const [expanded, setExpanded] = React.useState(false);
  const [start, setStart] = React.useState(0);
  const visible = expanded ? certifications : certifications.slice(start, start + 3);
  const canPrev = start > 0 && !expanded;
  const canNext = start + 3 < certifications.length && !expanded;
  const handlePrev = () => setStart(s => Math.max(0, s - 1));
  const handleNext = () => setStart(s => (s + 3 < certifications.length ? s + 1 : s));
  return (
    <>
      <div className="cert-carousel flex items-center justify-center gap-4 mt-10">
        {!expanded && (
          <button onClick={handlePrev} disabled={!canPrev} className="carousel-arrow" aria-label="Previous" style={{opacity: canPrev ? 1 : 0.3}}>&lt;</button>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl">
          {visible.map((cert, idx) => (
            <div key={idx} className="cert-card large-cert-card flex flex-col items-center p-8 bg-white/90 rounded-2xl shadow-xl">
              <a href={cert.logo} target="_blank" rel="noopener noreferrer">
                <img src={cert.logo} alt={cert.name} className="w-28 h-28 object-contain rounded-xl bg-white mb-4 shadow-md cursor-pointer" />
              </a>
              <p className="text-base text-center mt-2 text-[#23232f] font-semibold">{cert.name}</p>
            </div>
          ))}
        </div>
        {!expanded && (
          <button onClick={handleNext} disabled={!canNext} className="carousel-arrow" aria-label="Next" style={{opacity: canNext ? 1 : 0.3}}>&gt;</button>
        )}
      </div>
      {certifications.length > 3 && (
        <div className="flex justify-center mt-6">
          <button className="see-more-btn" onClick={() => setExpanded(e => !e)}>
            {expanded ? 'See Less' : 'See More'}
          </button>
        </div>
      )}
    </>
  );
}

function EngineerCarousel({ engineers }) {
  const [expanded, setExpanded] = React.useState(false);
  const [start, setStart] = React.useState(0);
  const visible = expanded ? engineers : engineers.slice(start, start + 3);
  const canPrev = start > 0 && !expanded;
  const canNext = start + 3 < engineers.length && !expanded;
  const handlePrev = () => setStart(s => Math.max(0, s - 1));
  const handleNext = () => setStart(s => (s + 3 < engineers.length ? s + 1 : s));
  return (
    <>
      <div className="cert-carousel flex items-center justify-center gap-4 mt-10">
        {!expanded && (
          <button onClick={handlePrev} disabled={!canPrev} className="carousel-arrow" aria-label="Previous" style={{opacity: canPrev ? 1 : 0.3}}>&lt;</button>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl">
          {visible.map((member, idx) => (
            <div key={idx} className="engineer-card bg-white text-[#23232b] rounded-2xl shadow-xl flex flex-col items-center p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <img src={member.img} alt={member.name} className="w-20 h-20 object-cover rounded-full border-4 border-green-200 mb-4" />
              <h3 className="text-lg font-bold mb-1 text-green-700">{member.name}</h3>
              <p className="text-sm font-semibold mb-2 text-yellow-700">{member.title}</p>
            </div>
          ))}
        </div>
        {!expanded && (
          <button onClick={handleNext} disabled={!canNext} className="carousel-arrow" aria-label="Next" style={{opacity: canNext ? 1 : 0.3}}>&gt;</button>
        )}
      </div>
    </>
  );
}

function EngineerSeeMoreBtn() {
  return (
    <button className="see-more-btn" onClick={() => {}}>
      See More
    </button>
  );
}

function LegacyTimeline({ timeline }) {
  const [expanded, setExpanded] = React.useState(false);
  const defaultCount = 5;
  const visible = expanded ? timeline : timeline.slice(0, defaultCount);
  return (
    <>
      <div className="timeline flex flex-col md:flex-row md:items-center md:justify-between gap-8 mt-10">
        {visible.map((item, idx) => (
          <div key={idx} className="timeline-item flex flex-col items-center md:items-start md:w-1/4">
            <div className="mb-2 md:mb-4">
              <FaTrophy className="text-yellow-400" style={{ fontSize: '2rem' }} />
            </div>
            <div className="timeline-year text-lg font-bold text-green-700 mb-1">{item.year}</div>
            <div className="timeline-event text-sm text-gray-700 text-center md:text-left">{item.event}</div>
          </div>
        ))}
      </div>
      {timeline.length > defaultCount && (
        <div className="flex justify-center mt-6">
          <button className="see-more-btn" onClick={() => setExpanded(e => !e)}>
            {expanded ? 'See Less' : 'See More'}
          </button>
        </div>
      )}
    </>
  );
}