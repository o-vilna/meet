import React, { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  

  useEffect(() => {
    setSuggestions(allLocations);
  }, [allLocations]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);
    setShowSuggestions(true);
    
    // Filter locations while typing
    if (value.length === 0) {
      setSuggestions(allLocations);
      setCurrentCity("See all cities");
    } else {
      const filteredLocations = allLocations.filter((location) => {
        return location && location.toLowerCase().includes(value.toLowerCase());
      });
      setSuggestions(filteredLocations);
      // Update current city only if there is at least one letter
      if (filteredLocations.length > 0) {
        setCurrentCity(filteredLocations[0]);
      } else {
        setCurrentCity(value);
      }
      let infoText;
   if (filteredLocations.length === 0) {
     infoText = "We can not find the city you are looking for. Please try another city"
   } else {
     infoText = ""
   }
   setInfoAlert(infoText);
    };
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    setCurrentCity(value);
    setInfoAlert("")
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
        <ul className="suggestions" role="list">
          {suggestions.map((suggestion) => (
            <li 
              key={suggestion} 
              onClick={handleItemClicked}
              role="listitem"
            >
              {suggestion}
            </li>
          ))}
          <li 
            key="all" 
            onClick={handleItemClicked}
            role="listitem"
          >
            <b>See all cities</b>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
