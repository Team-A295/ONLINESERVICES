import React from "react";
import { useParams } from "react-router-dom";
import { workersData } from "./workersData";
import { FaStar } from "react-icons/fa";

const ContractorPage = () => {
  const { id } = useParams();
  const contractor = Object.values(workersData)
    .flat()
    .find((c) => c.id === id);

  if (!contractor) {
    return <p className="text-center mt-10">Contractor not found</p>;
  }

  return (
    <div className="contractor-page-container">
      <h1>{contractor.name}</h1>

      {/* Wrap image and info in a column container */}
      <div className="details-section">
        <img
          src={contractor.img}
          alt={contractor.name}
          className="worker-img"
        />

        <div className="details-text">
          <p><b>Skill:</b> {contractor.skill}</p>
          <p><b>Experience:</b> {contractor.exp}</p>
          <p><b>Charges:</b> {contractor.charges}</p>
          <p>
            <b>Rating:</b>{" "}
            <span style={{ color: "gold" }}>
              <FaStar /> {contractor.rating}
            </span>
          </p>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Reviews</h2>
        {contractor.reviews && contractor.reviews.length > 0 ? (
          <ul>
            {contractor.reviews.map((review, i) => (
              <li key={i}>
                <strong>{review.user}</strong>{" "}
                {review.stars ? (
                  <span style={{ color: "gold" }}>
                    <FaStar /> {review.stars}
                  </span>
                ) : (
                  <FaStar style={{ color: "lightgray" }} />
                )}
                : {review.comment}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ContractorPage;
