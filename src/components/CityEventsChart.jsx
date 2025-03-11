import React, { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(getData());
  }, [events, allLocations]);

  const getData = () => {
    if (!allLocations || !events) {
      return [];
    }

    const data = allLocations
      .filter((location) => location && typeof location === "string")
      .map((location) => {
        const number = events.filter(
          (event) => event.location === location
        ).length;
        const city = location.split(/(, | - )/)[0];
        return { city, number };
      });
    return data;
  };

  // Додаємо перевірку на наявність даних
  if (data.length === 0) {
    return <div>No data available for the chart</div>;
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        margin: "20px 0",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <h3>Events in Each City</h3>
      <div style={{ width: "100%", height: "400px", border: "1px solid #ddd" }}>
        <ResponsiveContainer width="99%" height={400}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 60,
              left: -30,
            }}
          >
            <CartesianGrid />
            <XAxis
              type="category"
              dataKey="city"
              name="City"
              angle={60}
              interval={0}
              tick={{ dx: 20, dy: 40, fontSize: 14 }}
            />
            <YAxis
              type="number"
              dataKey="number"
              name="Number of events"
              allowDecimals={false}
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="Events" data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
        {`Total cities: ${data.length}`}
      </div>
    </div>
  );
};

export default CityEventsChart;
