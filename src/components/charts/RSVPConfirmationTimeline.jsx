import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import { ChartContainer, ChartTitle } from "../ChartComponents";

const processDataForTimeline = (memberData) => {
  const countsByDate = memberData.reduce((acc, { updatedAt }) => {
    const date = moment(updatedAt).format("YYYY-MM-DD");
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const sortedDates = Object.keys(countsByDate).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  const cumulativeData = sortedDates.reduce((acc, date, index) => {
    const count = countsByDate[date];
    const cumulativeCount =
      index === 0 ? count : count + acc[index - 1].cumulativeCount;
    acc.push({ date, cumulativeCount });
    return acc;
  }, []);

  return cumulativeData;
};

const RSVPConfirmationTimeline = ({ memberData, title }) => {
  const data = useMemo(() => processDataForTimeline(memberData), [memberData]);

  return (
    <ChartContainer>
      <ChartTitle>{title}</ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="cumulativeCount"
            stroke="#8884d8"
            fillOpacity={0.3}
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RSVPConfirmationTimeline;
