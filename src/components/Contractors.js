import { Link } from "react-router-dom";
import { workersData } from "./workersData"; // make sure path is correct

const Contractors = () => {
  return (
    <div className="guys-detail">
      <h1>Our Skilled Contractors</h1>
      <p>
        Browse our professional contractors across various categories. Click on a contractor to view more details and reviews.
      </p>

      {Object.entries(workersData).map(([category, workers]) => (
        <div key={category} className="category-section">
          <h3 style={{ color: "gold", fontSize: "30px", textAlign: "center" }}>
            {category}
          </h3>

          <div className="guys-grid">
            {workers.map((worker) => (
              <div key={worker.id} className="guys-card">
                <div className="logo-container">
                  <img src={worker.img} alt={worker.name} className="service-logo" />
                </div>

                <div className="card-info" style={{ flexGrow: 1 }}>
                  <h3>{worker.name}</h3>
                  <p><b>Skill:</b> {worker.skill}</p>
                  <p><b>Experience:</b> {worker.exp}</p>
                  <p className="guys-price"><b>Charges:</b> {worker.charges}</p>
                  <p><b>Rating:</b> ⭐ {worker.rating} / 5</p>
                  <p><b>Reviews:</b> {worker.reviews?.length || 0}</p>
                </div>

                <Link to={`/contractors/${worker.id}`} className="guys-btn">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contractors;
