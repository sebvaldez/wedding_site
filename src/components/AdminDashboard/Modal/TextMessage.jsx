import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../common/Modal';
import { Form, SubmitButton } from '../../common/formStyles'

const TextMessage = () => {
  // State to store the selected text template
  const [selectedTemplate, setSelectedTemplate] = useState('template1');

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  return (
    <Modal.Content>
      <Modal.Header>Text Message All Guests</Modal.Header>
      <Form>
        <div>
          <input
            type="radio"
            id="template1"
            name="textTemplate"
            value="template1"
            checked={selectedTemplate === 'template1'}
            onChange={handleTemplateChange}
          />
          <label htmlFor="template1">
            <strong>Template 1</strong>
          </label>
          <blockquote>
            Its that time to RSV, Please check your email for the link to RSVP. We look forward to seeing you soon!
          </blockquote>
        </div>
        <div>
          <input
            type="radio"
            id="template2"
            name="textTemplate"
            value="template2"
            checked={selectedTemplate === 'template2'}
            onChange={handleTemplateChange}
          />
          <label htmlFor="template2">
            <strong>Template 2</strong>
          </label>
          <blockquote>
            Its that time to RSV, Please check your email for the link to RSVP. We look forward to seeing you soon!
          </blockquote>
        </div>
        <div>
          <input
            type="radio"
            id="template3"
            name="textTemplate"
            value="template3"
            checked={selectedTemplate === 'template3'}
            onChange={handleTemplateChange}
          />
          <label htmlFor="template3">
            <strong>Template 3</strong>
          </label>
          <blockquote>
            Its that time to RSV, Please check your email for the link to RSVP. We look forward to seeing you soon!
          </blockquote>
        </div>
        <div>
          <input
            type="radio"
            id="template4"
            name="textTemplate"
            value="template4"
            checked={selectedTemplate === 'template4'}
            onChange={handleTemplateChange}
          />
          <label htmlFor="template4">
            <strong>Template 4</strong>
          </label>
          <blockquote>
            Its that time to RSV, Please check your email for the link to RSVP. We look forward to seeing you soon!
          </blockquote>
        </div>
        <div>
          <input
            type="radio"
            id="template5"
            name="textTemplate"
            value="template5"
            checked={selectedTemplate === 'template5'}
            onChange={handleTemplateChange}
          />
          <label htmlFor="template5">
            <strong>Template 5</strong>
          </label>
          <blockquote>
            Its that time to RSV, Please check your email for the link to RSVP. We look forward to seeing you soon!
          </blockquote>
        </div>
        <SubmitButton type="submit">
          Bulk send texts
          <FontAwesomeIcon icon={faPaperPlane} size='lg' style={{ marginLeft: '0.5rem' }} />
        </SubmitButton>
      </Form>
    </Modal.Content>
  );
};

export default TextMessage;
