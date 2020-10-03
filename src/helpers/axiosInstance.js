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

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
  });

  axiosInstance.interceptors.response.use(
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

      if (error.response.status === 403) {
        localStorage.removeItem('token');
        if (history) {
          console.log('histroy ran');
          history.push('/login');
        } else {
          window.location('/login');
        }
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return axiosInstance;
};
