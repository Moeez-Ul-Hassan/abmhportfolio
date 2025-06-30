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
import c6 from "../assets/PAEC.png"
import c4 from "../assets/govak.png";
import c5 from "../assets/caa.png";


const clients = [
  { name: "United Nations High Commissioner for Refugees", logo: c1 },
  { name: "DHA Bahawalpur", logo: c2 },
  { name: "Punjab Government", logo: c3 },
  { name: "Multan Development Authority", logo: c3 },
  { name: "WASO PAKISTAN ATOMIC ENERGY", logo: c6 },
  { name: "WASO PAKISTAN ATOMIC ENERGY", logo: c6 },
  
];

const constructionData = [
  { title: "Roads", desc: "Highway and street infrastructure with national standards.", img: roads },
  { title: "Buildings", desc: "Residential and commercial structures of all scales.", img: building },
  { title: "Bridges", desc: "Strong and safe bridge development across terrains.", img: bridge },
  { title: "Industries", desc: "Factory and warehouse construction for industries.", img: ind },
  { title: "Tunnels", desc: "Precision-engineered tunnels for transport and utilities.", img: tunnel },
];

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
  const [serviceIndex, setServiceIndex] = useState(0);
  const [clientPage, setClientPage] = useState(0);
  const [coreValueIndex, setCoreValueIndex] = useState(0);
  const containerRef = useRef(null);

  const logosPerPage = window.innerWidth >= 1024 ? 5 : window.innerWidth >= 768 ? 4 : 3;
  const totalSlides = Math.ceil(clients.length / logosPerPage);

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % 5);
    }, 8000);
    return () => clearInterval(bgInterval);
  }, []);

  useEffect(() => {
    const serviceInterval = setInterval(() => {
      setServiceIndex((prev) => (prev + 3) % constructionData.length);
    }, 4000);
    return () => clearInterval(serviceInterval);
  }, []);

  useEffect(() => {
    const clientInterval = setInterval(() => {
      setClientPage((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(clientInterval);
  }, [totalSlides]);

  useEffect(() => {
    const valueInterval = setInterval(() => {
      setCoreValueIndex((prev) => (prev + 1) % coreValues.length);
    }, 3000);
    return () => clearInterval(valueInterval);
  }, []);

  const getVisibleClients = (index) => {
    const start = index * logosPerPage;
    return clients.slice(start, start + logosPerPage);
  };

  const visibleClients = getVisibleClients(clientPage);

  const visibleServiceCards =
    serviceIndex + 3 <= constructionData.length
      ? constructionData.slice(serviceIndex, serviceIndex + 3)
      : [...constructionData.slice(serviceIndex), ...constructionData.slice(0, (serviceIndex + 3) % constructionData.length)];

  const visibleCoreValues =
    coreValueIndex + 3 <= coreValues.length
      ? coreValues.slice(coreValueIndex, coreValueIndex + 3)
      : [...coreValues.slice(coreValueIndex), ...coreValues.slice(0, (coreValueIndex + 3) % coreValues.length)];

  return (
    <div className="overflow-x-hidden">
      <section className="home-hero">
        <div className="hero-bg-container">
          {[bg, bg1, bg2, bg3, bg4].map((bg, i) => (
            <div
              key={i}
              className={`hero-bg ${i === currentBg ? "active" : ""}`}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visibleServiceCards.map((card, i) => (
              <div
                key={i}
                className="construction-card animate-fade-slide-up"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationFillMode: "both"
                }}
              >
                <img src={card.img} alt={card.title} className="card-icon" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                  <p className="text-gray-600">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="vision-section relative py-12 md:py-16 text-white"
        style={{
          backgroundImage: `url(${visionBg})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0" />
        <div className="relative max-w-7xl mx-auto px-4 z-10">
          <h2 className="section-title text-white mb-4">Vision & Mission</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md text-gray-900">
              <h3 className="text-2xl font-bold mb-4 text-[#1A202C]">Our Vision</h3>
              <p>
                To be Pakistan's leading construction company through innovation, quality, and commitment to sustainable development.
              </p>
            </div>
            <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md text-gray-900">
              <h3 className="text-2xl font-bold mb-4 text-[#1A202C]">Our Mission</h3>
              <p>
                To deliver exceptional construction services using cutting-edge technologies while prioritizing safety, quality, and environmental responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">Core Values</h2>
          <div className="values-grid">
            {visibleCoreValues.map((value, i) => (
              <div key={i} className="value-card animate-fade-slide-up">
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
                    className="flex-shrink-0 flex flex-col items-center justify-center w-42 h-42 md:w-40 md:h-50 rounded-lg shadow-sm hover:shadow-md transition-all"
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
                onClick={() => setClientPage(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
