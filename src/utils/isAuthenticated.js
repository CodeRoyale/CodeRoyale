const isAuthenticated = () => {
  if (localStorage.token) {
    return true;
  }
  return false;
};

export default isAuthenticated;
