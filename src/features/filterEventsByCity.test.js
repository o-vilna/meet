import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { getEvents } from "../api";

// Мокуємо компоненти графіків
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

const feature = loadFeature("./src/features/filterEventsByCity.feature");

defineFeature(feature, (test) => {
  let AppComponent;

  test("When user hasn't searched for a city, show upcoming events from all cities", ({
    given,
    when,
    then,
  }) => {
    given("user hasn't searched for any city", () => {});

    when("the user opens the app", () => {
      AppComponent = render(<App />);
    });

    then(
      "the user should see the list of upcoming events from all cities",
      async () => {
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector("#event-list");

        await waitFor(() => {
          const eventItems = within(EventListDOM).queryAllByRole("listitem");
          expect(eventItems).toHaveLength(32);
        });
      }
    );
  });

  test("User should see a list of suggestions when they search for a city", ({
    given,
    when,
    then,
  }) => {
    given("the main page is open", () => {
      AppComponent = render(<App />);
    });

    when("user starts typing in the city textbox", async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      const CitySearchDOM = AppDOM.querySelector("#city-search");
      const cityInput = within(CitySearchDOM).queryByRole("textbox");

      await user.type(cityInput, "Berlin");
    });

    then(
      "the user should receive a list of cities (suggestions) that match what they've typed",
      async () => {
        const AppDOM = AppComponent.container.firstChild;
        const CitySearchDOM = AppDOM.querySelector("#city-search");

        await waitFor(() => {
          const suggestionListItems =
            within(CitySearchDOM).queryAllByRole("listitem");
          expect(suggestionListItems.length).toBeGreaterThan(0);
        });
      }
    );
  });

  test("User can select a city from the suggested list", ({
    given,
    and,
    when,
    then,
  }) => {
    given('user was typing "Berlin" in the city textbox', async () => {
      AppComponent = render(<App />);
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      const CitySearchDOM = AppDOM.querySelector("#city-search");
      const cityInput = within(CitySearchDOM).queryByRole("textbox");

      await user.type(cityInput, "Berlin");
    });

    and("the list of suggested cities is showing", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const CitySearchDOM = AppDOM.querySelector("#city-search");

      await waitFor(() => {
        const suggestionListItems =
          within(CitySearchDOM).queryAllByRole("listitem");
        expect(suggestionListItems.length).toBeGreaterThan(0);
      });
    });

    when(
      'the user selects a city (e.g., "Berlin, Germany") from the list',
      async () => {
        const user = userEvent.setup();
        const AppDOM = AppComponent.container.firstChild;
        const CitySearchDOM = AppDOM.querySelector("#city-search");
        const suggestionListItems =
          within(CitySearchDOM).queryAllByRole("listitem");

        await user.click(suggestionListItems[0]);
      }
    );

    then(
      'their city should be changed to that city (i.e., "Berlin, Germany")',
      () => {
        const AppDOM = AppComponent.container.firstChild;
        const CitySearchDOM = AppDOM.querySelector("#city-search");
        const cityInput = within(CitySearchDOM).queryByRole("textbox");

        expect(cityInput.value).toBe("Berlin, Germany");
      }
    );

    and(
      "the user should receive a list of upcoming events in that city",
      async () => {
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector("#event-list");

        await waitFor(() => {
          const eventItems = within(EventListDOM).queryAllByRole("listitem");
          expect(eventItems.length).toBeGreaterThan(0);
        });
      }
    );
  });
});
