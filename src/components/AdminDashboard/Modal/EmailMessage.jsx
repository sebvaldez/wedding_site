import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import Modal from '../../common/Modal';
import { LoadingEllipse } from '../../common/LoadingEllipse';
import { SubmitButton } from '../../common/formStyles'

const PromptContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;


const BAD_EMAIL = 'no-email@test.com';

const filterMembers = members => members.filter(member => !!member.email && member.email !== BAD_EMAIL);

const EmailMessage = ({ members, sendBulkEmails, isLoading}) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const validMembers = filterMembers(members);

    sendBulkEmails({  members: validMembers });
  }

  return <Modal.Content>
    <Modal.Header>Email All Guests</Modal.Header>
      <PromptContainer>
        <h1 style={{ padding: '5rem 0 6rem 0', fontSize: '2rem' }}>Send all guests the RSVPs?</h1>
      </PromptContainer>
        <SubmitButton onClick={handleSubmit} type="submit" disabled={isLoading}>
          {isLoading ? 'Emailing members' : 'Bulk send emails'}
          {isLoading ? <LoadingEllipse size={'sm'}color={'#fff'} />: <FontAwesomeIcon icon={faPaperPlane} size='lg' /> }
        </SubmitButton>
  </Modal.Content>;
}

export default EmailMessage;
