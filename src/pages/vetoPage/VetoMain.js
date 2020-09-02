import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navBar/NavBar';
import { Redirect } from 'react-router';
import VetoBody from './VetoBody';
import Button from '../../components/button/Button';
import './VetoMain.css';

const VetoMain = (props) => {
  const CLIENT_URL = process.env.REACT_APP_CLIENT_URL;
  const QUES_API = `${process.env.REACT_APP_DEV_SERVER}/questions/getQById`;
  let socket = null;

  const accessToken = localStorage.getItem('access-token');
  const [questions, setQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [vottedQuestions, setVottedQuestions] = useState([]);
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
      socket.on('VETO_STOP', (data) => {
        // TODO: after getting results move to arena for contest
        console.log('results' + data);
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

  const handleQuestionVoted = (data) => {
    if (vottedQuestions.length < 3) {
      setVottedQuestions((oldVottedQuestions) => [...oldVottedQuestions, data]);
    } else {
      alert('Only 3 questions allowed');
    }
  };

  const handleClick = () => {
    console.log(vottedQuestions);
    console.log(vottedQuestions.length);
    socket.emit('VETO_VOTES', { votes: vottedQuestions }, (data) => {
      console.log(data);
    });
  };

  // Display confirm veto button only once loading is complete
  const displayConfirmVeto = () => {
    if (!isLoading) {
      return (
        <div className='veto-confirm-vote-container'>
          <Button
            type='button'
            buttonStyle='btn--primary--normal'
            buttonSize='btn--medium'
            onClick={handleClick}
          >
            Confirm Veto
          </Button>
        </div>
      );
    }
  };

  return (
    <div className='veto-page'>
      <Navbar />
      <VetoBody
        isLoading={isLoading}
        questions={questions}
        getVotedQuestion={handleQuestionVoted}
      />
      {displayConfirmVeto()}
    </div>
  );
};

export default VetoMain;
