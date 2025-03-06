import React from "react";
import { render, fireEvent, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import App from "../App";
import { extractLocations, getEvents } from "../api";

describe("<CitySearch /> component", () => {
  let CitySearchComponent;
  const setCurrentCity = jest.fn();
  const setInfoAlert = jest.fn();
  const allLocations = ["Berlin", "London", "Paris"];

  beforeEach(() => {
    CitySearchComponent = render(
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert}
      />
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

  test("renders a list of suggestions when user types", async () => {
    const input = CitySearchComponent.getByPlaceholderText("Search for a city");
    fireEvent.change(input, { target: { value: "Berlin" } });

    // Чекаємо поки список з'явиться
    await CitySearchComponent.findByRole("list");
    const suggestionList = CitySearchComponent.getByRole("list");

    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList.children.length).toBeGreaterThan(0);
  });

  test("user can select a city from the suggested list", async () => {
    const input = CitySearchComponent.getByPlaceholderText("Search for a city");
    fireEvent.change(input, { target: { value: "Berlin" } });

    // Чекаємо поки список з'явиться
    await CitySearchComponent.findByRole("list");
    const suggestionList = CitySearchComponent.getByRole("list");

    const suggestion = suggestionList.children[0];
    fireEvent.click(suggestion);
    expect(setCurrentCity).toHaveBeenCalled();
    expect(setInfoAlert).toHaveBeenCalledWith("");
  });

  test("selects 'See all cities' option", async () => {
    const input = CitySearchComponent.getByPlaceholderText("Search for a city");
    fireEvent.change(input, { target: { value: "Berlin" } });

    // Чекаємо поки список з'явиться
    await CitySearchComponent.findByRole("list");
    const allCitiesOption = CitySearchComponent.getByText(/see all cities/i);

    fireEvent.click(allCitiesOption);
    expect(setCurrentCity).toHaveBeenCalledWith("See all cities");
    expect(setInfoAlert).toHaveBeenCalledWith("");
  });

  test("updates suggestions list when user types nothing", async () => {
    const user = userEvent.setup();
    const input = CitySearchComponent.getByPlaceholderText("Search for a city");

    // Спочатку вводимо якийсь текст
    await user.type(input, "Berlin");
    // Потім видаляємо його
    await user.clear(input);

    expect(setCurrentCity).toHaveBeenCalledWith("See all cities");
    expect(setInfoAlert).toHaveBeenCalled();
  });
});

describe("<CitySearch /> integration", () => {
  test("renders suggestions list when the app is rendered.", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const cityTextBox = within(CitySearchDOM).queryByRole("textbox");
    await user.click(cityTextBox);

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    await waitFor(() => {
      const suggestionListItems =
        within(CitySearchDOM).queryAllByRole("listitem");
      expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
  });
});
