import React from 'react';
import { Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

// Import all your components
import Header from './components/Header';
import Home from './components/Home';
import Cleaning from './components/Cleaning';
import Repairs from './components/Repairs';
import Installations from './components/Installations';
import Services from './components/Services';
import Help from './components/Help';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import Settings from './components/Settings';
import Contractors from './components/Contractors';
import Painting from './components/Painting';
import PackersMovers from './components/PackersMovers';
import UserDashboard from './components/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import ContractorPage from './components/ContractorPage';

function App() {
  return (
    <div className="App-css">
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/cleaning" element={<Cleaning />} />
        <Route path="/repairs" element={<Repairs />} />
        <Route path="/installations" element={<Installations />} />
        <Route path="/painting" element={<Painting />} />
        <Route path="/packersmovers" element={<PackersMovers />} />
        <Route path="/services" element={<Services />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/contractors" element={<Contractors />} />
         <Route path="/contractors/:id" element={<ContractorPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/userdashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;