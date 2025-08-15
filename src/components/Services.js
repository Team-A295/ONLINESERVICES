import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../context/firebase";
import { BookingContext } from "../context/BookingContext"; 
import "../App.css";

const Services = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  //  Added: Use BookingContext to store selected city & area
  const {  selectedCity, setSelectedCity, selectedArea, setSelectedArea } =
    useContext(BookingContext);

  //  Removed: Local component state for city/area (now from context)
  // const [selectedCity, setSelectedCity] = useState("");
  // const [selectedArea, setSelectedArea] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName || user.email.split("@")[0]);
      }
    });
    return () => unsubscribe();
  }, []);

  const cities = {
    Rajahmundry: ["Devi Chowk", "Kotipalli Bus Stand", "Morampudi", "Diwancheruvu", "Danavaipeta", "Lalacheruvu"],
    Kakinada: ["Main Road", "Sarpavaram", "Bhanugudi Junction", "Jagannaickpur", "Gandhi Nagar"],
    Hyderabad: ["Madhapur", "Gachibowli", "Kukatpally", "Banjara Hills", "Secunderabad"],
    Vijayawada: ["Benz Circle", "Governorpet", "Gunadala", "Patamata", "Poranki"],
    Visakhapatnam: ["MVP Colony", "Dwaraka Nagar", "Gajuwaka", "Seethammadhara", "Beach Road"],
    Guntur: ["Brodipet", "Arundelpet", "Lodge Center", "Kothapet", "Patnam Bazar"],
    Warangal: ["Hanamkonda", "Kazipet", "Nakkalagutta", "Subedari", "Bhadrakali"],
    Tirupati: ["Alipiri", "Kapila Teertham", "Korlagunta", "Tata Nagar", "RC Road"]
  };

  return (
    <div className="page-content">
      {username && (
        <h2 style={{ textAlign: "center", color: "gold" }}>
          Welcome, {username}
        </h2>
      )}

      <div style={{ textAlign: "center", maxWidth: "800px", margin: "20px auto", color: "white" }}>
        <p>
          At <b>Online Services</b>, we provide fast, reliable, and affordable
          home & office solutions — from cleaning and repairs to expert
          installations and moving services.
        </p>
        <p>
          Simply select your city, choose your area, and pick the service you
          need. Our professionals will take care of the rest!
        </p>
      </div>

      <h2 style={{ textAlign: "center", marginTop: "20px", color: "gold" }}>
        Select the city to provide services
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px", marginTop: "15px" }}>
        {Object.keys(cities).map((city) => (
          <button
            key={city}
            onClick={() => {
              setSelectedCity(city); // ✅ Now stored in context
              setSelectedArea("");   // ✅ Reset area in context
            }}
            className={`service-select-btn ${selectedCity === city ? "selected" : ""}`}
          >
            {city}
          </button>
        ))}
      </div>

      {selectedCity && (
        <>
          <h3 style={{ textAlign: "center", marginTop: "20px", color: "gold" }}>
            Select an area in {selectedCity}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
            {cities[selectedCity].map((area) => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)} // ✅ Now stored in context
                className={`service-select-btn ${selectedArea === area ? "selected" : ""}`}
              >
                {area}
              </button>
            ))}
          </div>
        </>
      )}

      {selectedArea && (
        <h2 style={{ textAlign: "center", marginTop: "30px" }}>
          Click the service you want to choose below
        </h2>
      )}

      {selectedArea && (
        <div className="mani-grid" style={{ marginTop: "20px" }}>
          <div
            className="mani-box"
            onClick={() =>
              navigate("/cleaning", {
                state: { city: selectedCity, area: selectedArea },
              })
            }
          >
            <i className="fas fa-spray-can fa-3x text-orange-600"></i>
            <h3>Cleaning</h3>
            <p>Professional home & office cleaning with eco-friendly products.</p>
          </div>

          <div
            className="mani-box"
            onClick={() =>
              navigate("/repairs", {
                state: { city: selectedCity, area: selectedArea },
              })
            }
          >
            <i className="fas fa-wrench fa-3x text-orange-600"></i>
            <h3>Repairs</h3>
            <p>Expert technicians for appliances, plumbing, and electrical work.</p>
          </div>

          <div
            className="mani-box"
            onClick={() =>
              navigate("/installations", {
                state: { city: selectedCity, area: selectedArea },
              })
            }
          >
            <i className="fas fa-hammer fa-3x text-orange-600"></i>
            <h3>Installations</h3>
            <p>Furniture, electronics, and appliances set up perfectly.</p>
          </div>

          <div
            className="mani-box"
            onClick={() =>
              navigate("/painting", {
                state: { city: selectedCity, area: selectedArea },
              })
            }
          >
            <i className="fas fa-paint-roller fa-3x text-orange-600"></i>
            <h3>Painting</h3>
            <p>Professional interior and exterior painting for homes and offices.</p>
          </div>

          <div
            className="mani-box"
            onClick={() =>
              navigate("/packersmovers", {
                state: { city: selectedCity, area: selectedArea },
              })
            }
          >
            <i className="fas fa-truck-moving fa-3x text-orange-600"></i>
            <h3>Packers and Movers</h3>
            <p>
              Trusted packing, moving, and relocation services for homes,
              offices, and vehicles.
            </p>
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <button className="back-home-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Services;
