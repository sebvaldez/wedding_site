import React, { useMemo } from "react";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { COLOR_PALETTE } from "../../styles/Colors";
import { ChartContainer, ChartTitle } from "../ChartComponents"


const processDataForTimeline = (memberData) => {
  const countMap = memberData.reduce((acc, user) => {
    let { attending } = user;

    // Increment count for attending and non-attending users
    if (attending === true || attending === "true") {
      acc["Yes"] = (acc["Yes"] || 0) + 1;
    } else if (attending === false || attending === "false" || attending === null) {
      acc["No"] = (acc["No"] || 0) + 1;
    }

    return acc;
  }, {});

  return Object.entries(countMap).map(([name, value]) => ({ name, value }));
};

const RSVPConfirmationCount = ({ memberData, title }) => {
  const data = useMemo(() => processDataForTimeline(memberData), [memberData]);
  const COLORS = [COLOR_PALETTE.sageGreen, COLOR_PALETTE.mauve]; // Define colors for "Yes" and "No"

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
          label={(entry) => `${entry.name}: ${entry.value}`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ChartContainer>
  );
};



export default RSVPConfirmationCount;
