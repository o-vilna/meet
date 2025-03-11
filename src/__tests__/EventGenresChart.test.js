import React from "react";
import { render, screen, act } from "@testing-library/react";
import EventGenresChart from "../components/EventGenresChart";
import { getEvents } from "../api";

jest.mock("recharts", () => {
  const OriginalModule = jest.requireActual("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    PieChart: ({ children }) => <div role="presentation">{children}</div>,
    Pie: ({ data, label }) => (
      <div>
        Pie
        {data &&
          data.map((item, index) => (
            <div key={index} data-name={item.name} data-value={item.value}>
              {item.name}: {item.value}
            </div>
          ))}
        {label && <div>Has Custom Label</div>}
      </div>
    ),
    Cell: () => <div>Cell</div>,
    Legend: () => <div>Legend</div>,
    Tooltip: () => <div>Tooltip</div>,
  };
});

describe("<EventGenresChart />", () => {
  let allEvents;

  beforeAll(async () => {
    allEvents = await getEvents();
  });

  test("renders chart when events are provided", async () => {
    await act(async () => {
      render(<EventGenresChart events={allEvents} />);
    });

    expect(screen.getByText("Pie")).toBeInTheDocument();
    expect(screen.getByText("Tooltip")).toBeInTheDocument();
    expect(screen.getByText("Has Custom Label")).toBeInTheDocument();
  });

  test("does not crash when no events are provided", async () => {
    await act(async () => {
      render(<EventGenresChart events={[]} />);
    });

    expect(screen.getByRole("presentation")).toBeInTheDocument();
  });

  test("getData function returns correct data format", async () => {
    const testEvents = [
      { summary: "React Workshop" },
      { summary: "JavaScript Conference" },
      { summary: "React Native Meetup" },
      { summary: "Node.js Workshop" },
      { summary: "Angular vs React" },
    ];

    await act(async () => {
      render(<EventGenresChart events={testEvents} />);
    });

    expect(screen.getByText("React: 3")).toBeInTheDocument();
    expect(screen.getByText("JavaScript: 1")).toBeInTheDocument();
    expect(screen.getByText("Node: 1")).toBeInTheDocument();
    expect(screen.getByText("Angular: 1")).toBeInTheDocument();
  });

  test("renders chart correctly with data", async () => {
    render(<EventGenresChart events={allEvents} />);

    expect(screen.getByText(/React/i)).toBeInTheDocument();
  });

  test("handles empty events array", () => {
    render(<EventGenresChart events={[]} />);

    expect(screen.queryByText(/React/i)).not.toBeInTheDocument();
  });

  test("handles null events", () => {
    render(<EventGenresChart events={null} />);

    expect(screen.queryByText(/React/i)).not.toBeInTheDocument();
  });
});
