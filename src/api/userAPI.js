import loggedOutAxios from '../helpers/loggedOutAxios';

export const loginUser = async (loginData) => {
  const response = await loggedOutAxios.post('/users/login', loginData);
  return response.data;
};
