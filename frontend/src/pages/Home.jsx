import { useEffect, useState, useRef } from "react";
import "./Home.css";

import bg from "../assets/1.jpg";
import bg1 from "../assets/2.jpg";
import bg2 from "../assets/3.jpg";
import bg3 from "../assets/4.jpg";
import bg4 from "../assets/5.jpg";

import roads from "../assets/icons/road.jpg";
import building from "../assets/icons/building.jpg";
import bridge from "../assets/icons/bridge.jpg";
import tunnel from "../assets/icons/tunnel.jpg";
import ind from "../assets/icons/indust.jpg";

import visionBg from "../assets/bg.jpg";

import c1 from "../assets/UNHCR.png";
import c2 from "../assets/dhabwp.png";
import c3 from "../assets/govpb.png";
import c4 from "../assets/govak.png";
import c5 from "../assets/caa.png";

const clients = [
  { name: "United Nations High Commissioner for Refugees", logo: c1 },
  { name: "DHA Bahawalpur", logo: c2 },
  { name: "Civil Aviation Authority", logo: c5 },
  { name: "Punjab Government", logo: c3 },
  { name: "Capital Development Authority", logo: c4 },
  { name: "Multan Development Authority", logo: c3 },
];

const constructionData = [
  { title: "Roads", desc: "Highway and street infrastructure with national standards.", img: roads },
  { title: "Buildings", desc: "Residential and commercial structures of all scales.", img: building },
  { title: "Bridges", desc: "Strong and safe bridge development across terrains.", img: bridge },
  { title: "Industries", desc: "Factory and warehouse construction for industries.", img: ind },
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

  const [clientPage, setClientPage] = useState(0);
  const [autoScrollIndex, setAutoScrollIndex] = useState(0);
  const containerRef = useRef(null);

  const logosPerPage = window.innerWidth >= 1024 ? 5 : window.innerWidth >= 768 ? 4 : 3;
  const totalSlides = Math.ceil(clients.length / logosPerPage);

  const getVisibleClients = (index) => {
    const start = index * logosPerPage;
    return clients.slice(start, start + logosPerPage);
  };

  const handleDotClick = (index) => {
    setClientPage(index);
    setAutoScrollIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoScrollIndex((prev) => (prev + 1) % totalSlides);
      setClientPage((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const visibleClients = getVisibleClients(clientPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const showNextCards = () => setCardIndex((prev) => (prev + 1) % (constructionData.length - 2));
  const showPrevCards = () => setCardIndex((prev) => (prev - 1 + constructionData.length - 2) % (constructionData.length - 2));

  const visibleCards = constructionData.slice(cardIndex, cardIndex + 3);

  return (
    <div className="overflow-x-hidden">
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
        <h1 className="hero-title leading-none">
          <span className="hero-title-main block">ABMH CONSTRUCTION</span>
          <span className="hero-title-sub block -mt-2">(PVT) LTD.</span>
        </h1>

          <p className="hero-subtitle">
            Building Pakistan's Future with Excellence and Integrity
          </p>
        </div>
      </section>
      <section className="services-section" id="services">
        <div className="services-container">
          <h2 className="section-title">Our Services</h2>
          <div className="relative">
            <button className="card-nav left" onClick={showPrevCards}>❮</button>
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
            <button className="card-nav right" onClick={showNextCards}>❯</button>
          </div>
        </div>
      </section>

      <section
        className="vision-section relative section-spacer text-white"
        style={{
          backgroundImage: `url(${visionBg})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
        <div className="relative max-w-7xl mx-auto px-4 z-10">
          <h2 className="section-title text-white">Vision & Mission</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md text-gray-900">
              <h3 className="text-2xl font-bold mb-4 text-[#1A202C]">Our Vision</h3>
              <p>To be Pakistan's leading construction company through innovation, quality, and commitment to sustainable development.</p>
            </div>
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md text-gray-900">
             <h3 className="text-2xl font-bold mb-4 text-[#1A202C]">Our Mission</h3>
              <p>To deliver exceptional construction services using cutting-edge technologies while prioritizing safety, quality, and environmental responsibility.</p>
            </div>
          </div>
        </div>
      </section>

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

      <section className="clients-section py-16 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Esteemed Clients</h2>
      <div className="w-16 h-1 bg-green-600 mx-auto" />
    </div>

    <div className="relative overflow-hidden px-10">
      <div className="flex transition-transform duration-500 ease-in-out" ref={containerRef}>
        <div className="flex gap-8 md:gap-12 px-4">
          {visibleClients.map((client, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 flex flex-col items-center justify-center p- w-42 h-42 md:w-40 md:h-50 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="w-full h-20 md:h-24 object-contain object-center"
              />
              <p className="mt-3 text-sm md:text-base font-medium text-gray-700 text-center">
                {client.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="flex justify-center gap-2 mt-12">
      {Array.from({ length: totalSlides }).map((_, idx) => (
        <button
          key={idx}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            clientPage === idx ? "bg-green-600 w-6" : "bg-gray-300"
          }`}
          onClick={() => handleDotClick(idx)}
          aria-label={`Go to slide ${idx + 1}`}
        />
      ))}
    </div>
  </div>
</section>
    </div>
  );
}
