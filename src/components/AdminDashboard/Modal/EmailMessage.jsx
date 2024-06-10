import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../common/Modal';
import { SubmitButton } from '../../common/formStyles'

const PromptContainer = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const EmailMessage = () => {
  return <Modal.Content>
    <Modal.Header>Email All Guests</Modal.Header>
      <PromptContainer>
        <h1 style={{ padding: '5rem 0 6rem 0', fontSize: '2rem' }}>Send all guests the RSVPs?</h1>
      </PromptContainer>
      <SubmitButton type="submit">
        Send Email
        <FontAwesomeIcon icon={faPaperPlane} size='lg' style={{ marginLeft: '0.5rem' }} />
      </SubmitButton>
  </Modal.Content>;
}

export default EmailMessage;
