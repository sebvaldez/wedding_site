export const toTitleCaseNoSpaces = (str) => {
  return str
    .split('_') // Split the string into words by underscores
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word and make the rest lowercase
    .join(' '); // Join the words back together without spaces
};

export const mockSendText = ({ memberId, firstName }) => {
  console.log(`Initiating sendText for ${firstName} (ID: ${memberId})`);

  // Simulate a delay (e.g., network request) of 300 milliseconds
  return new Promise(resolve => setTimeout(() => {
    console.log(`Completed sendText for ${firstName} (ID: ${memberId})`);
    resolve(`Message sent to ${firstName} (ID: ${memberId})`);
  }, 300));
};
