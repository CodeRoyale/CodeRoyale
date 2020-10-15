import React, { useEffect } from 'react';
import loggedInAxios from '../../helpers/loggedInAxios';
import './TestPage.css';

const TestPage = () => {
  useEffect(() => {
    loggedInAxios()
      .get('/precheck')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return <h1>Tests</h1>;
};

export default TestPage;
