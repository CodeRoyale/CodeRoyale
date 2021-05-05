import loggedOutAxios from '../helpers/loggedOutAxios';
import loggedInAxios from '../helpers/loggedInAxios';

export const loginUser = async (loginData) => {
  const response = await loggedOutAxios.post('/users/login', loginData);
  return response.data;
};

export const signUpUser = async (signUpData) => {
  const response = await loggedOutAxios.post('/users/signup', signUpData);
  return response.data;
};

export const preCheckUser = async (history) => {
  const response = await loggedInAxios(history).get('/precheck');
  return response.data;
};

export const deleteAccount = async (history) => {
  const response = await loggedInAxios(history).delete('/users/delete');
  return response.data;
};

export const updateAccount = async (history, newAccountData) => {
  const response = await loggedInAxios(history).patch(
    '/users/update',
    newAccountData
  );
  return response.data;
};

export const logoutUser = async (history) => {
  const response = await loggedInAxios(history).get('/users/logout');
  return response.data;
};

export const userNameCheck = async (history, userName) => {
  const response = await loggedInAxios(history).get(
    `/users/username?userName=${userName}`
  );
  return response.data;
};
