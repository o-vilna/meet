import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("<App /> component", () => {
  test("renders list of events", () => {
    const AppDOM = render(<App />).container.firstChild;
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });

  test("render CitySearch", () => {
    const AppDOM = render(<App />).container.firstChild;
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });

  test("render NumberOfEvents", () => {
    const AppDOM = render(<App />).container.firstChild;
    expect(AppDOM.querySelector("#number-of-events")).toBeInTheDocument();
  });
});
