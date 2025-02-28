import React, { useState } from "react";

const NumberOfEvents = ({ setNumberOfEvents }) => {
  const [number, setNumber] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);
    setNumberOfEvents(Number(value)); // Конвертуємо в число
  };

  return (
    <div id="number-of-events">
      <input
        type="text"
        className="number-input"
        value={number}
        onChange={handleInputChanged}
      />
    </div>
  );
};

export default NumberOfEvents;
