import React, { useState, useEffect } from "react";

const CitySearch = ({ setCurrentCity, allLocations = [] }) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const validLocations = Array.isArray(allLocations) ? allLocations : [];
    setSuggestions(validLocations);
  }, [allLocations]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);

    const validLocations = Array.isArray(allLocations) ? allLocations : [];

    const filteredLocations = validLocations.filter((location) => {
      if (!location || typeof location !== "string") return false;

      try {
        return location.toLowerCase().includes(value.toLowerCase());
      } catch (error) {
        console.error("Error filtering location:", error);
        return false;
      }
    });

    setSuggestions(filteredLocations);
    setShowSuggestions(true);

    setCurrentCity(value);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
  };

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
        placeholder="Search for a city"
        value={query}
        onChange={handleInputChanged}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && (
        <ul className="suggestions">
          {/* Показуємо відфільтровані міста тільки якщо вони є */}
          {Array.isArray(suggestions) &&
            suggestions.length > 0 &&
            suggestions.map((suggestion, index) => (
              <li key={`${suggestion}-${index}`} onClick={handleItemClicked}>
                {suggestion}
              </li>
            ))}
          {/* Завжди показуємо "See all cities" */}
          <li key="all" onClick={handleItemClicked}>
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
