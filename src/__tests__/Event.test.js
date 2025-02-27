import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event";
import { getEvents } from "../api";

describe("<Event /> component", () => {
  let EventComponent;
  let allEvents;

  beforeEach(async () => {
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />);
  });

  test("renders event title", () => {
    const title = EventComponent.queryByText(
      allEvents[0].summary || "No Title"
    );
    expect(title).toBeInTheDocument();
  });

  test("renders event start time", () => {
    const dateElement =
      EventComponent.container.querySelector("p:nth-child(2)");
    expect(dateElement).toBeInTheDocument();
  });

  test("renders event location", () => {
    const location = EventComponent.queryByText(
      allEvents[0].location || "No Location"
    );
    expect(location).toBeInTheDocument();
  });

  test("renders event details button with the title (show details)", () => {
    const button = EventComponent.queryByText("show details");
    expect(button).toBeInTheDocument();
  });

  test("by default, event's details section should be hidden", () => {
    const eventDetails =
      EventComponent.container.querySelector(".event-details");
    expect(eventDetails).not.toBeInTheDocument();
  });

  test("shows details section when user clicks 'show details' button", async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByText("show details");
    await user.click(button);

    const eventDetails =
      EventComponent.container.querySelector(".event-details");
    expect(eventDetails).toBeInTheDocument();
  });

  test("hides details section when user clicks 'hide details' button", async () => {
    const user = userEvent.setup();
    const showButton = EventComponent.queryByText("show details");
    await user.click(showButton);

    const hideButton = EventComponent.queryByText("hide details");
    await user.click(hideButton);

    const eventDetails =
      EventComponent.container.querySelector(".event-details");
    expect(eventDetails).not.toBeInTheDocument();
  });
});
