import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // added useLocation
import { FaTruckMoving } from "react-icons/fa";
import { BookingContext } from "../context/BookingContext";

const PackersMovers = () => {
  const navigate = useNavigate();
  const location = useLocation(); // added
  const { addBooking, user } = useContext(BookingContext);

  const { city = "", area = "" } = location.state || {};

  const packersMoversServices = [
    { name: "Household Shifting - 1BHK", charges: "₹4,999", desc: "Safe packing and shifting of 1BHK household goods locally or domestically.", img: "/images/packersmovers/shifting 1bhk.png" },
    { name: "Household Shifting - 2BHK", charges: "₹8,999", desc: "Complete packing and moving service for 2BHK homes including fragile items.", img: "/images/packersmovers/shifting 2bhk.png" },
    { name: "Household Shifting - 3BHK", charges: "₹12,999", desc: "Comprehensive packing and moving for 3BHK homes with special care for valuables.", img: "/images/packersmovers/shifting 3bhk.png" },
    { name: "Office Relocation", charges: "₹29,999", desc: "Professional handling and shifting of large corporate offices.", img: "/images/packersmovers/office relocation.png" },
    { name: "Industrial Shifting", charges: "Contact for Quote", desc: "Specialized services for shifting heavy machinery and industrial equipment.", img: "/images/packersmovers/industrial shift.png" },
    { name: "Vehicle Transportation - Car", charges: "₹3,499", desc: "Safe and secure car transportation with door-to-door delivery.", img: "/images/packersmovers/vehicle transport car.png" },
    { name: "Vehicle Transportation - Bike", charges: "₹1,299", desc: "Reliable bike transportation services with careful handling.", img: "/images/packersmovers/vehicle transport bike.png" },
    { name: "Storage and Warehousing", charges: "₹2,499/month", desc: "Secure storage for your belongings with easy access and flexible duration.", img: "/images/packersmovers/storage and warehousing .png" },
    { name: "Packing Services Only", charges: "₹999 onwards", desc: "Professional packing of goods with high-quality materials for self-transport.", img: "/images/packersmovers/pack service.png" },
    { name: "Unpacking Services", charges: "₹799 onwards", desc: "Expert unpacking and setup services at your destination.", img: "/images/packersmovers/unpack service.png" },
    { name: "Fragile Goods Handling", charges: "₹1,499 onwards", desc: "Special care and customized packing for delicate and fragile items.", img: "/images/packersmovers/fragile tems.png" }
  ];

  const handleBooking = (service) => {
    if (!user) {
      alert("Please login or signup to book a service.");
      navigate("/signup");
      return;
    }
    addBooking({
      ...service,
      category: "Packers and Movers",
      city,
      area,
      userId: user.uid,
      userEmail: user.email,
      username: user.displayName || user.email.split("@")[0], // added username
      name: service.name, // keep service name as service type
    });
    navigate("/userdashboard");
  };

  return (
    <div className="guys-detail">
      <h1>
        Professional Packers and Movers Services{" "}
        <FaTruckMoving style={{ color: "gold", marginLeft: "8px" }} />
      </h1>
      <p>Choose from a variety of reliable packing and moving packages...</p>
      <div className="guys-grid">
        {packersMoversServices.map((service, index) => (
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

export default PackersMovers;
