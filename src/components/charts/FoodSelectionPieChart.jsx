import React, { useMemo } from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { toTitleCaseNoSpaces } from "../../utils";
import { ChartContainer, ChartTitle } from "../ChartComponents"

const COLORS = ["#414A43", "#803404", "#995A6D", "#520707"];

const preprocessDataForPieChart = (memberData) => {
  const countMap = memberData.reduce((acc, user) => {
    let { dinnerSelection } = user;

    if (!dinnerSelection) return acc; // skip if no dinner selection

    dinnerSelection = toTitleCaseNoSpaces(dinnerSelection);

    acc[dinnerSelection] = (acc[dinnerSelection] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(countMap).map(([name, value]) => ({ name, value }));
};

const FoodSelectionPieChart = ({ memberData, title }) => {
  const data = useMemo(() => preprocessDataForPieChart(memberData), [memberData]);

  return (
    <ChartContainer>
      <ChartTitle>{title}</ChartTitle>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ChartContainer>
  );
};

export default FoodSelectionPieChart;
