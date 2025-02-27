import React, { useState } from "react";
import PropTypes from "prop-types";

const Event = ({ event = {} }) => {
  const [showDetails, setShowDetails] = useState(false);

  console.log("Event rendering:", event);

  const formatDate = (dateString) => {
    if (!dateString) return "No Date";
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <li className="event">
      <h2>{event.summary || "No Title"}</h2>
      <p>{formatDate(event.created)}</p>
      <p>{event.location || "No Location"}</p>
      <button
        className="details-btn"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? "hide details" : "show details"}
      </button>

      {showDetails && (
        <div className="event-details">
          <h3>Event Details</h3>
          <p>{event.description || "No Description Available"}</p>
        </div>
      )}
    </li>
  );
};

Event.propTypes = {
  event: PropTypes.shape({
    summary: PropTypes.string,
    created: PropTypes.string,
    location: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default Event;
