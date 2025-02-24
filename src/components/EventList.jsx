import React from "react";
import Event from "./Event";

const EventList = ({ events = [] }) => {
	return (
		<ul id="event-list">
			{events.map((event, index) => (
				<Event 
					key={`${event.id || event.summary}-${index}`} 
					event={event} 
				/>
			))}
		</ul>
	);
};

export default EventList;