import styled from 'styled-components';
import Greeting from '../Greeting';

const NotAttendingButton = styled.button`
    font-size: 1.2rem;
    padding: 1rem 2rem;
    background-color: #A89FBF; // muted purple
    color: white;
    border: none;
    border-radius: 4px;
    max-width: 450px; // Set your desired maximum width
    width: 100%; // This will ensure the button takes the full width up to max-width
    align-self: center;
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
    max-width: 450px; // Set your desired maximum width
    width: 100%; // This will ensure the button takes the full width up to max-width
    align-self: center;
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

export const AttendanceStep = ({ formik, memberData }) => {
  const handleAttending = () => {
    formik.setFieldValue('attending', true);
  }

  const handleNotAttending = () => {
    formik.setFieldValue('attending', false);
  }

  return (
    <>
      <Greeting
        firstName={ formik.values.firstName || memberData?.firstName }
        lastName={  formik.values.lastName || memberData?.lastName }
      />
      <AttendanceOptions>
        <NotAttendingButton type='submit' onClick={handleNotAttending}>
          I will not be attending
        </NotAttendingButton>
        <AttendingButton type='submit' onClick={handleAttending}>
          I will be attending
        </AttendingButton>
      </AttendanceOptions>
    </>
  );
};
