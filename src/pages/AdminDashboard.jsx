import React from 'react';
import styled from 'styled-components';
import Container from '../components/Container'
import { useTable, useSortBy, usePagination } from 'react-table';
import { useGetAllMembers } from '../hooks/members';
import { useSendEmail, useSendText } from '../hooks/communications';
import Toast from '../components/Toast';

const TextReminderButton = styled.button`
  padding: 8px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8em;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px 12px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) { // This will target even rows
    background-color: #f5f5f5;
  }

  tr:hover {
    background-color: #f0dbdb;
  }
`;

const AlreadySentButton = styled(TextReminderButton)`
  background-color: lightgray;
`;

function MyTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // Pagination related props
    page, // Instead of using 'rows', we'll use page
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 } // Set initial state for pageIndex and pageSize
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a span to show the sorting direction */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>

      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

    </>
  );
}

const AdminDashboard = () => {
  const { data: members, isLoading, isError, error } = useGetAllMembers();
  const { mutate: sendText, isLoading: isTextLoading, toastMessage: textToastMessage } = useSendText()
  const { mutate: sendEmail, isLoading: isEmailLoading, toastMessage: emailToastMessage } = useSendEmail();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const columns = [
    {
      Header: "First Name",
      accessor: "firstName",
      disableSortBy: true
    },
    {
      Header: "Last Name",
      accessor: "lastName",
      disableSortBy: true
    },
    {
      Header: "Email",
      accessor: "email",
      disableSortBy: true,
      Cell: ({ value }) => {
        if (!value) return null;  // or return "N/A" or any default value you'd like
        return value.length > 12 ? `${value.substring(0, 12)}...` : value;
      }
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
      disableSortBy: true,
      Cell: ({ value }) => String(value)  // Convert the phone number to a string
    },
    {
      Header: "Checked-in",
      accessor: "checkIn",
      Cell: ({ value }) => value ? "Yes" : "No"
    },
    {
      Header: "Transportation",
      accessor: "plannedTransportation"
    },
    {
      Header: "Dinner",
      accessor: "dinnerSelection"
    },
    {
      Header: "Drink Preference",
      accessor: "specialSippingpreference"
    },
    {
      Header: "Text Reminder",
      disableSortBy: true,
      Cell: ({ row: { original } }) => (
        <TextReminderButton
          disabled={isTextLoading}
          onClick={() => sendText({ memberId: original.id, firstName: original.firstName }) }>
            Text Reminder
        </TextReminderButton>
      )
    },
    {
      Header: "Send Invitation",
      disableSortBy: true,
      Cell: ({ row: { original } }) => {
        if (original.emailedInvitation) {
          return (
            <AlreadySentButton disabled onClick={() => sendEmail({ memberId: original.id, firstName: original.firstName }) }>
              Invitation Sent
            </AlreadySentButton>
          );
        } else {
          return (
            <TextReminderButton
              disabled={isEmailLoading}
              onClick={() => sendEmail({ memberId: original.id, firstName: original.firstName }) }>
                Send Invitation
            </TextReminderButton>
          );
        }
      }
    }
  ];

  return (
    <Container>
      <MyTable
        data={members}
        columns={columns}
      />
    {textToastMessage && <Toast message={textToastMessage} />}
    {emailToastMessage && <Toast message={emailToastMessage} />}
    </Container>
  );
}

export default AdminDashboard;