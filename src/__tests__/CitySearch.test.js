// src/__tests__/CitySearch.test.js

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CitySearch from "../components/CitySearch";

describe("<CitySearch /> component", () => {
  let CitySearchComponent;
  const setCurrentCity = jest.fn();
  const suggestions = ["Berlin", "London", "Paris"];

  beforeEach(() => {
    CitySearchComponent = render(
      <CitySearch setCurrentCity={setCurrentCity} suggestions={suggestions} />
    );
  });

  test("renders text input", () => {
    const input = CitySearchComponent.getByPlaceholderText("Search for a city");
    expect(input).toBeInTheDocument();
  });

  test("suggestions list is hidden by default", () => {
    const suggestionList = CitySearchComponent.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders a list of suggestions when user types", () => {
    const input = CitySearchComponent.getByPlaceholderText("Search for a city");
    fireEvent.change(input, { target: { value: "Berlin" } });
    const suggestionList = CitySearchComponent.getByRole("list");
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList.children).toHaveLength(suggestions.length + 1); // +1 for "See all cities"
  });

  test("user can select a city from the suggested list", () => {
    const input = CitySearchComponent.getByPlaceholderText("Search for a city");
    fireEvent.change(input, { target: { value: "Berlin" } });
    const suggestionList = CitySearchComponent.getByRole("list");
    const suggestion = suggestionList.children[0];
    fireEvent.click(suggestion);
    expect(setCurrentCity).toHaveBeenCalledWith("Berlin");
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("shows suggestions when input receives focus", () => {
    const input = CitySearchComponent.getByPlaceholderText("Search for a city");
    fireEvent.focus(input);
    const suggestionList = CitySearchComponent.getByRole("list");
    expect(suggestionList).toBeInTheDocument();
  });

  test("selects 'See all cities' option", () => {
    const input = CitySearchComponent.getByPlaceholderText("Search for a city");
    fireEvent.change(input, { target: { value: "Berlin" } });
    const allCitiesOption = CitySearchComponent.getByText("See all cities");
    fireEvent.click(allCitiesOption);
    expect(setCurrentCity).toHaveBeenCalledWith("See all cities");
  });
});
