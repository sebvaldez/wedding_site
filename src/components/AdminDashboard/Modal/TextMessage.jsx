import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import Modal from '../../common/Modal';
import { Form, ScrollableContainer, SubmitButton } from '../../common/formStyles'
import { LoadingEllipse } from '../../common/LoadingEllipse';

const textTemplates = [
  {
    id: 'initialInvitation',
    name: 'RSVP & Hotel Notice | TBD - Manual',
    message: `Hello [Guest Name], it's Sebastian & Allegra!\n\nThe online RSVP portal for our wedding on September 8, 2024 in Portland, OR is now available!\n\nA formal invitation has been sent to your email, and includes a direct link to RSVP for yourself or for your entire party. Details on the location, arrival time, and attire can also be found in your RSVP email.\n\nSubmissions will remain editable up to the RSVP by date of August 10th.\n\nFor additional information regarding hotel blocks and F.A.Qs, please visit our wedding website at www.allegrasebwedding.com.\n\nWe hope to have you join us for our special day!`
  },
  {
    id: 'rsvpReminderJune',
    name: 'RSVP Reminder | June 30th - Manual',
    message: `Hello [Guest Name], it’s Sebastian & Allegra!\n\nOur wedding is only 70 days away!\n\nIf you need to update your previous RSVP response, or have yet to RSVP, please be sure to do so no later than August 10th, so that we can provide final numbers in the required timeframe for  our vendors.\n\nFor additional information regarding hotel blocks and F.A.Qs, please visit our wedding website at www.allegrasebwedding.com.\n\nWe hope to have you join us for our special day!`
  },
  {
    id: 'rsvpReminderJuly',
    name: 'RSVP Reminder | July 15th - Manual',
    message: `Hello [Guest Name], it’s Sebastian & Allegra!\n\nThe deadline to RSVP to our wedding is 2 weeks away!\n\nIf you need to update your previous RSVP response, or have yet to RSVP, please be sure to do so no later than August 10th, so that we can provide final numbers in the required timeframe for  our vendors.\n\nFor additional information regarding hotel blocks and local activities, please visit our wedding website at www.allegrasebwedding.com.\n\nWe hope to have you join us for our special day!`
  },
  {
    id: 'hotelBlockReminder',
    name: 'Hotel Block Reminder | July 25th - Manual',
    message: `Hello [Guest Name], it’s Sebastian & Allegra!\n\nJust a quick reminder that the deadline to book one of our hotel block rates is August 8, 2024.\n\nPlease visit our wedding website www.allegrasebwedding.com/hotel-blocks to take advantage of the discounted rates and book with one of our recommended hotels.\n\nLooking forward to seeing you soon!`
  }
];

// filter out members where number is not "0" and rsvpTextUpdates is true
const filterMembers = members => members.filter(member => member.phoneNumber !== "0" && member.rsvpTextUpdates);

const TextMessage = ({ members, sendBulkTexts, isLoading }) => {
  // State to store the selected text template
  const [selectedTemplate, setSelectedTemplate] = useState('initialInvitation');

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validMembers = filterMembers(members);

    if (validMembers.length === 0) {
      console.log('No valid members to send messages to.');
      return;
    }

    sendBulkTexts({ members: validMembers, messageType: selectedTemplate });
  };

  return (
    <Modal.Content>
      <Modal.Header>Text Message All Guests</Modal.Header>
      <Form>
        <ScrollableContainer>
          { textTemplates.map(template => (
              <div key={template.id}>
                <input
                  type="radio"
                  id={template.id}
                  name="textTemplate"
                  value={template.id}
                  checked={selectedTemplate === template.id}
                  onChange={handleTemplateChange}
                />
                <label htmlFor={template.id}>
                  <strong>{template.name}</strong>
                </label>
                <blockquote>
                  {template.message.split('\n\n').map((paragraph, index) => (
                    <p style={{paddingBottom: '15px'}} key={index}>{paragraph}</p>
                  ))}
                </blockquote>
              </div>
          ))}
        </ScrollableContainer>
        <SubmitButton onClick={handleSubmit} type="submit" disabled={isLoading}>
          {isLoading ? 'Texting members' : 'Bulk send texts'}
          {isLoading ? <LoadingEllipse size={'sm'}color={'#fff'} />: <FontAwesomeIcon icon={faPaperPlane} size='lg' /> }
        </SubmitButton>
      </Form>
    </Modal.Content>
  );
};

export default TextMessage;
