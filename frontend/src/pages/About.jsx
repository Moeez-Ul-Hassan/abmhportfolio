


import { FaCheckCircle } from "react-icons/fa";
import siteImg from "../assets/clients.jpg";

import "./About.css";

import bannerImg from "../assets/bg5.jpg"; // You can update this path if using another image

export default function About() {
  return (
    <div>
      <section className="about-section">
        {/* Header */}
        <div className="about-header">
          <h2 className="section-title">About ABMH</h2>
          <p className="subtitle">Engineering Excellence. Building Trust.</p>
          <div className="underline" />
        </div>

        {/* Content Grid */}
        <div className="about-content">
          {/* Text Block */}
          <div>
            <p className="text-lg mb-4">
              <strong>ABMH Construction (Pvt) Ltd.</strong> is a forward-looking construction company
              rooted in integrity and innovation. With a strong emphasis on{" "}
              <strong>customer satisfaction</strong>, <strong>quality assurance</strong>, and{" "}
              <strong>environmental sustainability</strong>, we are shaping the infrastructure of tomorrow.
            </p>
            <p className="mb-4">
              From national highways and bridges to industrial and commercial buildings, our portfolio
              reflects a commitment to <strong>delivering excellence across Pakistan</strong>.
            </p>

            {/* Feature Points */}
            <ul className="list-features">
              <li>
                <FaCheckCircle className="icon" />
                Over 50+ successful projects delivered
              </li>
              <li>
                <FaCheckCircle className="icon" />
                ISO-certified processes & safety standards
              </li>
              <li>
                <FaCheckCircle className="icon" />
                Trusted by government and private sectors
              </li>
              <li>
                <FaCheckCircle className="icon" />
                Expertise in roads, bridges, tunnels, buildings
              </li>
            </ul>
          </div>

          {/* Image */}
          <div className="image-container">
            <img src={siteImg} alt="Engineers on site" className="about-img" />
          </div>
        </div>

        {/* Optional Banner */}
        <div className="banner-wrapper">
          <img src={bannerImg} alt="Infrastructure highlight" className="banner-img" />
        </div>
      </section>
    </div>
  );
}
