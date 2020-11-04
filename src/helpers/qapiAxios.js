/*
    - Axios instance for qapi requests
    - Every request contains token in request headers
*/

import axios from 'axios';

export default (history = null) => {
  const clientURL = process.env.REACT_APP_CLIENT_URL;
  const baseURL = process.env.REACT_APP_QUESTION_API;

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

  const qapiAxios = axios.create({
    baseURL: baseURL,
    headers,
    withCredentials: true,
  });

  qapiAxios.interceptors.response.use(
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
        console.log(error.response);
        // localStorage.removeItem('token');
        // // Move user to /login
        // if (history) {
        //   history.push('/login');
        // } else {
        //   window.location = '/login';
        // }
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

  return qapiAxios;
};
