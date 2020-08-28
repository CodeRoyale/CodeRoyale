import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navBar/NavBar';
import { Redirect } from 'react-router';
import VetoBody from './VetoBody';
import './VetoMain.css';

const VetoMain = (props) => {
  let socket = null;
  const accessToken = localStorage.getItem('access-token');
  const [isLoading, setIsLoading] = useState(true);
  const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
  const QUES_API = `${process.env.REACT_APP_DEV_SERVER}/questions/getQById`;

  console.log(QUES_API);

  useEffect(() => {
    if (socket != null) {
      socket.emit('START_COMPETITION', {}, (data) => {
        console.log(data);
        //setStartCompetition(true);
      });
      socket.on('VETO_START', (data) => {
        console.log(data);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Origin', CLIENT_URL);
        headers.append('Access-Control-Allow-Credentials', 'true');

        const quesIdReq = {
          id: data,
        };

        fetch(QUES_API, {
          method: 'POST',
          headers,
          body: JSON.stringify(quesIdReq),
        })
          .then((res) => res.json())
          .then((jsonRes) => {
            setIsLoading(false);
            console.log(jsonRes);
          });
      });
    }
  });

  // Checking if user is logged in
  if (accessToken === null) {
    return <Redirect to='/' />;
  }

  // Checking if the socket and room_id are not null...
  if (props.location.props === undefined) {
    return <Redirect to='/lobby' />;
  }

  // Setting the socket
  socket = props.location.props.socket;

  return (
    <div className='veto-page'>
      <Navbar />
      <VetoBody isLoading={isLoading} />
    </div>
  );
};

export default VetoMain;
