/*
    - Axios instance if user IS logged in
    - Every request contains token in request headers
*/

import axios from 'axios';

export default (history = null) => {
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
  });

  loggedInAxios.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        console.log('error axios 1');
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
      if (error.response.status === 403) {
        console.log('error axios 2');
        localStorage.removeItem('token');
        // if (history) {
        //   console.log('histroy ran');
        //   history.push('/login');
        // } else {
        //   window.location('/login');
        // }
        return new Promise((resolve, reject) => {
          reject(error);
        });
      } else {
        console.log('error axios 3');
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return loggedInAxios;
};