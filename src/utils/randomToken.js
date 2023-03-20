const randomToken = () => {
  const characterOfValidation = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 16 }, () =>
  characterOfValidation.charAt(Math.floor(Math.random() * characterOfValidation.length))).join('');
};

module.exports = randomToken;
