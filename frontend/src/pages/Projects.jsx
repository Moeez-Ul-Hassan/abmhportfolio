import { useEffect, useState } from "react";
import "./projects.css";

const projects = [
  {
    title: "Re construction of the Boundary Wall at 132 KV Grid station GM RAJA",
    description: "Re construction of the Boundary Wall at 132 KV Grid station GM RAJA",
    img: ""
  },
  {
    title: "Repairing Brick Lining From RD 332+00 To 354+800L/S Burala Branch Canal Faisalabad",
    description: "Repairing Brick Lining From RD 332+00 To 354+800L/S Burala Branch Canal Faisalabad",
    img: ""
  },
  {
    title: "Repairing VRB Bridge between RD 26+000 To 27+000 along Hinduana Escape Faisalabad",
    description: "Repairing VRB Bridge between RD 26+000 To 27+000 along Hinduana Escape Faisalabad",
    img: ""
  },
  {
    title: "Defence City Main Gate & Mosque Haroonabad, Bahawalnagar",
    description: "Defence City Main Gate & Mosque Haroonabad, Bahawalnagar",
    img: ""
  },
  {
    title: "Repairing Residence of Executive Engineer Canal Division Faisalabad",
    description: "Repairing Residence of Executive Engineer Canal Division Faisalabad",
    img: ""
  },
  {
    title: "Repairing Office of Executive Engineer Canal Division Faisalabad",
    description: "Repairing Office of Executive Engineer Canal Division Faisalabad",
    img: ""
  },
  {
    title: "CONSTRUCTION OF 02 NO. CAT-IV QUARTER AT 132 GRID STATION SATIANA FAISALABAD",
    description: "CONSTRUCTION OF 02 NO. CAT-IV QUARTER AT 132 GRID STATION SATIANA FAISALABAD",
    img: ""
  },
  {
    title: "CONSTRUCTION OF 02 NO. ADDITIONAL CLASSROOMS 24X16 WITH 7 FT WIDE VER GGHS 38/3R TEHSEEL HAROONABAD",
    description: "CONSTRUCTION OF 02 NO. ADDITIONAL CLASSROOMS 24X16 WITH 7 FT WIDE VER GGHS 38/3R TEHSEEL HAROONABAD",
    img: ""
  }
];

const ongoingProjects = [
  {
    title: "Ongoing Project 1",
    description: "Description for ongoing project 1.",
    img: ""
  },
  {
    title: "Ongoing Project 2",
    description: "Description for ongoing project 2.",
    img: ""
  }
];

export default function Projects() {
  const [count, setCount] = useState(0);
  const [startIdx, setStartIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [ongoingStartIdx, setOngoingStartIdx] = useState(0);
  const [isOngoingPaused, setIsOngoingPaused] = useState(false);
  const maxCount = projects.length;
  const displayCount = count < maxCount ? count : `${maxCount}+`;

  // Animate counter
  useEffect(() => {
    let start = 0;
    const end = maxCount;
    if (start === end) return;
    let incrementTime = 200;
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start > end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [maxCount]);

  // Animate visible cards (carousel)
  useEffect(() => {
    if (projects.length <= 4) return;
    if (isPaused) return;
    const timer = setInterval(() => {
      setStartIdx((prev) => (prev + 1) % projects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, projects.length]);

  // Animate ongoing projects carousel
  useEffect(() => {
    if (ongoingProjects.length <= 4) return;
    if (isOngoingPaused) return;
    const timer = setInterval(() => {
      setOngoingStartIdx((prev) => (prev + 1) % ongoingProjects.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isOngoingPaused, ongoingProjects.length]);

  // Get 4 visible projects, cycling through the list
  const visibleProjects = [];
  for (let i = 0; i < 4; i++) {
    visibleProjects.push(projects[(startIdx + i) % projects.length]);
  }

  // Get 4 visible ongoing projects, cycling through the list
  const visibleOngoingProjects = [];
  for (let i = 0; i < 4; i++) {
    visibleOngoingProjects.push(ongoingProjects[(ongoingStartIdx + i) % ongoingProjects.length]);
  }

  return (
    <section className="projects-section min-h-screen py-0 px-0 bg-gray-50">
      {/* Header section with solid green background at the very top */}
      <section className="w-full bg-green-600 rounded-b-2xl shadow-lg py-16 px-4 flex flex-col items-center justify-center animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Our Projects</h1>
        <div className="flex justify-center items-center gap-4 mt-4">
          <span className="text-5xl md:text-6xl font-extrabold text-black project-counter">{displayCount}</span>
          <span className="text-lg md:text-xl text-black/80">Major Projects Completed</span>
        </div>
      </section>
      <div className="max-w-7xl mx-auto pt-12 px-4">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 animate-fade-in mb-16">
          {visibleProjects.map((project, idx) => (
            <div
              key={idx}
              className="project-card bg-white rounded-3xl shadow-2xl hover:shadow-green-200 transition-all duration-500 flex flex-col items-center p-8 group scale-100 animate-project-fade-in"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="w-full h-48 bg-gray-200 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                {/* Placeholder for project image */}
                <span className="text-gray-400 text-3xl">Image</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center group-hover:text-green-700 transition-colors duration-300 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-center text-base">{project.description}</p>
            </div>
          ))}
        </div>
        {/* Ongoing Projects Section */}
        <section className="w-full bg-green-600 rounded-2xl shadow-lg mb-12 py-10 px-4 flex flex-col items-center justify-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Ongoing Projects</h2>
        </section>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 animate-fade-in">
          {visibleOngoingProjects.map((project, idx) => (
            <div
              key={idx}
              className="project-card bg-white rounded-3xl shadow-2xl hover:shadow-green-200 transition-all duration-500 flex flex-col items-center p-8 group scale-100 animate-project-fade-in"
              onMouseEnter={() => setIsOngoingPaused(true)}
              onMouseLeave={() => setIsOngoingPaused(false)}
            >
              <div className="w-full h-48 bg-gray-200 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
                {/* Placeholder for project image */}
                <span className="text-gray-400 text-3xl">Image</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 text-center group-hover:text-green-700 transition-colors duration-300 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-center text-base">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
