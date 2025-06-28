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

const clients = [
  { name: "National Logistics Cell", logo: client1 },
  { name: "Sialkot International Airport", logo: client2 },
  { name: "Civil Aviation Authority", logo: client3 },
  { name: "Bahria Town", logo: client2 },
  { name: "Capital Development Authority", logo: client5 },
  { name: "Multan Development Authority", logo: client2 },
];



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

<section className="clients-section py-16">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-4">CLIENTS</h2>
    <div className="w-16 h-1 bg-black mx-auto mb-8"></div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
      {clients.map((client, idx) => (
        <div key={idx} className="text-center">
          <img
            src={client.logo}
            alt={client.name}
            className="client-logo mx-auto w-24 h-24 object-contain "
          />
          <p className="mt-2 text-sm font-semibold">{client.name}</p>
        </div>
      ))}
    </div>
  </div>
</section>


    </div>
  );
}