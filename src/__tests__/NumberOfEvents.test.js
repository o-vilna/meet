import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsComponent;
  const setEventCount = jest.fn();

  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents setEventCount={setEventCount} />
    );
  });

  test("renders text input with default value 32", () => {
    const input = NumberOfEventsComponent.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("32");
  });

  test("user can change number of events", () => {
    const input = NumberOfEventsComponent.getByRole("textbox");
    fireEvent.change(input, { target: { value: "10" } });
    expect(input.value).toBe("10");
    expect(setEventCount).toHaveBeenCalledWith(10);
  });

  test("shows error for invalid number", () => {
    const input = NumberOfEventsComponent.getByRole("textbox");
    fireEvent.change(input, { target: { value: "33" } });
    const errorMessage = NumberOfEventsComponent.getByText(
      "Please enter a number between 1 and 32"
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
