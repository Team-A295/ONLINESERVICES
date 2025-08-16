import { useContext, useState } from "react";
import { BookingContext } from "../context/BookingContext";
import "../App.css";

const UserDashboard = () => {
  const { bookings, clearBookings, loading } = useContext(BookingContext);
  const [isClearing, setIsClearing] = useState(false);

  const handleClearBookings = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all your bookings?"
    );
    if (!confirmDelete) return;

    setIsClearing(true);
    try {
      await clearBookings();
      alert("All your bookings have been successfully deleted!");
    } catch (error) {
      console.error("Error clearing bookings:", error);
      alert("Something went wrong while clearing bookings.");
    } finally {
      setIsClearing(false);
    }
  };

  if (loading)
    return (
      <div className="activity-container">
        <h2>Loading Dashboard...</h2>
      </div>
    );

  return (
    <div className="activity-container">
      <h2>User Dashboard</h2>

      {bookings.length > 0 ? (
        <>
          <div className="bookings-grid">
            {bookings.map((item, idx) => (
              <div key={item.id} className="activity-card">
                <h3>
                  Booking No: {idx + 1}
                  <hr
                    style={{
                      borderColor: "gold",
                      borderWidth: "1px",
                      marginTop: "5px",
                      marginBottom: "10px",
                    }}
                  />
                </h3>
                {item.username && <p><b>Name:</b> {item.username}</p>}
                {item.category && <p><b>Category:</b> {item.category}</p>}
                {item.name && <p><b>Service:</b> {item.name}</p>}
                {item.charges && <p><b>Charges:</b> {item.charges}</p>}
                {item.desc && <p><b>Description:</b> {item.desc}</p>}
                {item.city && <p><b>City:</b> {item.city}</p>}
                {item.area && <p><b>Area:</b> {item.area}</p>}
                {item.contractorName && <p><b>Contractor:</b> {item.contractorName}</p>}

                <hr
                  style={{
                    borderColor: "gold",
                    borderWidth: "1px",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                />
                <div
                  style={{
                    textAlign: "center",
                    color: "gold",
                    marginTop: "10px",
                    fontWeight: "bold",
                  }}
                >
                 <h3>Service Booked</h3>
                </div>
              </div>
            ))}
          </div>

          <button
            className="clear-btn"
            onClick={handleClearBookings}
            disabled={isClearing}
          >
            {isClearing ? "Clearing..." : "Clear All Bookings"}
          </button>
        </>
      ) : (
        <p>No recent activity found. Book a service to see your activity here.</p>
      )}
    </div>
  );
};

export default UserDashboard;
