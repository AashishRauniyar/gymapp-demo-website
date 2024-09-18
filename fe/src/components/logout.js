// logout.js
export const logoutUser = () => {
  // Remove token from localStorage or wherever it is stored
  localStorage.removeItem('token');
  // Optionally, you might want to redirect the user to a login page
  window.location.href = '/login';
};
