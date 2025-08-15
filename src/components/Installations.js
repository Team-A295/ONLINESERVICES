import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // added useLocation
import { GiDrill } from "react-icons/gi";
import { BookingContext } from "../context/BookingContext";

const Installations = () => {
  const navigate = useNavigate();
  const location = useLocation(); // added this
  const { addBooking, user } = useContext(BookingContext);

  // Get city and area from location.state or empty string fallback
  const { city = "", area = "" } = location.state || {};

  const installServices = [
    { name: "Ceiling Fan Installation", charges: "₹299-₹499", desc: "Professional mount and wiring for ceiling fans.", img: "/images/install/fan installation.png" },
    { name: "RO Water Purifier Installation", charges: "₹599-₹999", desc: "Wall or under-sink RO purifier fix & plumbing.", img: "/images/install/ROWinstallation.png" },
    { name: "Split AC Installation (1 Ton)", charges: "₹1,299-₹1,999", desc: "Indoor + outdoor unit setup, piping, gas charging.", img: "/images/install/ac1ton.png" },
    { name: "Split AC Installation (1.5 Ton)", charges: "₹1,499-₹2,299", desc: "Expert installation for 1.5 T split AC.", img: "/images/install/ac1.5ton.png" },
    { name: "Split AC Installation (2 Ton)", charges: "₹1,499-₹2,299", desc: "Expert installation for 2 T split AC.", img: "/images/install/ac2ton.png" },
    { name: "LED TV Wall Mounting", charges: "₹249-₹499", desc: "Secure mounting & wiring for LED/LCD Smart TVs.", img: "/images/install/Tvinstallation.png" },
    { name: "Geyser Installation", charges: "₹499-₹999", desc: "Electric or gas geyser mounting & plumbing.", img: "/images/install/geysarinstallation.png" },
    { name: "Washing Machine Installation", charges: "₹499-₹799", desc: "Top-/front-load installation & drainage setup.", img: "/images/install/washingmachine install.png" },
    { name: "Microwave Oven Installation", charges: "₹299-₹599", desc: "Wall mounting or countertop microwave setup.", img: "/images/install/microwaveoven install.png" },
    { name: "Electric Chimney Installation", charges: "₹399-₹799", desc: "Kitchen chimney mounting, duct work & suction check.", img: "/images/install/electrichimney install.png" },
    { name: "Refrigerator Installation", charges: "₹299-₹499", desc: "Positioning, connection & cooling check of fridge.", img: "/images/install/refrigerator install.png" },
    { name: "Dishwasher Installation", charges: "₹499-₹1,199", desc: "Built-in/hob built dishwasher plumbing & electrical setup.", img: "/images/install/dishwasher install.png" },
    { name: "Water Dispenser Installation", charges: "₹249-₹499", desc: "Cold/hot water dispenser plumbing & electrical setup.", img: "/images/install/waterdispenserinstall.png" }
  ];

  const handleBooking = (service) => {
    if (!user) {
      alert("Please login or signup to book a service.");
      navigate("/signup");
      return;
    }
    addBooking({
      ...service,
      category: "Installations",
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
        Home Appliance Installation Services{" "}
        <GiDrill style={{ color: "gold", marginLeft: "8px" }} />
      </h1>
      <p>
        Certified technicians for reliable installations of household appliances at your doorstep.
      </p>
      <div className="guys-grid">
        {installServices.map((service, index) => (
          <div key={index} className="guys-card">
            {service.img && (
              <div className="logo-container">
                <img src={service.img} alt={service.name} className="service-logo" />
              </div>
            )}
            <h3>{service.name}</h3>
            <p>{service.desc}</p>
            <h4 className="guys-price">{service.charges}</h4>
            <button className="guys-btn" onClick={() => handleBooking(service)}>
              Book Service
            </button>
          </div>
        ))}
      </div>
      <div className="back-btn-container">
        <button className="back-btn" onClick={() => navigate("/services")}>
          Back to Services
        </button>
      </div>
    </div>
  );
};

export default Installations;
