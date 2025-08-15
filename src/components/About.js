import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate('/')
  return (
    <div 
      className="page-content" 
      style={{padding: "40px",maxWidth: "900px",margin: "auto",fontFamily: "Arial, sans-serif",lineHeight:"1.5",color: "#f0f0f0", }}>
      <h1 style={{
          textAlign: "center",color: "gold",marginBottom: "30px",fontSize: "40px"}}>About Us</h1>
      <p style={{ fontSize: "18px", marginBottom: "20px", color: "#ffffff" }}>
        Welcome to <strong style={{ color: "gold" }}>Onlineservices</strong>, where excellence in service meets genuine care for our customers.From spotless homes to expertly handled repairs and hassle‑free installations, we’re more than just a service provider — we’re your trusted partner in making life easier, cleaner, and more comfortable.</p>
      <h2 style={{ color: "gold", marginTop: "30px" }}>Our Story</h2>
      <p style={{ color: "#e0e0e0" }}>Every great journey begins with a purpose. Ours began with a simple yet powerful idea: <strong> to make quality home services accessible, reliable, and stress‑free for everyone.</strong></p>
      <p style={{ color: "#e0e0e0" }}>We noticed that people often struggled to find dependable help when it came to cleaning, repairs, and installations. Determined to change this, we built <strong> Onlineservices</strong>, a service platform that puts customers first.</p>
      <ul style={{ marginLeft: "20px", marginTop: "10px", marginBottom: "20px", color: "#ddd" }}>
        <li> Deliver professional services with a human touch.</li><li> Ensure convenience without compromising on quality.</li><li> Build trust through transparency, reliability, and care.</li>
      </ul>
      <h2 style={{ color: "gold", marginTop: "30px" }}>What We Do</h2>
      <h3 style={{ color: "#ffffff" }}>🧹 Cleaning Services</h3>
      <p style={{ color: "#e0e0e0" }}>A clean environment is the foundation of health and happiness.Our expert team uses <strong>advanced methods</strong> and <strong>eco‑friendly products</strong> to deliver spotless results.</p>
      <h3 style={{ color: "#ffffff" }}>🔧 Repair Services</h3>
      <p style={{ color: "#e0e0e0" }}>Breakdowns happen, but stress doesn’t have to.Our skilled technicians handle <strong>plumbing, electrical, furniture, and appliance repairs</strong> with care and precision.</p>
      <h3 style={{ color: "#ffffff" }}>⚙️ Installation Services</h3>
      <p style={{ color: "#e0e0e0" }}>From appliances to fixtures, our installation team ensures everything is set up <strong>efficiently, correctly, and safely</strong>.</p>
      <h2 style={{ color: "gold", marginTop: "30px" }}>Why Choose Us?</h2>
      <ul style={{ marginLeft: "20px", marginBottom: "20px", color: "#ddd" }}>
        <li><strong>Professional Expertise:</strong> Highly trained and experienced staff.</li>
        <li><strong>Customer‑First Approach:</strong> Your satisfaction is our priority.</li>
        <li><strong>Transparent Pricing:</strong> No hidden charges, no surprises.</li>
        <li><strong>Quality & Reliability:</strong> We deliver what we promise — every time.</li>
        <li><strong>Safety & Trust:</strong> Verified technicians with strict safety protocols.</li>
      </ul>

      <h2 style={{ color: "gold", marginTop: "30px" }}>Our Promise</h2>
      <p style={{ color: "#e0e0e0" }}>
        We constantly <strong>innovate, improve, and adapt</strong> to meet your needs.  
        Choosing Onlineservices means choosing:
      </p>
      <ul style={{ marginLeft: "20px", color: "#ddd" }}>
        <li> Cleanliness you can see.</li>
        <li> Repairs you can rely on.</li>
        <li> Installations you can trust.</li>
      </ul>

      <h2 style={{ color: "gold", marginTop: "30px" }}>Our Vision</h2>
      <p style={{ color: "#e0e0e0" }}>
        We aim to become the most trusted and customer‑loved service provider, 
        measured not by numbers but by <strong>smiles, trust, and lasting relationships</strong>.
      </p>

      <h2 style={{ color: "gold", marginTop: "30px" }}>Meet Our Team</h2>
      <p style={{ color: "#e0e0e0" }}>
        Behind every service is a team of passionate professionals — problem solvers, 
        detail lovers, and people who genuinely care about your comfort and satisfaction.
      </p>

      <h2 style={{ color: "gold", marginTop: "30px" }}>What Our Customers Say</h2>
      <blockquote style={{ fontStyle: "italic", padding: "15px", color: "#f5f5f5" }}>
        “I booked a cleaning service with Onlineservices, and my house has never looked this fresh. 
        The team was on time, polite, and incredibly thorough!” — <strong>A Happy Customer</strong>
      </blockquote>
      <blockquote style={{ fontStyle: "italic", padding: "15px", color: "#f5f5f5" }}>
        “The technician fixed my washing machine in no time. Professional and reliable — I’ll definitely book again.” — <strong>Another Satisfied Customer</strong>
      </blockquote>
      <blockquote style={{ fontStyle: "italic", padding: "15px", color: "#f5f5f5" }}>
        “From booking to completion, everything was smooth and stress‑free. Highly recommended!” — <strong>Long‑Time Client</strong>
      </blockquote>

      <h2 style={{ color: "gold", marginTop: "30px" }}>Moving Forward Together</h2>
      <p style={{ color: "#e0e0e0" }}>
        Every time you choose <strong>Onlineservices</strong>, you’re not just hiring a service — 
        you’re joining a <strong>community built on trust, care, and excellence</strong>.
      </p>

      <h2 style={{ color: "gold", marginTop: "30px" }}>A Final Word</h2>
      <p style={{ color: "#e0e0e0" }}>
        Life is busy, and time is precious. Let us take care of the cleaning, repairing, 
        and installing, so you can focus on what truly matters.
      </p>
      <p style={{ fontWeight: "bold", color: "gold", fontSize: "20px", textAlign: "center" }}>
        With Onlineservices, you don’t just book a service — you book peace of mind.
      </p>
       <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
  <button className="back-home-btn" onClick={() => navigate("/")}>Back to Home</button>
</div>
    </div>
  );
};

export default About;
