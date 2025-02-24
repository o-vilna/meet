import React, { useState } from "react";

const NumberOfEvents = ({ setEventCount }) => {
  const [number, setNumber] = useState(32);
  const [errorText, setErrorText] = useState("");

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const numberValue = Number(value);

    if (value === "" || isNaN(numberValue) || numberValue <= 0 || numberValue > 32) {
      setErrorText("Please enter a number between 1 and 32");
    } else {
      setErrorText("");
      setNumber(value);
      setEventCount(numberValue);
    }
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of events:</label>
      <input
        id="number-of-events-input"
        type="text"
        value={number}
        onChange={handleInputChanged}
        aria-label="Number of events"
      />
      {errorText && <p className="error">{errorText}</p>}
    </div>
  );
};

export default NumberOfEvents; 