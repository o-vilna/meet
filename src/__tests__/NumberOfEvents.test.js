import React from "react";
import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";
import App from "../App";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsComponent;

  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents setNumberOfEvents={() => {}} />
    );
  });

  test("renders number input", () => {
    const numberInput = NumberOfEventsComponent.queryByRole("textbox");
    expect(numberInput).toBeInTheDocument();
  });

  test("default number is 32", () => {
    const numberInput = NumberOfEventsComponent.queryByRole("textbox");
    expect(numberInput.value).toBe("32");
  });

  test("number of events changes when user types", async () => {
    const user = userEvent.setup();
    const numberInput = NumberOfEventsComponent.queryByRole("textbox");
    await user.type(numberInput, "{backspace}{backspace}10");
    expect(numberInput.value).toBe("10");
  });
});

describe("<NumberOfEvents /> integration", () => {
  test("user can change number of events", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const NumberOfEventsDOM = AppDOM.querySelector("#number-of-events");
    const numberInput = within(NumberOfEventsDOM).queryByRole("textbox");

    await user.type(numberInput, "{backspace}{backspace}10");

    const EventListDOM = AppDOM.querySelector("#event-list");
    const eventList = within(EventListDOM).queryAllByRole("listitem");

    expect(eventList.length).toBe(10);
  });
});
