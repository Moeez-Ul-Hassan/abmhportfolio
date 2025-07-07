import { FaCheckCircle, FaHardHat, FaUserTie, FaUsers, FaAward, FaCogs, FaLightbulb } from "react-icons/fa";
import siteImg from "../assets/clients.jpg"; // Use a high-quality team image
import valueImg from "../assets/bg5.jpg"; // Use a site/project image
import cert1 from '../assets/se.jpeg';
import cert2 from '../assets/pec.jpeg';
import cert3 from '../assets/fbr.jpeg';
import "./About.css";

// Example certificate data (replace img with your actual certificate image paths from src/assets)
const certificates = [
  {
    title: "Clearance Certificate",
    description: "Secuirity Exchange Clearance",
    img: cert1
  },
  {
    title: "PEC Registration",
    description: "Pakistan Engineering Council Registered",
    img: cert2
  },
  {
    title: "FBR Clearance",
    description: "Tax Payer and Clearance of all Assets",
    img: cert3
  }
];

const strengths = [
  { icon: <FaAward className="text-3xl text-yellow-500 mb-2" />, title: "Quality", desc: "Uncompromising standards in every project." },
  { icon: <FaCogs className="text-3xl text-green-600 mb-2" />, title: "Experience", desc: "Years of expertise in diverse construction domains." },
  { icon: <FaLightbulb className="text-3xl text-blue-500 mb-2" />, title: "Innovation", desc: "Modern techniques and creative solutions." },
  { icon: <FaUsers className="text-3xl text-green-700 mb-2" />, title: "Teamwork", desc: "Collaborative approach for best results." },
];

const milestones = [
  { year: "2017", event: "Company Founded in Faisalabad" },
  { year: "2018", event: "First Major Government Project Completed" },
  { year: "2020", event: "ISO Certification Achieved" },
  { year: "2022", event: "Expanded to Multiple Cities" },
  { year: "2024", event: "10+ Major Projects Delivered" },
];

export default function About() {
  // Management team data
  const managementTeam = [
    {
      role: "Chairman & CEO",
      name: "Abdul Sattar",
      position: "Senior Civil Engineer",
      icon: <FaUserTie className="text-3xl text-green-600" />
    },
    {
      role: "Director",
      name: "Ghulam Murtaza",
      position: "Senior Electrical Engineer",
      icon: <FaUserTie className="text-3xl text-green-600" />
    }
  ];

  // Engineers data
  const engineers = [
    {
      name: "Engineer Muhammad Salman Yaseen",
      qualification: "ELECT/68711",
      icon: <FaHardHat className="text-2xl text-green-600" />
    },
    {
      name: "Engineer Syed Zohaib Ali Shah",
      qualification: "CIVIL/58905",
      icon: <FaHardHat className="text-2xl text-green-600" />
    },
    {
      name: "Associate Civil Engineer Manzar Hussain",
      qualification: "",
      icon: <FaHardHat className="text-2xl text-green-600" />
    },
    {
      name: "Associate Electrical Engineer Abdur Rehaman",
      qualification: "",
      icon: <FaHardHat className="text-2xl text-green-600" />
    }
  ];

  return (
    <section className="about-section bg-white min-h-screen overflow-x-hidden">
      {/* Hero Header with overlay */}
      <div className="about-header py-24 bg-gradient-to-r from-green-700 to-green-900 text-white relative flex items-center justify-center">
        <img src={siteImg} alt="About Hero" className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-800/80 via-green-900/60 to-black/80 z-10" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-20">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 drop-shadow-lg">About ABMH Construction</h1>
          <p className="text-xl md:text-2xl mb-6 font-semibold drop-shadow-lg text-black">Shaping Pakistan's Infrastructure with Integrity & Innovation</p>
          <p className="text-base md:text-lg mb-6 text-black drop-shadow-lg">Delivering excellence, safety, and sustainability in every project since 2017.</p>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full" />
        </div>
      </div>

      {/* Why Choose Us / Strengths Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-10">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {strengths.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-green-200 border-t-4 border-green-500 flex flex-col items-center text-center transition-all duration-300 group">
              {s.icon}
              <h3 className="text-xl md:text-2xl font-semibold text-black mb-2 group-hover:text-yellow-500 transition-colors duration-300">{s.title}</h3>
              <p className="text-base md:text-lg text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Company Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">Building Pakistan's Future</h2>
            <p className="text-base md:text-lg text-gray-600 mb-6">
              <strong>Established in Faisalabad</strong>, ABMH Construction (Pvt.) Ltd. operates from
              House No. 480, B Block, Millat Town, serving both public and private sectors with
              commitment and quality.
            </p>
            <p className="text-base md:text-lg text-gray-600 mb-8">
              We deliver excellence in highways, bridges, tunnels, industrial and commercial buildings.
              Our work is driven by strong values of safety, integrity, quality, and sustainability.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-4">Our Expertise</h3>
                <ul className="space-y-3 text-base md:text-lg text-gray-600">
                  <li className="flex items-start"><span className="mr-3 mt-1 text-green-500">●</span>Roads & Highways</li>
                  <li className="flex items-start"><span className="mr-3 mt-1 text-green-500">●</span>Bridges & Tunnels</li>
                  <li className="flex items-start"><span className="mr-3 mt-1 text-green-500">●</span>Commercial Buildings</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl md:text-2xl font-semibold text-black mb-4">Our Achievements</h3>
                <ul className="space-y-3 text-base md:text-lg text-gray-600">
                  <li className="flex items-start"><span className="mr-3 mt-1 text-green-500">●</span>50+ Completed Projects</li>
                  <li className="flex items-start"><span className="mr-3 mt-1 text-green-500">●</span>ISO Certified Processes</li>
                  <li className="flex items-start"><span className="mr-3 mt-1 text-green-500">●</span>Government Approved</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <img src={siteImg} alt="ABMH Construction Team" className="rounded-xl shadow-2xl w-full max-w-lg h-auto object-cover border-4 border-green-100" />
          </div>
        </div>

        {/* Management Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Leadership</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Experienced professionals guiding ABMH Construction to excellence</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {managementTeam.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md border-t-4 border-green-500 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 text-4xl text-green-600">{member.icon}</div>
                  <h3 className="text-xl md:text-2xl font-semibold text-black">{member.role}</h3>
                  <p className="text-xl md:text-2xl font-semibold text-black my-2">{member.name}</p>
                  <p className="text-base md:text-lg text-gray-600">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Engineers Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Engineering Team</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Certified professionals ensuring quality and precision in every project</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engineers.map((engineer, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-start">
                  <div className="mr-4 text-3xl text-green-600">{engineer.icon}</div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold text-black">{engineer.name}</h3>
                    {engineer.qualification && (
                      <p className="text-base md:text-lg text-gray-600 mt-1">{engineer.qualification}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Banner with parallax/overlay */}
        <div className="relative rounded-xl overflow-hidden h-64 mb-20">
          <img src={valueImg} alt="ABMH Construction Values" className="w-full h-full object-cover scale-105" style={{ filter: 'brightness(0.7)' }} />
          <div className="absolute inset-0 bg-gradient-to-br from-green-800/80 via-green-900/60 to-black/70 flex items-center justify-center z-10">
            <div className="text-center text-white px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Core Values</h2>
              <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
                {['Safety', 'Quality', 'Integrity', 'Reliability', 'Teamwork'].map((value, index) => (
                  <div key={index} className="bg-green-600 bg-opacity-90 px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:bg-yellow-400 hover:text-green-900 cursor-pointer text-base md:text-lg">{value}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Section with badge/hover effect */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Certifications</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">Our company is recognized and certified for quality, safety, and engineering excellence.</p>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {certificates.map((cert, idx) => (
              <div key={idx} className="certificate-card bg-white rounded-2xl shadow-lg hover:shadow-yellow-400 border-2 border-green-100 hover:border-yellow-400 transition-all duration-300 flex flex-col items-center p-8 group">
                <div className="w-full h-48 bg-gray-100 rounded-xl mb-6 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img src={cert.img} alt={cert.title} className="object-contain h-full w-auto" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-black text-center mb-2 group-hover:text-yellow-500 transition-colors duration-300">{cert.title}</h3>
                <p className="text-base md:text-lg text-gray-600 text-center">{cert.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}