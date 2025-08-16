// Cleaning.js
import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBroom } from "react-icons/fa";
import { BookingContext } from "../context/BookingContext";
import { workersData } from "./Contractors"; // <- updated import

const Cleaning = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, addBooking } = useContext(BookingContext);

  // Get city and area from location.state or fallback
  const { city = "", area = "" } = location.state || {};

  const cleaningServices = [
    { name: "1BHK Full House Cleaning", charges: "₹1,499", desc: "Complete cleaning for 1BHK including kitchen, bathrooms, living room, and bedrooms.", img: "/images/Cleaning.png" },
    { name: "2BHK Full House Cleaning", charges: "₹2,299", desc: "Detailed cleaning for a 2BHK home to make it spotless and fresh.", img: "/images/2Bhk.png" },
    { name: "3BHK Full House Cleaning", charges: "₹3,099", desc: "Thorough cleaning of 3BHK homes with eco-friendly products.", img: "/images/3BHK.png" },
    { name: "Kitchen Deep Cleaning", charges: "₹899", desc: "Degreasing, scrubbing, and sanitizing for a hygienic kitchen.", img: "/images/Kitchen dc.png" },
    { name: "Bathroom Deep Cleaning", charges: "₹699", desc: "Complete cleaning of tiles, faucets, mirrors, and more.", img: "/images/Bathroom dc.png" },
    { name: "Living Room Cleaning", charges: "₹799", desc: "Furniture dusting, floor cleaning, and sofa vacuuming.", img: "/images/Living dc.png" },
    { name: "Bedroom Cleaning", charges: "₹699", desc: "Dust removal, bed cleaning, and window wiping for a clean bedroom.", img: "/images/bedroom dc.png" },
    { name: "Carpet Shampooing", charges: "₹999", desc: "Deep cleaning of carpets to remove dirt, stains, and odors.", img: "/images/carpet shampooing.png" },
    { name: "Sofa Shampooing", charges: "₹1,199", desc: "Fresh and hygienic sofas with our specialized cleaning process.", img: "/images/sofa shampoiing.png" },
    { name: "Office Cleaning", charges: "₹2,499", desc: "Professional cleaning for offices ensuring a healthy workspace.", img: "/images/office cleaning.png" },
    { name: "Villa Cleaning", charges: "₹4,999", desc: "Complete villa cleaning with a dedicated professional team.", img: "/images/villa cleaning.png" },
    { name: "Window & Glass Cleaning", charges: "₹599", desc: "Streak-free glass cleaning for a bright, clear view.", img: "/images/window cleaning.png" },
    { name: "Balcony Cleaning", charges: "₹499", desc: "Scrubbing, mopping, and dust removal for balconies.", img: "/images/balcony cleaning.png" },
    { name: "Curtain Cleaning", charges: "₹899", desc: "Dust and stain removal for all types of curtains.", img: "/images/curtain cleaning.png" },
    { name: "Mattress Cleaning", charges: "₹1,299", desc: "Deep cleaning to remove dust mites and bacteria.", img: "/images/mattress cleaning.png" },
    { name: "Move-in Cleaning", charges: "₹2,999", desc: "Full cleaning service to make your new home ready to live in.", img: "/images/Movein.png" },
    { name: "Move-out Cleaning", charges: "₹2,999", desc: "Ensure your old home is spotless before moving out.", img: "/images/Moveout.png" },
    { name: "Spring Cleaning", charges: "₹3,499", desc: "Complete annual deep cleaning for a fresh start.", img: "/images/spring season cleaning.png" },
    { name: "Post-Construction Cleaning", charges: "₹5,999", desc: "Remove dust, debris, and stains after renovation.", img: "/images/Post construction cleaning.png" },
    { name: "Daily Maid Service", charges: "₹9,999/month", desc: "Dedicated maid for daily household cleaning.", img: "/images/daily maid service.png" },
    { name: "Chimney Cleaning", charges: "₹299-₹379", desc: "Exterior & mesh/filter degreasing for a smoke-free kitchen.", img: "/images/Chimney cleaning.png" },
    { name: "Fridge Cleaning", charges: "₹379", desc: "Interior & exterior cleaning with odour removal.", img: "/images/fridge cleaning.png" },
    { name: "Microwave Cleaning", charges: "₹189", desc: "Wet wiping, stain removal, and deodorizing of microwave ovens.", img: "/images/microwave cleaning.png" },
    { name: "Cabinet Cleaning", charges: "₹899-₹1,229", desc: "Inside & outside cleaning of kitchen or TV cabinets.", img: "/images/cabinet cleaning.png" },
    { name: "Dining Table & Chairs Cleaning", charges: "₹299–₹349", desc: "Dusting, wet wiping, and shampooing of fabric chairs.", img: "/images/dining and chair cleaning.png" },
    { name: "Ceiling & Dusting", charges: "₹199", desc: "Dry dust removal and cobweb cleaning from ceilings.", img: "/images/ceiling and dusting.png" },
    { name: "Car Exterior Washing", charges: "₹599", desc: "Complete exterior wash for cars, removing dirt, mud, and stains.", img: "/images/car exterior washing.png" },
    { name: "Car Interior Cleaning", charges: "₹799", desc: "Vacuuming, dusting, and deep cleaning of car interiors including seats and carpets.", img: "/images/car interior.png" },
    { name: "Bike Washing & Polishing", charges: "₹299", desc: "Exterior cleaning and polishing for bikes to restore shine.", img: "/images/bike washing and polishing.png" },
    { name: "Car Full Detailing", charges: "₹1,499", desc: "Comprehensive interior and exterior cleaning and polishing.", img: "/images/car full detailing.png" },
    { name: "Bike Interior & Exterior Cleaning", charges: "₹499", desc: "Complete cleaning service for bike interiors and exteriors.", img: "/images/bikeinterior and exterior.png" },
  ];

  const handleBooking = (service) => {
    if (!user) {
      alert("Please login or signup to book a service.");
      navigate("/signup");
      return;
    }

    // Get cleaners safely
    const cleaners = workersData.Cleaning || [];
    if (!cleaners.length) {
      alert("No cleaners available right now. Please try later.");
      return;
    }

    const randomCleaner = cleaners[Math.floor(Math.random() * cleaners.length)];

    addBooking({
      ...service,
      category: "Cleaning",
      city,
      area,
      userId: user.uid,
      userEmail: user.email,
      username: user.displayName || user.email.split("@")[0],
      contractorName: randomCleaner.name,
      contractorDetails: randomCleaner,
    });

    alert(`Booking successful! Assigned Cleaner: ${randomCleaner.name}`);
    navigate("/userdashboard");
  };

  return (
    <div className="guys-detail">
      <h1>
        Professional Cleaning Services <FaBroom style={{ color: "gold", marginLeft: "8px" }} />
      </h1>
      <p>
        Choose from a wide variety of cleaning packages designed to give you a spotless and healthy environment.
        Our services cover everything from basic room cleaning to deep cleaning of entire homes and offices.
      </p>
      <div className="guys-grid">
        {cleaningServices.map((service, index) => (
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

export default Cleaning;
