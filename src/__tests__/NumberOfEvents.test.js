import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsComponent;
  const setNumberOfEvents = jest.fn();

  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents setNumberOfEvents={setNumberOfEvents} />
    );
  });

  test("renders number of events text input", () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole("textbox");
    expect(numberTextBox).toBeInTheDocument();
  });

  test("default number is 32", async () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole("textbox");
    expect(numberTextBox).toHaveValue("32");
  });

  test("number of events text box value changes when the user types in it", async () => {
    const user = userEvent.setup();
    const numberTextBox = NumberOfEventsComponent.queryByRole("textbox");

    await user.clear(numberTextBox);
    await user.type(numberTextBox, "10");

    expect(numberTextBox).toHaveValue("10");
  });
});
