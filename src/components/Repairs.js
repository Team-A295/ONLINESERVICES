import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // added useLocation
import { FaWrench } from "react-icons/fa";
import { BookingContext } from "../context/BookingContext";

const Repairs = () => {
  const navigate = useNavigate();
  const location = useLocation(); // added
  const { addBooking, user } = useContext(BookingContext);

  const { city = "", area = "" } = location.state || {};

  const repairServices = [
    { name: "Mixer/Grinder Repair", charges: "₹249-₹399", desc: "Fix motor, blades, wiring issues, and maintenance.", img: "/images/repairs/mixergrinder repair.png" },
    { name: "Water Purifier Repair", charges: "₹299-₹799", desc: "RO/UV purifier troubleshooting & filter replacement.", img: "/images/repairs/waterpurifier repair.png" },
    { name: "Washing Machine Repair", charges: "₹399-₹799", desc: "Top-load/front-load, drainage, motor & drum fixes.", img: "/images/repairs/washing machinerepair.png" },
    { name: "Geyser Repair", charges: "₹349-₹1,000", desc: "Heating element replacement, thermostat, leakage fixes.", img: "/images/repairs/geyserrepair.png" },
    { name: "Inverter Repair", charges: "₹499-₹1,499", desc: "Battery/inverter, charger board & wiring repair.", img: "/images/repairs/inverterrepair.png" },
    { name: "Fridge Repair", charges: "₹299-₹1,099", desc: "Compressor, cooling fan, thermostat, gas refill.", img: "/images/repairs/fridgerepair.png" },
    { name: "Microwave Oven Repair", charges: "₹299-₹799", desc: "Magnetron, control panel, heating & turntable repair.", img: "/images/repairs/microwaveovenrepair.png" },
    { name: "Electric Chimney Repair", charges: "₹249-₹749", desc: "Motor, suction, filter, light & switch repairs.", img: "/images/repairs/electrichimneyrepair.png" },
    { name: "Dishwasher Repair", charges: "₹499-₹1,299", desc: "Spray arm, pump, control board & water inlet fixes.", img: "/images/repairs/dishwashrepair.png" },
    { name: "Air Conditioner Repair", charges: "₹499-₹1,499", desc: "Split/window AC, cooling/pressure/gas & condenser work.", img: "/images/repairs/ac repair.png" },
    { name: "TV Repair", charges: "₹399-₹1,299", desc: "LED/LCD/Smart TV service, panel & board issues.", img: "/images/repairs/TVrepair.png" },
    { name: "Water Dispenser Repair", charges: "₹249-₹699", desc: "Hot/cold water mechanisms, dispenser panel & cooling.", img: "/images/repairs/waterdispenserrepair.png" }
  ];

  const handleBooking = (service) => {
    if (!user) {
      alert("Please login or signup to book a service.");
      navigate("/signup");
      return;
    }
    addBooking({
      ...service,
      category: "Repairs",
      city,
      area,
      userId: user.uid,
      userEmail: user.email,
      username: user.displayName || user.email.split("@")[0], // added username
      name: service.name,
    });
    navigate("/userdashboard");
  };

  return (
    <div className="guys-detail">
      <h1>
        Appliance & Repair Services <FaWrench style={{ color: "gold", marginLeft: "8px" }} />
      </h1>
      <p>
        Get certified technicians for appliance repair at your doorstep—fast, reliable, and affordable.
      </p>
      <div className="guys-grid">
        {repairServices.map((service, index) => (
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

export default Repairs;
