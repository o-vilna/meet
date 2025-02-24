import React from "react";
import { render } from "@testing-library/react";
import EventList from "../components/EventList";

describe("<EventList /> component", () => {
  test('has an element with "list" role', () => {
    const EventListComponent = render(<EventList />);
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test("renders correct number of events", () => {
    const events = [
      { id: 1, summary: "Event 1" },
      { id: 2, summary: "Event 2" },
      { id: 3, summary: "Event 3" },
    ];
    const EventListComponent = render(<EventList events={events} />);
    const eventElements =
      EventListComponent.container.querySelectorAll(".event");
    expect(eventElements).toHaveLength(3);
  });

  test("renders empty list when no events are passed", () => {
    const EventListComponent = render(<EventList />);
    const eventList = EventListComponent.container.querySelector("#event-list");
    expect(eventList.children).toHaveLength(0);
  });
});
