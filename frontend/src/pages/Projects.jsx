import { useEffect, useState } from "react";
import "./projects.css";
import defaultImg from "../assets/bg.jpg";

const projects = [
  {
    title: "Boundary Wall Reconstruction, Faisalabad",
    fullTitle: "Re construction of the Boundary Wall at 132 KV Grid station GM RAJA",
    fullDescription: "Re construction of the Boundary Wall at 132 KV Grid station GM RAJA",
    img: ""
  },
  {
    title: "Brick Lining, Burala Branch Canal",
    fullTitle: "Repairing Brick Lining From RD 332+00 To 354+800L/S Burala Branch Canal Faisalabad",
    fullDescription: "Repairing Brick Lining From RD 332+00 To 354+800L/S Burala Branch Canal Faisalabad",
    img: ""
  },
  {
    title: "VRB Bridge Repair, Hinduana Escape",
    fullTitle: "Repairing VRB Bridge between RD 26+000 To 27+000 along Hinduana Escape Faisalabad",
    fullDescription: "Repairing VRB Bridge between RD 26+000 To 27+000 along Hinduana Escape Faisalabad",
    img: ""
  },
  {
    title: "Defence City Main Gate & Mosque, Bahawalnagar",
    fullTitle: "Defence City Main Gate & Mosque Haroonabad, Bahawalnagar",
    fullDescription: "Defence City Main Gate & Mosque Haroonabad, Bahawalnagar",
    img: ""
  },
  {
    title: "Executive Engineer Residence, Faisalabad",
    fullTitle: "Repairing Residence of Executive Engineer Canal Division Faisalabad",
    fullDescription: "Repairing Residence of Executive Engineer Canal Division Faisalabad",
    img: ""
  },
  {
    title: "Executive Engineer Office, Faisalabad",
    fullTitle: "Repairing Office of Executive Engineer Canal Division Faisalabad",
    fullDescription: "Repairing Office of Executive Engineer Canal Division Faisalabad",
    img: ""
  },
  {
    title: "CAT-IV Quarters, Satiyana Grid Station",
    fullTitle: "CONSTRUCTION OF 02 NO. CAT-IV QUARTER AT 132 GRID STATION SATIANA FAISALABAD",
    fullDescription: "CONSTRUCTION OF 02 NO. CAT-IV QUARTER AT 132 GRID STATION SATIANA FAISALABAD",
    img: ""
  },
  {
    title: "Classrooms, GGHS 38/3R, Haroonabad",
    fullTitle: "CONSTRUCTION OF 02 NO. ADDITIONAL CLASSROOMS 24X16 WITH 7 FT WIDE VER GGHS 38/3R TEHSEEL HAROONABAD",
    fullDescription: "CONSTRUCTION OF 02 NO. ADDITIONAL CLASSROOMS 24X16 WITH 7 FT WIDE VER GGHS 38/3R TEHSEEL HAROONABAD",
    img: ""
  }
];

const ongoingProjects = [
  {
    title: "Ongoing Project 1",
    description: "Description for ongoing project 1.",
    fullTitle: "Ongoing Project 1",
    fullDescription: "Description for ongoing project 1.",
    img: ""
  },
  {
    title: "Ongoing Project 2",
    description: "Description for ongoing project 2.",
    fullTitle: "Ongoing Project 2",
    fullDescription: "Description for ongoing project 2.",
    img: ""
  }
];

function ProjectCard({ project }) {
  return (
    <div className="project-card bg-white rounded-3xl shadow-2xl hover:shadow-green-200 transition-all duration-500 flex flex-col items-center justify-center p-8 group scale-100 animate-project-fade-in border border-gray-100 w-full max-w-[380px] min-h-[180px] mx-auto">
      <div className="w-full h-32 bg-gray-200 rounded-2xl mb-4 flex items-center justify-center overflow-hidden">
        {project.img ? (
          <img src={project.img} alt={project.title} className="object-cover w-full h-full" />
        ) : (
          <img src={defaultImg} alt="Default" className="object-cover w-full h-full opacity-60" />
        )}
      </div>
      <h3 className="text-xl md:text-2xl font-semibold text-black text-center group-hover:text-yellow-500 transition-colors duration-300 mb-0">{project.title}</h3>
    </div>
  );
}

export default function Projects() {
  const [startIdx, setStartIdx] = useState(0);
  const visibleCount = 3;
  const total = projects.length;

  const handlePrev = () => {
    setStartIdx((prev) => (prev - 1 + total) % total);
  };
  const handleNext = () => {
    setStartIdx((prev) => (prev + 1) % total);
  };

  const visibleProjects = [];
  for (let i = 0; i < visibleCount; i++) {
    visibleProjects.push(projects[(startIdx + i) % total]);
  }

  return (
    <section className="projects-section min-h-screen py-0 px-0 bg-[#f7fafc]">
      <section className="w-full bg-green-700 rounded-b-2xl shadow-lg py-16 px-4 flex flex-col items-center justify-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Our Projects</h1>
        <div className="flex justify-center items-center gap-2 mt-4">
          <span className="text-5xl md:text-6xl font-extrabold text-yellow-400 project-counter">10+</span>
          <span className="text-base md:text-lg text-black font-bold uppercase tracking-wide" style={{fontSize: '1.5rem', letterSpacing: '0.02em'}}>Major Projects</span>
        </div>
      </section>
      <div className="max-w-5xl mx-auto pt-12 px-4">
        <div className="flex items-center justify-center gap-4 mb-12">
          <button
            className="rounded-full bg-green-700 text-white w-12 h-12 flex items-center justify-center text-2xl shadow-md hover:bg-yellow-400 hover:text-green-900 transition-all duration-300"
            onClick={handlePrev}
            aria-label="Previous"
          >
            &#8592;
          </button>
          <div className="flex gap-8 w-full justify-center">
            {visibleProjects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
          <button
            className="rounded-full bg-green-700 text-white w-12 h-12 flex items-center justify-center text-2xl shadow-md hover:bg-yellow-400 hover:text-green-900 transition-all duration-300"
            onClick={handleNext}
            aria-label="Next"
          >
            &#8594;
          </button>
        </div>
        {/* Ongoing Projects Section */}
        <section className="w-full bg-green-50 rounded-2xl shadow-lg mb-12 py-10 px-4 flex flex-col items-center justify-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">Ongoing Projects</h2>
          <div className="flex flex-wrap gap-8 justify-center w-full">
            {ongoingProjects.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
