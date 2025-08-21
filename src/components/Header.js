import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { BookingContext } from '../context/BookingContext';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { userProfile } = useContext(BookingContext);
    return (
        <header className="main-header">
            <div className="header-content">
                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={30} /> : <Menu size={30} />}
                </button>
                <Link to="/" className="logo-link">
                    <div className="logo">ONLINE SERVICES</div>
                </Link>
                <div className="nav-right">
                    <Link to="/login" className="nav-button login-btn">Login</Link>
                    <Link to="/signup" className="nav-button signup-btn">Sign Up</Link>
                </div>
            </div>
            {menuOpen && (
                <div className="hamburger-menu">
                    <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link><hr />
                    <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link><hr />
                    <Link to="/help" onClick={() => setMenuOpen(false)}>Help</Link><hr />
                    <Link to="/settings" onClick={() => setMenuOpen(false)}>Settings</Link><hr />
                    <Link to="/contractors" onClick={() => setMenuOpen(false)}>Contractors</Link><hr />
                    <Link to="/userdashboard" onClick={() => setMenuOpen(false)}>UserDashboard</Link><hr />
                    
                    {userProfile?.role === 'admin' && (
                        <>
                         <Link to="/admin" onClick={() => setMenuOpen(false)} style={{ color: '#FFD700', fontWeight: 'bold' }}> Admin Dashboard
                         </Link>
                    
                        </>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;