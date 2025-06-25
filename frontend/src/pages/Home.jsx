import { useEffect, useState } from "react";
import "./Home.css";

// Import background images in JPG format to ensure they are bundled by Vite
import bg from "../assets/bg.jpg";
import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg3.jpg";
import bg4 from "../assets/bg4.jpg";

import roads from "../assets/icons/roadm.jpg";
import building from "../assets/icons/buildingm.jpg";
import bridge from "../assets/icons/bridge.jpg";
import tunnel from "../assets/icons/tunnelm.jpg";
import ind from "../assets/icons/a.jpg";

// Static construction types data
const constructionData = [
  { title: "Roads", desc: "Highway and street infrastructure with national standards.", img: roads },
  { title: "Buildings", desc: "Residential and commercial structures of all scales.", img: building },
  { title: "Bridges", desc: "Strong and safe bridge development across terrains.", img: bridge },
  { title: "Industrial", desc: "Factory and warehouse construction for industries.", img: ind },
  { title: "Tunnels", desc: "Precision-engineered tunnels for transport and utilities.", img: tunnel },
];

// Array of background images
const backgroundImages = [bg, bg1, bg2, bg3, bg4];

export default function Home() {
  const [bgIndex, setBgIndex] = useState(0); // Track current background index
  const [animationClass, setAnimationClass] = useState("zoom-in"); // Control animation state

  useEffect(() => {
    // Initial zoom-in setup
    setAnimationClass("zoom-in");

    // Set up interval for smooth background transition every 10 seconds
    const interval = setInterval(() => {
      setAnimationClass("fade-out");
      setTimeout(() => {
        setBgIndex((prev) => (prev + 1) % backgroundImages.length);
        setAnimationClass("fade-in zoom-in");
      }, 2000); // 2-second fade-out duration
    }, 10000); // 10 seconds total (8s zoom + 2s transition)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Function to get visible cards
  const visibleCards = constructionData.slice(0, 3); // Show first 3 cards initially

  return (
    <div>
      {/* Hero Section */}
      <div className="home-hero" style={{ backgroundImage: `url(${backgroundImages[bgIndex]})`, animation: animationClass }}>
        <div className="hero-overlay">
          <h1 className="hero-title fancy-font">ABMH Construction (Pvt.) Ltd.</h1>
          <p className="hero-subtitle font-parafont">
            Building dreams, shaping skylines, delivering <br /> excellence across Pakistan.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <h2 className="services-heading">Services</h2>
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
    </div>
  );
}