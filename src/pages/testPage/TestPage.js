import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import loggedInAxios from '../../helpers/loggedInAxios';
import './TestPage.css';

const TestPage = () => {
  const history = useHistory();
  useEffect(() => {
    loggedInAxios(history)
      .get('/users/info?email=joelmathewkoshy@gmail.com')
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  }, [history]);
  return <h1>Test</h1>;
};

export default TestPage;
