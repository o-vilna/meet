import React from "react";
import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("<App /> component", () => {
  let AppComponent;

  beforeEach(() => {
    AppComponent = render(<App />);
  });

  test("renders list of events", async () => {
    const AppDOM = AppComponent.container.firstChild;
    await waitFor(() => {
      const eventList = AppDOM.querySelector("#event-list");
      expect(eventList).toBeInTheDocument();
    });
  });

  test("renders CitySearch", async () => {
    const AppDOM = AppComponent.container.firstChild;
    await waitFor(() => {
      const citySearch = AppDOM.querySelector("#city-search");
      expect(citySearch).toBeInTheDocument();
    });
  });

  test("renders NumberOfEvents", async () => {
    const AppDOM = AppComponent.container.firstChild;

    await waitFor(() => {
      const numberOfEvents = AppDOM.querySelector("#number-of-events");
      expect(numberOfEvents).toBeInTheDocument();
    });
  });
});

describe("<App /> integration", () => {
  test("renders 32 events by default", async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    await waitFor(() => {
      const eventList = AppDOM.querySelector("#event-list");
      const events = within(eventList).queryAllByRole("listitem");
      expect(events.length).toBe(32);
    });
  });

  test("renders a list of events matching the city selected by the user", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    await waitFor(() => {
      const citySearch = AppDOM.querySelector("#city-search");
      expect(citySearch).toBeInTheDocument();
    });

    const citySearch = AppDOM.querySelector("#city-search");
    const cityInput = citySearch.querySelector("input");
    await user.click(cityInput);

    await waitFor(() => {
      const suggestionList = citySearch.querySelector("ul");
      expect(suggestionList).toBeInTheDocument();
    });

    const suggestionList = citySearch.querySelector("ul");
    const firstCity = suggestionList.firstChild;
    await user.click(firstCity);

    const eventList = AppDOM.querySelector("#event-list");
    const events = within(eventList).queryAllByRole("listitem");

    expect(events.length).toBeGreaterThan(0);
  });

  test("updates number of events when input changes", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    await waitFor(() => {
      const eventList = AppDOM.querySelector("#event-list");
      const initialEvents = within(eventList).queryAllByRole("listitem");
      console.log("Initial events length:", initialEvents.length);
      expect(initialEvents.length).toBe(32);
    });

    const numberOfEventsInput = AppDOM.querySelector("#number-of-events-input");

    await user.clear(numberOfEventsInput);
    await user.type(numberOfEventsInput, "10");

    await user.tab();

    await waitFor(
      () => {
        const eventList = AppDOM.querySelector("#event-list");
        const updatedEvents = within(eventList).queryAllByRole("listitem");
        console.log("Updated events length:", updatedEvents.length);
        expect(updatedEvents.length).toBe(10);
      },
      { timeout: 3000 }
    );
  });
});
