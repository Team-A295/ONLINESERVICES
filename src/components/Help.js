import React from 'react';
import { useNavigate } from 'react-router-dom';

const Help = () => {
  const navigate =useNavigate('/')
  return (
    <div 
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.8",
        color: "white"
      }}
    >
      <h1 
        style={{
          textAlign: "center",
          color: "gold",
          marginBottom: "20px",
          fontSize: "36px"
        }}
      >
        Help & Support
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "30px", textAlign: "center" }}>
        Need assistance? We’re here to make your experience with 
        <strong style={{ color: "gold" }}> Onlineservices</strong> 
        simple and stress‑free. Find answers to common questions below, or reach out to us directly.
      </p>

      <h2 style={{ color: "gold", marginTop: "30px" }}>Frequently Asked Questions</h2>

      <h3 style={{ color: "gold" }}> Booking & Scheduling</h3>
      <ul style={{ marginLeft: "20px" }}>
        <li><strong>How do I book a service?</strong>  
          You can book directly on our website by selecting your service and time slot.
        </li>
        <li><strong>Can I reschedule or cancel a booking?</strong>  
          Yes! Rescheduling is possible up to 24 hours before your appointment.
        </li>
      </ul>

      <h3 style={{ color: "gold" }}> Payments & Pricing</h3>
      <ul style={{ marginLeft: "20px" }}>
        <li><strong>What payment methods do you accept?</strong>  
          We accept UPI, debit/credit cards, and cash on delivery.
        </li>
        <li><strong>Are there any hidden charges?</strong>  
          Absolutely not — we believe in 100% transparent pricing.
        </li>
      </ul>

      <h3 style={{ color: "gold" }}> Services</h3>
      <ul style={{ marginLeft: "20px" }}>
        <li><strong>Do you use eco‑friendly cleaning products?</strong>  
          Yes! We use safe, eco‑friendly, and high‑quality products for all cleaning services.
        </li>
        <li><strong>Are your technicians verified?</strong>  
          Every technician undergoes strict background checks and training before joining us.
        </li>
      </ul>

      <h2 style={{ color: "gold", marginTop: "30px" }}>Service Guidelines</h2>
      <ul style={{ marginLeft: "20px" }}>
        <li>Please ensure someone is present at the location during service.</li>
        <li>For cleaning, kindly remove fragile items in advance.</li>
        <li>For installations, keep the appliance or product ready before our technician arrives.</li>
      </ul>

      <h2 style={{ color: "gold", marginTop: "30px" }}>Troubleshooting</h2>
      <ul style={{ marginLeft: "20px" }}>
        <li><strong>Didn’t receive a booking confirmation?</strong>  
          Check your email’s spam folder or contact our support team.
        </li>
        <li><strong>Technician delayed?</strong>  
          We’ll notify you in case of delays. You can also track updates via our support number.
        </li>
      </ul>

      <h2 style={{ color: "gold", marginTop: "30px" }}>Contact Support</h2>
      <p>
        Still need help? We’re just a call or message away.
      </p>
      <p>
         <strong>Phone:</strong> +91‑XXXXXXXXXX <br />
        <strong>Email:</strong> support@onlineservices.com <br />
      </p>

      <h2 style={{ color: "gold", marginTop: "30px" }}>Feedback & Suggestions</h2>
      <p>
        Your opinion matters! Share your feedback so we can keep improving our services and 
        deliver the best experience every time you choose 
        <strong style={{ color: "gold" }}> Onlineservices</strong>.
      </p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
  <button className="back-home-btn" onClick={() => navigate("/")}>Back to Home</button>
</div>
    </div>
  );
};

export default Help;
