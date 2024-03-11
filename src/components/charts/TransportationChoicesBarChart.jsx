import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { ChartContainer, ChartTitle } from "../ChartComponents";


// Define an array of colors for the bars
const BAR_COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#a4de6c",
  "#d0ed57",
  "#8dd1e1",
];

// Example function to process your RSVP data for the bar chart
const processDataForBarChart = (memberData) => {
  const transportCounts = memberData.reduce((acc, { plannedTransportation }) => {
    if (!plannedTransportation) return acc; // skip if no transportation plan
    acc[plannedTransportation] = (acc[plannedTransportation] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(transportCounts).map((key) => ({
    name: key,
    count: transportCounts[key],
  }));
};
const TransportationChoicesBarChart = ({ memberData, title }) => {
  const data = useMemo(() => processDataForBarChart(memberData), [memberData]);

  return (
    <ChartContainer>
      <ChartTitle>{title}</ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={BAR_COLORS[index % BAR_COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TransportationChoicesBarChart;
