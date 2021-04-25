import loggedOutAxios from '../helpers/loggedOutAxios';

export const loginUser = (loginData) => {
  return loggedOutAxios
    .post('/users/login', loginData)
    .then((response) => response.data);
};
