import React, { useState, useMemo } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useTable, useSortBy, usePagination } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { useGetAllMembers } from '../hooks/members';
import { useBulkSendText, useSendEmail, useBulkSendEmail } from '../hooks/communications';
import useModal from '../hooks/useModal';
import Modal from '../components/common/Modal';
import Toast from '../components/common/Toast';
import Visualize from '../components/Visualize';
import MemberExport from '../components/AdminDashboard/MemberExport';
import TextMessage from '../components/AdminDashboard/Modal/TextMessage';
import EmailModalContent from '../components/AdminDashboard/Modal/EmailMessage';

const StyledAdminLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  margin-top: 1.2rem;
`;

const TextReminderButton = styled.button`
  padding: 8px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8em;

  &:disabled {
    background-color: #AAB8C2; /* Lighter gray color for disabled state */
    color: #E1E8ED; /* Darker gray for text color to indicate it's disabled */
    cursor: not-allowed; /* Change cursor to indicate the button is not clickable */
  }
`;

const StyledLink = styled(Link)`
  width: 120px;
  height: 30px;
  display: inline-block;
  text-align: center;
  line-height: 30px;
  text-decoration: none;
  color: black;
  background: lightgrey;
  border-radius: 5px;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 100%; /* Make buttons full width on small screens */
  }
`;

const StyledButton = styled.button`
  height: 30px;
  display: inline-block;
  text-align: center;
  line-height: 30px;
  color: black;
  background: lightgrey;
  border-radius: 5px;
  cursor: pointer;
  border: none; /* Remove default button border styling */
  white-space: nowrap; /* Prevent text from wrapping */
  min-width: 120px;

  @media (max-width: 768px) {
    width: 100%; /* Make buttons full width on small screens */
  }
`;

const StyledTable = styled.table`
  // width: 100%;
  /* padding .2rem 2rem; */
  border-collapse: collapse;
  // margin: .5rem auto;
  text-align: center;
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

const ControlBar = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next line */
  gap: 1.2rem;
  align-items: center; /* Align items vertically in the center */
  margin-bottom: 1.2rem; /* Add margin at the bottom */
  padding: .5rem;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically */
    align-items: stretch; /* Stretch items to fill the container */
  }
`;

const ControlBarGroup = styled.div`
  display: flex;
  gap: 1.2rem;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack buttons vertically on mobile */
    width: 100%; /* Make buttons full width on small screens */
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  justify-items: center;
  margin-left: 8rem;
  width: 30%;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }

`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
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
  const { data: members, isLoading: isLoadingData, isError, error, refetch } = useGetAllMembers();
  const { mutateAsync: sendEmail, toastMessage: emailToastMessage } = useSendEmail();
  const { mutateAsync: sendBulkTexts, toastMessage: textToastMessage, isLoading: isLoadingBulkTextSend } = useBulkSendText();
  const { mutateAsync: sendBulkEmails, toastMessage: bulkEmailToastMessage, isLoading: isLoadingBulkEmailSend } = useBulkSendEmail();

  const { isOpen, openModal, closeModal } = useModal();
  const [currentAction, setCurrentAction] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sendingStatuses, setSendingStatuses] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const filteredMembers = useMemo(() => {
    if (!searchQuery) return members;
    return members.filter(member => 
      member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phoneNumber.toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [members, searchQuery]);

  const sendAction = async (member, action, actionType) => {
    const key = `${actionType}-${member.id}`;
    setSendingStatuses(prev => ({ ...prev, [key]: true }));

    try {
      await action({ memberId: member.id, firstName: member.firstName });
    } catch (error) {
      console.error(`Error sending ${actionType}:`, error);
    } finally {
      setSendingStatuses(prev => ({ ...prev, [key]: false }));
    }
  };

  const sendEmailForMember = (member) => sendAction(member, sendEmail, 'email');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch({ force: true }); // This tells React Query to bypass the cache and fetch fresh data
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleBulkAction = (actionType) => {
    setCurrentAction(actionType); // Set current action
    openModal();
  }

  const modalContent = () => {
    switch (currentAction) {
      case 'textMembers':
        return <TextMessage members={members} sendBulkTexts={sendBulkTexts} isLoading={isLoadingBulkTextSend} />;
      case 'emailMembers':
        return <EmailModalContent members={members} sendBulkEmails={sendBulkEmails} isLoading={isLoadingBulkEmailSend} />;
      default:
        return <p>Select an action</p>;
    }
  };

  if (isLoadingData) return <p>Loading...</p>;
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
      Cell: ({ value }) => value
    },
    {
      Header: "Phone Number",
      accessor: "phoneNumber",
      disableSortBy: true,
      Cell: ({ value }) => String(value)  // Convert the phone number to a string
    },
    {
      Header: "Attending",
      accessor: "attending",
      Cell: ({ value }) => {
        if (value === true || value === "true") {
          return "Yes";
        } else if (value === false || value === "false") {
          return "No";
        } else {
          return "Pending";
        }
      }
    },
    {
      Header: "Send Invitation",
      disableSortBy: true,
      Cell: ({ row: { original } }) => {
        const isSendingEmail = sendingStatuses[`email-${original.id}`];

        return original.emailedInvitation ? (
          <AlreadySentButton disabled>
            Invitation Sent
          </AlreadySentButton>
        ) : (
          <TextReminderButton
            disabled={isSendingEmail}
            onClick={() => sendEmailForMember(original)}>
              {isSendingEmail ? 'Sending...' : 'Send Invitation'}
          </TextReminderButton>
        );
      }
    }
  ];

  return (
    <StyledAdminLayout>
      <ControlBar>
        <ControlBarGroup>
        <StyledButton onClick={handleRefresh}>
          {isRefreshing ? 'Loading...' : 'Refresh'}
        </StyledButton>
        <MemberExport data={members} />
        <StyledButton onClick={() => handleBulkAction('textMembers')}>Bulk Text</StyledButton>
        {/* <StyledButton disabled={true} onClick={() => handleBulkAction('emailMembers')}>Bulk Email</StyledButton> */}
        <AdminNavigationButton />
        </ControlBarGroup>
        <SearchWrapper>
          <SearchIcon icon={faSearch} />
          <SearchInput
            type="text"
            placeholder="Name, Email, or Phone Number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
      </SearchWrapper>
      </ControlBar>

      <Routes>
        <Route index element={<MyTable data={filteredMembers} columns={columns} />} />
        <Route path='visualize' element={<Visualize memberData={members} />} />
      </Routes>

      {textToastMessage && <Toast message={textToastMessage} />}
      {bulkEmailToastMessage && <Toast message={bulkEmailToastMessage} />}
      {emailToastMessage && <Toast message={emailToastMessage} />}

      {isOpen && (
        <Modal onClose={closeModal}>
          {modalContent({ members })}
        </Modal>
      )}
    </StyledAdminLayout>
  );
}

const AdminNavigationButton = () => {
  const location = useLocation(); // Hook to get the current location

  // Determine the link's destination and text based on the current path
  let linkPath = '';
  let linkText = '';

  if (location.pathname.includes('guest-table')) {
    linkPath = '/dashboard/visualize'; // Change to your actual path for visualization
    linkText = 'Visualize';
  } else if (location.pathname.includes('visualize')) {
    linkPath = '/dashboard'; // Change to your actual path for the guest table
    linkText = 'Guest Table';
  } else {
    // Default case if not in either route
    linkPath = '/dashboard/visualize'; // Or any other default you prefer
    linkText = 'Visualize';
  }

  return (
    <StyledLink to={linkPath}>{linkText}</StyledLink>
  );
};

export default AdminDashboard;