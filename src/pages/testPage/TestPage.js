import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../helpers/axiosInstance';
import './TestPage.css';

const TestPage = () => {
  const history = useHistory();
  useEffect(() => {
    axiosInstance(history)
      .get('/users/info?email=joelmathewkoshy@gmail.com')
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  }, [history]);
  return <h1>Test</h1>;
};

export default TestPage;
