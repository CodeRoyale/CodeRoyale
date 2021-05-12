/*
    - Axios instance if user IS NOT logged in
    - Used for user login and sign up
*/

import axios from 'axios';

const clientURL = process.env.REACT_APP_CLIENT_URL;
const baseURL = process.env.REACT_APP_USER_API;

const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Origin', clientURL);
headers.append('Access-Control-Allow-Credentials', 'true');

const loggedOutAxios = axios.create({
  baseURL: baseURL,
  headers,
  withCredentials: true,
});

export default loggedOutAxios;
