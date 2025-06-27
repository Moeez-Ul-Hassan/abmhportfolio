import { useEffect, useState } from "react";
import "./Home.css";

// Import background images
import bg from "../assets/bg.jpg";
import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg3.jpg";
import bg4 from "../assets/bg4.jpg";

// Import service icons
import roads from "../assets/icons/roadm.jpg";
import building from "../assets/icons/buildingm.jpg";
import bridge from "../assets/icons/bridge.jpg";
import tunnel from "../assets/icons/tunnelm.jpg";
import ind from "../assets/icons/a.jpg";



// Import section images
import client1 from "../assets/client1.png";
import client2 from "../assets/client2.png";
import client3 from "../assets/client3.png";
import client5 from "../assets/client5.png";

/*const clients = [
  { name: "National Logistics Cell", logo: nlc },
  { name: "Sialkot International Airport", logo: sialkot },
  { name: "Civil Aviation Authority", logo: caa },
  { name: "Bahria Town", logo: bahria },
  { name: "Capital Development Authority", logo: cda },
  { name: "Multan Development Authority", logo: mda },
];
*/


const constructionData = [
  { title: "Roads", desc: "Highway and street infrastructure with national standards.", img: roads },
  { title: "Buildings", desc: "Residential and commercial structures of all scales.", img: building },
  { title: "Bridges", desc: "Strong and safe bridge development across terrains.", img: bridge },
  { title: "Industrial", desc: "Factory and warehouse construction for industries.", img: ind },
  { title: "Tunnels", desc: "Precision-engineered tunnels for transport and utilities.", img: tunnel },
];

const backgroundImages = [bg, bg1, bg2, bg3, bg4];

const coreValues = [
  { title: "Safety", desc: "No one gets hurt - everyone goes home safe" },
  { title: "Integrity", desc: "Honest, fair, and ethical operations" },
  { title: "Quality", desc: "Uncompromising standards in all projects" },
  { title: "Reliability", desc: "We deliver on every promise" },
  { title: "Sustainability", desc: "Environmentally responsible construction" },
  { title: "Teamwork", desc: "Collaborating to achieve excellence" }
];



export default function Home() {
  const [currentBg, setCurrentBg] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const showNextCards = () => setCardIndex(prev => (prev + 1) % (constructionData.length - 2));
  const showPrevCards = () => setCardIndex(prev => (prev - 1 + constructionData.length - 2) % (constructionData.length - 2));

  const visibleCards = constructionData.slice(cardIndex, cardIndex + 3);





  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-bg-container">
          {backgroundImages.map((bg, i) => (
            <div 
              key={i}
              className={`hero-bg ${i === currentBg ? 'active' : ''}`}
              style={{ backgroundImage: `url(${bg})` }}
            />
          ))}
        </div>
        <div className="hero-overlay">
          <h1 className="hero-title">ABMH CONSTRUCTION (PVT) LTD.</h1>
          <p className="hero-subtitle">
            Building Pakistan's Future with Excellence and Integrity
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <div className="services-container">
          <h2 className="section-title">Our Services</h2>
          <div className="relative">

            <button className="card-nav left absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 z-10" onClick={showPrevCards}>←</button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {visibleCards.map((card, i) => (
                <div key={i} className="construction-card">
                  <img src={card.img} alt={card.title} className="card-icon" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-gray-600">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="card-nav right absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 z-10" onClick={showNextCards}>→</button>
          </div>
        </div>
      </section>



      {/* Vision/Mission Section */}
      <section className="vision-section">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">Vision & Mission</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">Our Vision</h3>
              <p>
                To be Pakistan's leading construction company through innovation, quality, 
                and commitment to sustainable development.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-blue-800">Our Mission</h3>
              <p>
                To deliver exceptional construction services using cutting-edge technologies while 
                prioritizing safety, quality, and environmental responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="values-section">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">Core Values</h2>
          <div className="values-grid">
            {coreValues.map((value, i) => (
              <div key={i} className="value-card">
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="clients-section">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">Our Esteemed Clients</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <img src={client5} alt="DHA" className="client-logo transform hover:scale-105 hover:-translate-y-1" />
            <img src={client1} alt="FWO" className="client-logo transform hover:scale-105 hover:-translate-y-1" />
            <img src={client2} alt="NIA" className="client-logo transform hover:scale-105 hover:-translate-y-1" />
            <img src={client3} alt="UNHCR" className="client-logo transform hover:scale-105 hover:-translate-y-1" />
          </div>
        </div>
      </section>

    {/* 
  ===================
  FOOTER COMPONENT
  ===================
  Add this just before the final </div> in your Home component
*/}
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