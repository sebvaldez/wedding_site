import styled from "styled-components";

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f5f5f5;
`;

const ChartTitle = styled.h2`
  font-size: 20px;
  color: #333;
`;

export { ChartContainer, ChartTitle };
