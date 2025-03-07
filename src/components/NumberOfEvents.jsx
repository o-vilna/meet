import React, { useState } from "react";

const NumberOfEvents = ({ setNumberOfEvents, setErrorAlert = () => {} }) => {
  const [number, setNumber] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);
    console.log("Input value:", value);

    // Check if the input value is a valid number
    if (isNaN(value) || parseInt(value) <= 0) {
      console.log("Invalid value, not calling setNumberOfEvents");
      // If the value is not a number or less than/equal to 0, show an error
      setErrorAlert("Number of events must be a positive number");
    
    } else {
      console.log("Valid value, calling setNumberOfEvents");
      // If the value is valid, clear the error and update the state
      setErrorAlert("");
      setNumberOfEvents(Number(value));
    }
  };

  return (
    <div className="number-of-events" id="number-of-events">
      <label htmlFor="number-input">Number of events: </label>
      <input
        type="text"
        id="number-input"
        className="number-input"
        value={number}
        onChange={handleInputChanged}
        data-testid="number-input"
      />
    </div>
  );
};

export default NumberOfEvents;
