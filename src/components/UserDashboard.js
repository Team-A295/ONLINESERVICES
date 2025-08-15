import { useContext, useState } from "react";
import { BookingContext } from "../context/BookingContext";

const UserDashboard = () => {
  // -> Added `loading` from the context for the initial page load
  const { bookings, clearBookings, loading } = useContext(BookingContext);

  // -> Renamed state to be more specific to the button's action
  const [isClearing, setIsClearing] = useState(false);

  const handleClearBookings = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all your bookings? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      // -> Use the more specific state setter
      setIsClearing(true);
      await clearBookings();
      alert("All bookings deleted successfully.");
    } catch (error) {
      alert("Failed to delete bookings. Please try again.");
    } finally {
      // -> Use the more specific state setter
      setIsClearing(false);
    }
  };

  // -> Added a check for the initial data fetch
  if (loading) {
    return (
      <div className="activity-container">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="activity-container">
      <h2>User Dashboard</h2>

      {bookings.length > 0 ? (
        <>
          {bookings.map((item, idx) => (
            // -> Using item.id is the best practice for keys
            <div key={item.id} className="activity-card">
              <h3>Booking No: {idx + 1}</h3>
              {item.username && (
                <p>
                  <b>Name:</b> {item.username}
                </p>
              )}
              {item.category && (
                <p>
                  <b>Category:</b> {item.category}
                </p>
              )}
              {item.name && (
                <p>
                  <b>Service type:</b> {item.name}
                </p>
              )}
              {item.charges && (
                <p>
                  <b>Charges:</b> {item.charges}
                </p>
              )}
              {item.desc && (
                <p>
                  <b>Description:</b> {item.desc}
                </p>
              )}
              {item.city && (
                <p>
                  <b>City:</b> {item.city}
                </p>
              )}
              {item.area && (
                <p>
                  <b>Area:</b> {item.area}
                </p>
              )}
              {item.skill && (
                <p>
                  <b>Skill:</b> {item.skill}
                </p>
              )}
              {item.exp && (
                <p>
                  <b>Experience:</b> {item.exp}
                </p>
              )}
              <div className="service-footer">Service Booked</div>
            </div>
          ))}

          <button
            className="clear-btn"
            onClick={handleClearBookings}
            // -> Updated disabled check to use the new state name
            disabled={isClearing}
          >
            {/* -> Updated text check to use the new state name */}
            {isClearing ? "Clearing..." : "Clear All Bookings"}
          </button>
        </>
      ) : (
        <p>
          No recent activity yet. Book a service or worker to see your activity here.
        </p>
      )}
    </div>
  );
};

export default UserDashboard;