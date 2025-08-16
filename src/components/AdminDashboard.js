import React, { useState, useEffect, useContext, useMemo } from "react";
import { db } from "../context/firebase";
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { BookingContext } from "../context/BookingContext";
import "../App.css";

const AdminDashboard = () => {
  const { bookings: userBookings } = useContext(BookingContext);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    const usersRef = collection(db, "users");
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => console.error(error));
    return () => unsubscribe();
  }, []);

  // Real-time bookings listener
  useEffect(() => {
    setLoading(true);
    const bookingsRef = collection(db, "bookings");
    const unsubscribe = onSnapshot(bookingsRef, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, (error) => {
      console.error(error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Sync with BookingContext
  useEffect(() => {
    setBookings(userBookings);
  }, [userBookings]);

  const filteredBookings = useMemo(() => {
    return bookings.filter(
      (b) =>
        b.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [bookings, searchTerm]);

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to permanently delete this booking?")) {
      try {
        await deleteDoc(doc(db, "bookings", bookingId));
        setBookings(prev => prev.filter(b => b.id !== bookingId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEditClick = (booking) => {
    setEditingBooking(booking);
    setNewStatus(booking.status || "Pending");
  };

  const handleUpdateStatus = async () => {
    if (!editingBooking || !newStatus.trim()) return;
    try {
      const bookingRef = doc(db, "bookings", editingBooking.id);
      await updateDoc(bookingRef, { status: newStatus });
      setEditingBooking(null);
      setNewStatus("");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <h1>Loading Dashboard...</h1>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <h2>All Users ({users.length})</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role || "user"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>All Bookings ({bookings.length})</h2>

      <input
        type="text"
        placeholder="Search bookings by service, email, or status..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User Email</th>
              <th>Service</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? filteredBookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.userEmail}</td>
                <td>{booking.name}</td>
                <td>
                  {editingBooking && editingBooking.id === booking.id ? (
                    <input
                      type="text"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="status-input"
                    />
                  ) : (
                    <span className={`status-badge ${booking.status?.toLowerCase() || "pending"}`}>
                      {booking.status || "Pending"}
                    </span>
                  )}
                </td>
                <td>
                  {editingBooking && editingBooking.id === booking.id ? (
                    <>
                      <button className="edit-btn" onClick={handleUpdateStatus}>Save</button>
                      <button className="delete-btn" onClick={() => setEditingBooking(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="edit-btn" onClick={() => handleEditClick(booking)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", fontStyle: "italic" }}>
                  No bookings available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="center-btn">
        <button className="back-home-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
