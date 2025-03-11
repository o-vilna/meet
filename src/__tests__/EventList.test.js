import React from "react";
import { render, waitFor, within } from "@testing-library/react";
import { getEvents } from "../api";
import EventList from "../components/EventList";
import App from "../App";

jest.mock("../components/CityEventsChart", () => {
  return function MockCityEventsChart() {
    return <div data-testid="mock-chart">Chart Component Mock</div>;
  };
});

jest.mock("../components/EventGenresChart", () => {
  return function MockEventGenresChart() {
    return <div data-testid="mock-genres-chart">Event Genres Chart Mock</div>;
  };
});

describe("<EventList /> component", () => {
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(
      <EventList events={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />
    );
  });

  test("renders correct number of events", () => {
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
  });

  test("renders empty list when no events are passed", () => {
    const EventListComponent = render(<EventList />);
    const eventList = EventListComponent.container.querySelector("#event-list");
    expect(eventList.children).toHaveLength(0);
  });
});

test("renders a list of 32 events when the app is mounted and rendered", async () => {
  const AppComponent = render(<App />);
  const AppDOM = AppComponent.container.firstChild;
  const EventListDOM = AppDOM.querySelector("#event-list");
  await waitFor(() => {
    const EventListItems = within(EventListDOM).queryAllByRole("listitem");
    expect(EventListItems.length).toBe(32);
  });
});
