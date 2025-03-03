import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("An event element is collapsed by default", ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;

    given("the user opens the events page", () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
    });

    when("the page loads", async () => {
      await waitFor(() => {
        const eventList = AppDOM.querySelector("#event-list");
        expect(eventList).toBeTruthy();
      });
    });

    then("all event elements are collapsed by default", async () => {
      await waitFor(() => {
        const eventList = AppDOM.querySelector("#event-list");
        const events = within(eventList).queryAllByRole("listitem");
        expect(events.length).toBeGreaterThan(0);

        events.forEach((event) => {
          const button = within(event).queryByRole("button");
          expect(button.textContent).toBe("show details");
        });
      });
    });
  });

  test("User can expand an event to see details", ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;
    let eventElement;
    let button;

    given("an event is collapsed", async () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;

      await waitFor(() => {
        const eventList = AppDOM.querySelector("#event-list");
        const events = within(eventList).queryAllByRole("listitem");
        expect(events.length).toBeGreaterThan(0);
        eventElement = events[0];
        button = within(eventElement).queryByRole("button");
        expect(button.textContent).toBe("show details");
      });
    });

    when("the user clicks on the event", async () => {
      const user = userEvent.setup();
      await user.click(button);
    });

    then("the event details are displayed", async () => {
      await waitFor(() => {
        expect(button.textContent).toBe("hide details");
      });
    });
  });

  test("User can collapse an event to hide details", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;
    let eventElement;
    let button;

    given("an event is expanded", async () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;

      await waitFor(() => {
        const eventList = AppDOM.querySelector("#event-list");
        const events = within(eventList).queryAllByRole("listitem");
        expect(events.length).toBeGreaterThan(0);
        eventElement = events[0];
        button = within(eventElement).queryByRole("button");
      });

      const user = userEvent.setup();
      await user.click(button);

      await waitFor(() => {
        expect(button.textContent).toBe("hide details");
      });
    });

    when("the user clicks on the event", async () => {
      const user = userEvent.setup();
      await user.click(button);
    });

    then("the event details are hidden", async () => {
      await waitFor(() => {
        expect(button.textContent).toBe("show details");
      });
    });
  });
});
