/*
    - Axios instance if user IS logged in
    - Every request contains token in request headers
*/

import axios from 'axios';

export default () => {
  const clientURL = process.env.REACT_APP_CLIENT_URL;
  const baseURL = process.env.REACT_APP_USER_API_URL;

  let headers = {};

  if (localStorage.token) {
    headers['Content-Type'] = 'application/json';
    headers['Origin'] = clientURL;
    headers['Access-Control-Allow-Credentials'] = true;
    headers.Authorization = `Bearer ${localStorage.token}`;
  } else {
    headers['Content-Type'] = 'application/json';
    headers['Origin'] = clientURL;
    headers['Access-Control-Allow-Credentials'] = true;
  }

  const loggedInAxios = axios.create({
    baseURL: baseURL,
    headers,
    withCredentials: true,
  });

  loggedInAxios.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      // User is not authenticated or refresh token expired
      if (error.response.status === 401 || error.response.status === 403) {
        localStorage.removeItem('token');
        return new Promise((resolve, reject) => {
          reject(error);
        });
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return loggedInAxios;
};
