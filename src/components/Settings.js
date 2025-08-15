import { useNavigate } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri"; 
import "../App.css";

import { signOut } from "firebase/auth";      // <-- import signOut
import { auth } from "../context/firebase";  // <-- adjust path to your firebase config

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);  // Sign out user from Firebase
      navigate("/login");   // Then redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="settings-page">
      <i className="fas fa-cogs fa-3x card-icon"></i>
      <h1 className="text-center">Settings</h1>
      <p className="text-center">
        Manage your account and preferences here. You can log out anytime.
      </p>
      <div className="text-center" style={{ marginTop: "40px" }}>
        <button className="logout-btn" onClick={handleLogout}>
          <RiLogoutBoxRLine size={20} style={{ marginRight: "8px" }} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
