import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { getEvents } from "../api";

const feature = loadFeature("./src/features/numberOfEvents.feature");

defineFeature(feature, (test) => {
  let AppComponent;

  // Тест 1: За замовчуванням кількість подій - 32
  test("Default number of events is 32", ({ given, when, then }) => {
    given("the user hasn’t specified the number of events", () => {});

    when("the user opens the app", () => {
      AppComponent = render(<App />);
    });

    then("the default number of displayed events should be 32", async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");

      // Додати waitFor, щоб дочекатися завантаження подій
      await waitFor(() => {
        const eventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(eventListItems.length).toBe(32);
      });
    });
  });

  // Тест 2: Користувач може змінити кількість подій
  test("User can change the number of displayed events", ({
    given,
    when,
    then,
  }) => {
    let AppDOM;
    let numberInput;

    given("the user sees the number of events input field", () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
      numberInput = within(NumberOfEventsDOM).queryByRole("textbox");
    });

    when("the user changes the number to 10", async () => {
      const user = userEvent.setup();
      await user.type(numberInput, "{backspace}{backspace}10");
    });

    then("the app should display 10 events", async () => {
      const EventListDOM = AppDOM.querySelector("#event-list");

      // Додати waitFor, щоб дочекатися оновлення подій після зміни кількості
      await waitFor(() => {
        const eventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(eventListItems.length).toBe(10);
      });
    });
  });
});
