import React, { useState } from 'react';
import styled from 'styled-components';
import { CSVLink } from 'react-csv';

const StyledButton = styled.button`
  width: 120px;
  height: 30px;
  display: inline-block;
  text-align: center;
  line-height: 30px;
  color: black;
  background: lightgrey;
  border-radius: 5px;
  cursor: pointer;
  border: none; // Add this to remove default button border styling
`;

const MemberExport = ({ data }) => {
  const [csvData, setCsvData] = useState([]);

  const exportDataToCsv = () => {
    // Find all unique attributes across all data items
    const headersSet = new Set();
    data.forEach(item => {
      Object.keys(item).forEach(key => headersSet.add(key));
    });

    // Ensure that the last columns are createdAt and updatedAt
    headersSet.delete('createdAt');
    headersSet.delete('updatedAt');
    const headers = Array.from(headersSet);
    headers.push('createdAt', 'updatedAt');

    // Map data to match CSV format
    const csvFormattedData = data.map(item => {
      const rowData = [];
      // Iterate through all possible attributes and add them to rowData
      headers.forEach(header => {
        const value = item[header];
        if (Array.isArray(value)) {
          // Join array values into a string
          rowData.push(value.join(', '));
        } else {
          rowData.push(value || ''); // If the attribute doesn't exist, push an empty string
        }
      });
      return rowData;
    });

    // Prepend headers to the data
    csvFormattedData.unshift(headers);

    // Update CSV data state
    setCsvData(csvFormattedData);
  };


  const getFileName = () => {
    const now = new Date();
    const formattedDate = `${now.getMonth() + 1}_${now.getDate()}_${now.getFullYear()}_${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}`;
    return `wedding_members_${formattedDate}.csv`;
  };

  return (
    <>
      <StyledButton onClick={exportDataToCsv}>
      <CSVLink data={csvData}  filename={getFileName()}>
        Download CSV
      </CSVLink>
      </StyledButton>
    </>
  );
};

export default MemberExport;
