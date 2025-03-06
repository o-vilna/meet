import React, { useState } from "react";

const NumberOfEvents = ({ setNumberOfEvents, setErrorAlert = () => {} }) => {
  const [number, setNumber] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);
    console.log("Введене значення:", value);

    // Перевіряємо чи введене значення є коректним числом
    if (isNaN(value) || parseInt(value) <= 0) {
      console.log("Некоректне значення, не викликаємо setNumberOfEvents");
      //Якщо значення не є числом або менше/рівне 0, показуємо помилку
      setErrorAlert("Кількість подій має бути додатнім числом");
      // НЕ викликаємо setNumberOfEvents при некоректному вводі
    } else {
      console.log("Valid value, calling setNumberOfEvents");
      // If the value is valid, clear the error and update the state
      setErrorAlert("");
      setNumberOfEvents(Number(value)); // Convert to number
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
