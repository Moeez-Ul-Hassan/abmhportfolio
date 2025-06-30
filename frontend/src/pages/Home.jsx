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
      <section className="home-hero relative flex items-center justify-center min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          {[bg, bg1, bg2, bg3, bg4].map((bg, i) => (
            <div
              key={i}
              className={`hero-bg transition-opacity duration-1000 ${i === currentBg ? "opacity-100" : "opacity-0"}`}
              style={{ backgroundImage: `url(${bg})` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-green-700/80 via-green-900/60 to-black/80 animate-gradient-move" />
        </div>
        <div className="hero-overlay relative z-10 flex flex-col items-center justify-center w-full px-4 py-24 animate-fade-in">
          <h1 className="hero-title leading-none drop-shadow-xl animate-slide-down">
            <span className="hero-title-main block">ABMH CONSTRUCTION</span>
            <span className="hero-title-sub block -mt-2">(PVT) LTD.</span>
          </h1>
          <p className="hero-subtitle mb-8 mt-6 max-w-2xl mx-auto animate-fade-in delay-200">
            Building Pakistan's Future with Excellence and Integrity
          </p>
          <a href="#services" className="inline-block px-8 py-3 rounded-full bg-yellow-400 text-gray-900 font-bold text-lg shadow-lg hover:bg-yellow-300 transition-all duration-300 animate-pop-in mt-4">Explore Our Services</a>
        </div>
      </section>

      <section id="services" className="services-section relative bg-white py-20">
        <div className="services-container">
          <h2 className="section-title text-gray-900">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
            {visibleServiceCards.map((card, i) => (
              <div
                key={i}
                className="construction-card animate-fade-slide-up bg-white/90 border border-green-100 shadow-xl rounded-2xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationFillMode: "both"
                }}
              >
                <div className="relative overflow-hidden">
                  <img src={card.img} alt={card.title} className="card-icon w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-700 animate-width-grow" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-green-700 transition-colors duration-300">{card.title}</h3>
                  <p className="text-gray-600">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="vision-section relative py-20 md:py-28 text-white flex items-center"
        style={{
          backgroundImage: `url(${visionBg})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />
        <div className="relative max-w-7xl mx-auto px-4 z-10 w-full">
          <h2 className="section-title text-white mb-8">Vision & Mission</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white/90 p-8 rounded-2xl shadow-lg text-gray-900 border-l-4 border-green-500 animate-fade-in">
              <h3 className="text-2xl font-bold mb-4 text-green-700">Our Vision</h3>
              <p>
                To be Pakistan's leading construction company through innovation, quality, and commitment to sustainable development.
              </p>
            </div>
            <div className="bg-white/90 p-8 rounded-2xl shadow-lg text-gray-900 border-l-4 border-green-500 animate-fade-in delay-200">
              <h3 className="text-2xl font-bold mb-4 text-green-700">Our Mission</h3>
              <p>
                To deliver exceptional construction services using cutting-edge technologies while prioritizing safety, quality, and environmental responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title text-gray-900">Core Values</h2>
          <div className="values-grid mt-10">
            {visibleCoreValues.map((value, i) => (
              <div key={i} className="value-card animate-fade-slide-up bg-white/90 border-l-4 border-green-500 shadow-lg hover:shadow-2xl transition-all duration-300">
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-green-700 transition-colors duration-300">{value.title}</h3>
                <p className="text-gray-700">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="clients-section py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Esteemed Clients</h2>
            <div className="w-16 h-1 bg-green-600 mx-auto rounded-full" />
          </div>

          <div className="relative overflow-x-auto px-2 md:px-10">
            <div className="flex transition-transform duration-500 ease-in-out gap-6 md:gap-10" ref={containerRef}>
              {visibleClients.map((client, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 flex flex-col items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-xl shadow-md bg-white/90 border border-green-100 hover:shadow-xl transition-all animate-pop-in"
                >
                  <div className="flex items-center justify-center w-24 h-20 md:w-32 md:h-24 bg-white rounded-lg overflow-hidden shadow-inner">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="object-contain object-center max-h-16 md:max-h-20 w-auto h-auto client-logo"
                    />
                  </div>
                  <p className="mt-3 text-xs md:text-base font-medium text-gray-700 text-center">
                    {client.name}
                  </p>
                </div>
              ))}
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
