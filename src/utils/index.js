export const toTitleCaseNoSpaces = (str) => {
  return str
    .split('_') // Split the string into words by underscores
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word and make the rest lowercase
    .join(' '); // Join the words back together without spaces
};
