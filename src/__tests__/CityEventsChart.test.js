import React from "react";
import { render, screen } from "@testing-library/react";
import CityEventsChart from "../components/CityEventsChart";
import { getEvents, extractLocations } from "../api";

jest.mock("recharts", () => {
  const OriginalModule = jest.requireActual("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    ScatterChart: ({ children }) => <div>{children}</div>,
    Scatter: () => <div>Scatter</div>,
    XAxis: () => <div>XAxis</div>,
    YAxis: () => <div>YAxis</div>,
    CartesianGrid: () => <div>CartesianGrid</div>,
    Tooltip: () => <div>Tooltip</div>,
  };
});

describe("CityEventsChart", () => {
  test("renders chart correctly with data", async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    render(<CityEventsChart allLocations={allLocations} events={allEvents} />);

    expect(screen.getByText(/Scatter/i)).toBeInTheDocument();
  });

  test("handles empty locations array", async () => {
    const allEvents = await getEvents();
    render(<CityEventsChart allLocations={[]} events={allEvents} />);

    expect(
      screen.getByText(/No data available for the chart/i)
    ).toBeInTheDocument();
  });

  test("handles null events", () => {
    render(
      <CityEventsChart allLocations={["Berlin, Germany"]} events={null} />
    );

    expect(
      screen.getByText(/No data available for the chart/i)
    ).toBeInTheDocument();
  });
});
