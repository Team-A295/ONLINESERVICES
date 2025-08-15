import React, { useState, useEffect } from 'react';
import { db } from '../context/firebase'; 
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // --- State for non-blocking confirmation dialogs ---
    const [editingBooking, setEditingBooking] = useState(null);
    const [newStatus, setNewStatus] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch all user documents from the 'users' collection
                const usersSnapshot = await getDocs(collection(db, "users"));
                setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

                // Fetch all booking documents from the TOP-LEVEL 'bookings' collection
                const bookingsSnapshot = await getDocs(collection(db, "bookings"));
                setBookings(bookingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            } catch (error) {
                console.error("Error fetching admin data: ", error);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleDeleteBooking = async (bookingId) => {
        // Using a standard confirm dialog for simplicity, but a custom modal is better
        if (window.confirm("Are you sure you want to permanently delete this booking?")) {
            try {
                await deleteDoc(doc(db, "bookings", bookingId));
                setBookings(bookings.filter(b => b.id !== bookingId));
            } catch (error) {
                console.error("Error deleting booking: ", error);
            }
        }
    };

    const handleEditClick = (booking) => {
        setEditingBooking(booking);
        setNewStatus(booking.status); 
    };

    const handleUpdateStatus = async () => {
        if (!editingBooking || !newStatus.trim()) return;

        try {
            const bookingRef = doc(db, "bookings", editingBooking.id);
            await updateDoc(bookingRef, { status: newStatus });
            setBookings(bookings.map(b => b.id === editingBooking.id ? { ...b, status: newStatus } : b));
        } catch (error) {
            console.error("Error updating booking status: ", error);
        } finally {
            // Reset editing state
            setEditingBooking(null);
            setNewStatus("");
        }
    };


    if (loading) {
        return <h1>Loading Dashboard...</h1>;
    }

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            <h2>All Users ({users.length})</h2>
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
                            <td>{user.role || 'user'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>All Bookings ({bookings.length})</h2>
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
                    {bookings.map(booking => (
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
                                    booking.status
                                )}
                            </td>
                            {/* CORRECTED PART: 
                              The <td> itself is the table cell.
                              Inside it, we create a <div> with the class "admin-actions".
                              This div becomes the flex container for the buttons, allowing alignment.
                            */}
                            <td>
                                <div className="admin-actions">
                                    {editingBooking && editingBooking.id === booking.id ? (
                                        <>
                                            <button className="edit-btn" onClick={handleUpdateStatus}>Save</button>
                                            <button className="delete-btn" onClick={() => setEditingBooking(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="edit-btn" onClick={() => handleEditClick(booking)}>Edit Status</button>
                                            <button className="delete-btn" onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <button className="back-home-btn" onClick={() => navigate("/")}>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;
