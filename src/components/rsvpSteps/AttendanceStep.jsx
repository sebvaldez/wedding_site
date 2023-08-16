import styled from 'styled-components';

const NotAttendingButton = styled.button`
    font-size: 1.2rem;
    padding: 1rem 2rem;
    background-color: #A89FBF; // muted purple
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #9989AF; // You can adjust this for a hover color.
    }
`;

const AttendingButton = styled.button`
    font-size: 1.2rem;
    padding: 1rem 2rem;
    background-color: #8AA399; // sage green
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #799982; // You can adjust this for a hover color.
    }
`;

const AttendanceOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 4rem;
`;

export const AttendanceStep = ({ formik }) => {
  const handleAttending = () => {
    console.log('local attending');
    formik.setFieldValue('checkIn', true);
  }

  const handleNotAttending = () => {
    formik.setFieldValue('checkIn', false);
  }

  return (
    <AttendanceOptions>
      <NotAttendingButton onClick={handleNotAttending}>
        I will not be attending
      </NotAttendingButton>
      <AttendingButton onClick={handleAttending}>
        I will be attending
      </AttendingButton>
    </AttendanceOptions>
  );
};
