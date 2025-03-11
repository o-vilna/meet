import React from "react";
import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
    const numberOfEventsInput =
      within(NumberOfEventsDOM).queryByRole("textbox");

    await user.type(numberOfEventsInput, "{backspace}{backspace}10");

    const EventListDOM = AppDOM.querySelector("#event-list");
    const eventList = within(EventListDOM).queryAllByRole("listitem");

    expect(eventList.length).toBe(10);
  });
});
