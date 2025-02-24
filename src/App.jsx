import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents, extractLocations } from './api';

const App = () => {
  const [events, setEvents] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(32);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allEvents = await getEvents();
      const filteredEvents = currentCity === "See all cities" 
        ? allEvents 
        : allEvents.filter(event => event.location === currentCity);
      setEvents(filteredEvents.slice(0, numberOfEvents));
      setLocations(extractLocations(allEvents));
    };
    
    fetchData();
  }, [currentCity, numberOfEvents]);

  return (
    <div className="App">
      <CitySearch 
        setCurrentCity={setCurrentCity}
        suggestions={locations}
      />
      <NumberOfEvents setEventCount={setNumberOfEvents} />
      <EventList events={events} />
    </div>
  );
}

export default App;
