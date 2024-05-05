import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';

const BreadcrumbButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  color: #333333; // You can set any color you like.
  font-size: 1rem;
  padding: 2rem 0;
  text-decoration: none; // giving it a breadcrumb feel

  &:hover {
    color: #0056b3; // Adjust the color for hover state if necessary.
    text-decoration: none;
  }

  & .breadcrumb-icon {
    margin-right: 8px;  // A bit of space between icon and text
  }
`;

export const BackButton = ({ handleBack, crumbText = 'Back' }) => (
    <BreadcrumbButton type='button' onClick={handleBack}>
      <FontAwesomeIcon className="breadcrumb-icon" icon={faLessThan} size='sm' />
      {crumbText}
    </BreadcrumbButton>
);
