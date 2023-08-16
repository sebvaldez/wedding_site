// useToast.js

import { useState } from 'react';

export const useToast = () => {
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 3000);
  };

  return { toastMessage, showToast };
};
