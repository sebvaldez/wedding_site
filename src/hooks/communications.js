import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from '@tanstack/react-query';
import backend from '../api/backend';
import Toast from  '../components/Toast';

// SEND TEXT
export const useSendText = () => {
  const { getIdTokenClaims } = useAuth0();
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const mutation = useMutation({
    mutationFn: async (textData) => {
      const claims = await getIdTokenClaims();
      const idToken = claims.__raw;

      const url = `/text/${textData.memberId}`;
      delete textData.memberId;

      return backend.post(url, textData, { headers: { 'Authorization': `Bearer ${idToken}` } });
    },
    onSuccess: (data, textData) => {
      if (data.status === 201) {
        showToast(`Text sent to ${textData.firstName} successfully!`);
      }
    }
  }, [showToast]);

  return { ...mutation, toastMessage }; // Return the mutation object along with the toastMessage
};

// SEND EMAIL
export const useSendEmail = () => {
  const { getIdTokenClaims } = useAuth0();
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const mutation = useMutation({
    mutationFn: async (emailData) => {
      const claims = await getIdTokenClaims();
      const idToken = claims.__raw;

      const url = `/sendInvitation/${emailData.memberId}`;
      delete emailData.memberId; // Remove memberId from the payload

      return backend.post(url, emailData, { headers: { 'Authorization': `Bearer ${idToken}` } });
    },
    onSuccess: (data, emailData) => {
      if (data.status === 201) {
        showToast(`Invitation sent to ${emailData.firstName} successfully!`);
      }
    }
  }, [showToast]);

  return { ...mutation, toastMessage }; // Return the mutation object along with the toastMessage
};
