import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { getEvents } from "../api";

jest.mock("../components/CityEventsChart", () => {
  return function MockCityEventsChart() {
    return <div data-testid="mock-city-chart">City Events Chart</div>;
  };
});

jest.mock("../components/EventGenresChart", () => {
  return function MockEventGenresChart() {
    return <div data-testid="mock-genres-chart">Event Genres Chart</div>;
  };
});

const feature = loadFeature("./src/features/numberOfEvents.feature");

defineFeature(feature, (test) => {
  let AppComponent;

  // Тест 1: За замовчуванням кількість подій - 32
  test("Default number of events is 32", ({ given, when, then }) => {
    given("the user hasn't specified the number of events", () => {});

    when("the user opens the app", () => {
      AppComponent = render(<App />);
    });

    then("the default number of displayed events should be 32", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");

      await waitFor(
        () => {
          const eventListItems =
            within(EventListDOM).queryAllByRole("listitem");
          expect(eventListItems.length).toBe(32);
        },
        { timeout: 5000 }
      );
    });
  });

  // Тест 2: Користувач може змінити кількість подій
  test("User can change the number of displayed events", ({
    given,
    when,
    then,
  }) => {
    given("the user sees the number of events input field", () => {
      AppComponent = render(<App />);
    });

    when("the user changes the number to 10", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
      const numberInput = within(NumberOfEventsDOM).queryByRole("textbox");

      const user = userEvent.setup();
      await user.clear(numberInput);
      await user.type(numberInput, "10");
    });

    then("the app should display 10 events", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");

      await waitFor(
        () => {
          const eventListItems =
            within(EventListDOM).queryAllByRole("listitem");
          expect(eventListItems.length).toBe(10);
        },
        { timeout: 5000 }
      );
    });
  });
});
