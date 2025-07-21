import React, { useState } from "react";
import "./projects.css";
import heroBg from "../assets/bg4.jpg";
import placeholderImg from "../assets/bg3.jpg";

// Shortened project names for demo, now with images
const constructionProjects = [
  { name: "Boundary Wall, GM RAJA", img: placeholderImg },
  { name: "Brick Lining, Burala Canal", img: placeholderImg },
  { name: "VRB Bridge, Hinduana", img: placeholderImg },
  { name: "Main Gate, Haroonabad", img: placeholderImg },
  { name: "Residence, Canal Division", img: placeholderImg },
  { name: "Office, Canal Division", img: placeholderImg },
  { name: "CAT-IV Quarters, Satiana", img: placeholderImg },
  { name: "Classrooms, GGHS 38/3R", img: placeholderImg },
];

const electricalProjects = [
  { name: "132kV Substation, City A", img: placeholderImg },
  { name: "Grid Station, City B", img: placeholderImg },
  { name: "Smart Metering, City C", img: placeholderImg },
  { name: "Transmission Line, City D", img: placeholderImg },
];

const supplyProjects = [
  { name: "Cement & Steel, Lahore", img: placeholderImg },
  { name: "Equipment, Karachi", img: placeholderImg },
  { name: "Logistics, Multan", img: placeholderImg },
  { name: "Pipes, Islamabad", img: placeholderImg },
];

function ProjectSection({ title, projects }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? projects : projects.slice(0, 3);
  return (
    <section className="project-category-section section-spacer bg-white text-[#23232b]">
      <div className="section-container">
        <h2 className="section-title">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          {visible.map((proj, idx) => (
            <div key={idx} className="unified-card flex flex-col items-center justify-center text-center p-8 hover:shadow-2xl transition-all duration-300">
              <a href={proj.img} target="_blank" rel="noopener noreferrer">
                <img src={proj.img} alt={proj.name} className="w-48 h-48 object-contain rounded-xl bg-white mb-4 shadow-md cursor-pointer mx-auto" />
              </a>
              <h3 className="text-lg font-bold mb-1 text-green-700 text-center">{proj.name}</h3>
            </div>
          ))}
        </div>
        {projects.length > 3 && (
          <div className="flex justify-center mt-6">
            <button className="see-more-btn" onClick={() => setExpanded(e => !e)}>
              {expanded ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default function Projects() {
  return (
    <div className="about-root bg-[#23272f] text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="about-hero relative min-h-[60vh] flex items-center justify-center">
        <img src={heroBg} alt="Projects Hero" className="absolute inset-0 w-full h-full object-cover object-center brightness-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-700/80 via-green-900/60 to-black/80" />
        <div className="relative z-10 text-center px-4 py-24 w-full flex flex-col items-center justify-center">
          <h1 className="about-hero-title text-4xl md:text-6xl font-bold mb-6 drop-shadow-xl">Our Projects</h1>
          <p className="about-hero-desc text-lg md:text-2xl max-w-2xl mx-auto mb-8 text-white/90">
            From highways to high-voltage systems, we build with purpose and precision.
          </p>
        </div>
      </section>

      {/* Project Section clear Sections */}
      <ProjectSection title="Construction Projects" projects={constructionProjects} />
      <ProjectSection title="Electrical Projects" projects={electricalProjects} />
      <ProjectSection title="Supply Projects" projects={supplyProjects} />
    </div>
  );
}
