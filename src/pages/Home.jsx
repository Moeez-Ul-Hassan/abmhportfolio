import { useEffect, useState } from "react";
import "./Home.css";

// Static construction types
const constructionData = [
  {
    title: "Roads",
    desc: "Highway and street infrastructure with national standards.",
    img: "/icons/roadm.jpg",
  },
  {
    title: "Buildings",
    desc: "Residential and commercial structures of all scales.",
    img: "/icons/buildingm.jpg",
  },
  {
    title: "Bridges",
    desc: "Strong and safe bridge development across terrains.",
    img: "/icons/bridge.jpg",
  },
  {
    title: "Industrial",
    desc: "Factory and warehouse construction for industries.",
    img: "/icons/a.jpg",
  },
  {
    title: "Tunnels",
    desc: "Precision-engineered tunnels for transport and utilities.",
    img: "/icons/tunnelm.jpg",
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

  return (
    <div className="home-hero">
      {/* Hero text area */}
      <div className="hero-overlay">
        <h1 className="hero-title fancy-font">
          ABMH Construction (Pvt.) Ltd.
        </h1>

        <p className="hero-subtitle font-parafont">
          Building dreams, shaping skylines, delivering <br />
          excellence across Pakistan.
        </p>
      </div>

      {/* Card Row Section */}
      <div className="construction-row">
        {visibleCards.map((card, index) => (
          <div key={index} className="construction-card">
            <img src={card.img} alt={card.title} className="card-icon" />
            <h3 className="card-title">{card.title}</h3>
            <p className="card-desc">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
