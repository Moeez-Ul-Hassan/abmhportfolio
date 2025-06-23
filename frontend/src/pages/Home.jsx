import { useEffect, useState } from "react";
import "./Home.css";

import roads from '../assets/icons/roadm.jpg';
import building from '../assets/icons/buildingm.jpg';
import bridge from '../assets/icons/bridge.jpg';
import tunnel from '../assets/icons/tunnelm.jpg';
import ind from '../assets/icons/a.jpg';

// Static construction types
const constructionData = [
  {
    title: "Roads",
    desc: "Highway and street infrastructure with national standards.",
    img: roads,
  },
  {
    title: "Buildings",
    desc: "Residential and commercial structures of all scales.",
    img: building,
  },
  {
    title: "Bridges",
    desc: "Strong and safe bridge development across terrains.",
    img: bridge,
  },
  {
    title: "Industrial",
    desc: "Factory and warehouse construction for industries.",
    img: ind,
  },
  {
    title: "Tunnels",
    desc: "Precision-engineered tunnels for transport and utilities.",
    img: tunnel,
  },
];

export default function Home() {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % constructionData.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const visibleCards = constructionData
    .concat(constructionData)
    .slice(startIndex, startIndex + 3);

   const handlePrev = () => setStartIndex((prev) => (prev - 1 + constructionData.length) % constructionData.length);
  const handleNext = () => setStartIndex((prev) => (prev + 1) % constructionData.length);



return (
    <div className="home-hero">
      <div className="hero-overlay">
        <h1 className="hero-title fancy-font">ABMH Construction (Pvt.) Ltd.</h1>
        <p className="hero-subtitle font-parafont">
          Building dreams, shaping skylines, delivering <br /> excellence across Pakistan.
        </p>
      </div>
      <div className="construction-row relative">
        <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
          ←
        </button>
        {visibleCards.map((card, index) => (
          <div key={index} className="construction-card">
            <img src={card.img} alt={card.title} className="card-icon" />
            <h3 className="card-title">{card.title}</h3>
            <p className="card-desc">{card.desc}</p>
          </div>
        ))}
        <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full">
          →
        </button>
      </div>
    </div>
  );
}
