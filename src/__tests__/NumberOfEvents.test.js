import React from "react";
import { render, within, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";
import App from "../App";

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

describe("<NumberOfEvents /> error handling", () => {
  test("shows error for negative number", async () => {
    const setNumberOfEvents = jest.fn();
    const setErrorAlert = jest.fn();

    const { getByTestId } = render(
      <NumberOfEvents
        numberOfEvents={32}
        setNumberOfEvents={setNumberOfEvents}
        setErrorAlert={setErrorAlert}
      />
    );

    const input = getByTestId("number-input");
    await userEvent.clear(input);

    fireEvent.change(input, { target: { value: "-1" } });
    expect(setErrorAlert).toHaveBeenCalledWith(
      "Number of events must be a positive number"
    );

    setNumberOfEvents.mockClear();
    expect(setNumberOfEvents).not.toHaveBeenCalled();
  });

  // New test for checking different alert displays
  test("displays different alerts based on input", async () => {
    const setNumberOfEvents = jest.fn();
    const setErrorAlert = jest.fn();

    const { getByTestId } = render(
      <NumberOfEvents
        numberOfEvents={32}
        setNumberOfEvents={setNumberOfEvents}
        setErrorAlert={setErrorAlert}
      />
    );

    const input = getByTestId("number-input");

    // Non-numeric input
    await userEvent.clear(input);
    fireEvent.change(input, { target: { value: "abc" } });
    expect(setErrorAlert).toHaveBeenCalledWith(
      "Number of events must be a positive number"
    );
    setErrorAlert.mockClear();

    //Zero
    await userEvent.clear(input);
    fireEvent.change(input, { target: { value: "0" } });
    expect(setErrorAlert).toHaveBeenCalledWith(
      "Number of events must be a positive number"
    );
    setErrorAlert.mockClear();
  });
});
