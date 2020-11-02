import React, { useEffect } from 'react';
import Timer from '../../components/timer/Timer';
import VetoStatus from '../../pages/vetoPage/VetoStatus';
import './TestPage.css';

const TestPage = () => {
  useEffect(() => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Origin', 'http://localhost:3000');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Authorization', `Bearer ${localStorage.token}`);

    const quesIds = {
      id: ['5f5c57e0e541a80017bfee9b'],
    };
    fetch('https://coderoyale-questionapi.herokuapp.com/questions/getQById', {
      method: 'POST',
      headers,
      body: JSON.stringify(quesIds),
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        console.log(jsonRes);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // document.body.style = 'background: gray;';
  return (
    <div className='test-page'>
      <div className='test-column'>
        <div className='test-1'></div>
        <div className='test-2'></div>
      </div>
    </div>
  );
};

export default TestPage;
