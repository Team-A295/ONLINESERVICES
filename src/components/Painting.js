import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // added useLocation
import { FaPaintRoller } from "react-icons/fa";
import { BookingContext } from "../context/BookingContext";
import "../App.css";

const Painting = () => {
  const navigate = useNavigate();
  const location = useLocation(); // added this
  const { addBooking, user } = useContext(BookingContext);

  // Get city and area from location.state or fallback empty string
  const { city = "", area = "" } = location.state || {};

  const paintingServices = [
    {
      category: "Interior Painting",
      services: [
        { name: "Living Room Painting", charges: "₹7,999", desc: "High-quality paint with smooth finish for your living room walls.", img: "/images/paintings/living room painting.png" },
        { name: "Bedroom Painting", charges: "₹5,999", desc: "Fresh and durable paint to revitalize your bedrooms.", img: "/images/paintings/bedroom painting.png" },
        { name: "Kitchen Painting", charges: "₹6,499", desc: "Moisture-resistant paint designed for kitchen walls.", img: "/images/paintings/kitchen painting.png" },
        { name: "Bathroom Painting", charges: "₹4,999", desc: "Waterproof and mold-resistant paint for bathrooms.", img: "/images/paintings/bathroom painting.png" }
      ]
    },
    {
      category: "Exterior Painting",
      services: [
        { name: "Wall Painting", charges: "₹12,999", desc: "Durable exterior paint for your home’s walls to withstand weather.", img: "/images/paintings/ext wall painting.png" },
        { name: "Fence Painting", charges: "₹3,999", desc: "Protective paint for fences with a beautiful finish.", img: "/images/paintings/fencepainting.png" },
        { name: "Gate Painting", charges: "₹4,499", desc: "Rust-resistant paint for metal and wooden gates.", img: "/images/paintings/gate painting.png" }
      ]
    },
    {
      category: "Specialized Painting",
      services: [
        { name: "Texture Painting", charges: "₹9,999", desc: "Add texture effects for a stylish wall design.", img: "/images/paintings/Texture paint specialized paint.png" },
        { name: "Wallpaper Installation", charges: "₹6,999", desc: "Professional wallpaper installation for unique interiors.", img: "/images/paintings/wallpaper install specialized painting.png" },
        { name: "Decorative Painting", charges: "₹8,999", desc: "Artistic painting to enhance your space’s character.", img: "/images/paintings/decorative paint specilaized paint.png" }
      ]
    }
  ];

  const handleBooking = (service, category) => {
    if (!user) {
      alert("Please login or signup to book a service.");
      navigate("/signup");
      return;
    }
    addBooking({
      ...service,
      category: `Painting - ${category}`,
      city,
      area,
      userId: user.uid,
      userEmail: user.email,
      username: user.displayName || user.email.split("@")[0], // added username
      name: service.name, // keeping service name as service type
    });
    navigate("/userdashboard");
  };

  return (
    <div className="guys-detail">
      <h1>
        Professional Painting Services{" "}
        <FaPaintRoller style={{ color: "gold", marginLeft: "8px" }} />
      </h1>
      <p className="intro-text">
        Choose from a variety of painting services...
      </p>

      {paintingServices.map((cat, i) => (
        <section key={i} style={{ marginBottom: "40px" }}>
          <h2 className="category-title">{cat.category}</h2>
          <div className="guys-grid">
            {cat.services.map((service, index) => (
              <div key={index} className="guys-card">
                {service.img && (
                  <div className="logo-container">
                    <img
                      src={service.img}
                      alt={service.name}
                      className="service-logo"
                    />
                  </div>
                )}
                <h3>{service.name}</h3>
                <p>{service.desc}</p>
                <h4 className="guys-price">{service.charges}</h4>
                <button
                  className="guys-btn"
                  onClick={() => handleBooking(service, cat.category)}
                >
                  Book Service
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="back-btn-container">
        <button className="back-btn" onClick={() => navigate("/services")}>
          Back to Services
        </button>
      </div>
    </div>
  );
};

export default Painting;
