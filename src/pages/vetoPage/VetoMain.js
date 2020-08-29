import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navBar/NavBar';
import { Redirect } from 'react-router';
import VetoBody from './VetoBody';
import './VetoMain.css';

const VetoMain = (props) => {
  const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
  const QUES_API = `${process.env.REACT_APP_DEV_SERVER}/questions/getQById`;
  let socket = null;

  const accessToken = localStorage.getItem('access-token');
  const [questions, setQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let [tempSocket, setTempSocket] = useState(null);

  useEffect(() => {
    if (tempSocket != null) {
      // so that START_COMPETITION is emitted only once
      setTempSocket(null);
      socket.emit('START_COMPETITION', {}, (data) => {
        console.log(data);
      });
    }

    if (socket != null) {
      socket.on('VETO_START', (data) => {
        // Calling the ques API for questions based on ids sent from lobby
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Origin', CLIENT_URL);
        headers.append('Access-Control-Allow-Credentials', 'true');
        const quesIds = {
          id: data,
        };
        fetch(QUES_API, {
          method: 'POST',
          headers,
          body: JSON.stringify(quesIds),
        })
          .then((res) => res.json())
          .then((jsonRes) => {
            setIsLoading(false);
            setQuestions(jsonRes);
          });
      });
    }
  }, [tempSocket, socket, CLIENT_URL, QUES_API]);

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
  // Setting a temp socket so that START_COMPETITION is emitted only once
  tempSocket = socket;

  return (
    <div className='veto-page'>
      <Navbar />
      <VetoBody isLoading={isLoading} questions={questions} />
    </div>
  );
};

export default VetoMain;
