import React, { useState } from "react";

const NumberOfEvents = ({ setNumberOfEvents }) => {
  const [numberOfEvents, setNumber] = useState(32);
  const [errorText, setErrorText] = useState("");

  const handleInputChanged = (event) => {
    const value = event.target.value;
    const parsedValue = parseInt(value);

    if (value === "") {
      setNumber("");
      setErrorText("");
    } else if (isNaN(parsedValue)) {
      setNumber(value);
      setErrorText("Please enter a valid number");
    } else if (parsedValue > 0 && parsedValue <= 32) {
      setNumber(parsedValue);
      setNumberOfEvents(parsedValue);
      setErrorText("");
    } else {
      setNumber(value);
      setErrorText("");
    }
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        id="number-of-events-input"
        type="text"
        value={numberOfEvents}
        onChange={handleInputChanged}
        role="textbox"
      />
      {errorText && <p className="error">{errorText}</p>}
    </div>
  );
};

export default NumberOfEvents;
