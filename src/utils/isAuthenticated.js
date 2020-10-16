const isAuthenticated = () => {
  if (localStorage.token) {
    return true;
  } else {
    return false;
  }
};

export default isAuthenticated;
