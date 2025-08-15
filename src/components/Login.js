import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // -> Import useLocation
import '../App.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../context/firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // -> Get the current location object

  // -> Determine where to redirect after login.
  // It defaults to '/services' if the user came directly to the login page.
  const from = location.state?.from?.pathname || '/services';

  // -> The function now accepts the form event 'e'
  const handleLogin = async (e) => {
    e.preventDefault(); // -> Prevent the page from reloading on submit

    if (!email || !password) {
      setError('⚠️ Please fill in both fields');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(' Login successful!');
      // -> Navigate to the 'from' location after a successful login
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Firebase login error:", err.code, err.message);

      if (err.code === "auth/user-not-found") {
        setError("❌ No account found. Redirecting to Signup...");
        setTimeout(() => navigate('/signup'), 2000);
      } else if (err.code === "auth/invalid-email") {
        setError("❌ Invalid email format");
      } else if (err.code === "auth/wrong-password") {
        setError("❌ Incorrect password. Please try again.");
      } else if (err.code === "auth/too-many-requests") {
        setError("⚠️ Too many attempts. Please try again later.");
      } else {
        setError("❌ You do not have an account. Redirecting to Signup...");
        setTimeout(() => navigate('/signup'), 2000);
      }
    }
  };

  return (
    <div className="auth-page">
      {/* -> The form now handles the submission */}
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Login to Book Services</h2>
        {error && <div className="auth-error">{error}</div>}

        <input
          className="auth-input"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {/* -> The button is now a 'submit' type */}
        <button className="auth-btn" type="submit">
          Submit
        </button>
        <button
          type="button" // -> Set type to 'button' to prevent form submission
          className="auth-btn auth-btn-secondary mt-2"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>

        <p className="text-center mt-3">
          Don't have an account?{' '}
          <span
            className="auth-link"
            style={{ cursor: 'pointer', color: '#2c5364' }}
            onClick={() => navigate('/signup')}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;