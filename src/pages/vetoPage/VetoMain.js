import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navBar/NavBar';
import { Redirect } from 'react-router';
import VetoBody from './VetoBody';
import { Loader } from 'rsuite';
import Button from '../../components/button/Button';
import { connect } from 'react-redux';
import { vetoStop, vetoVoting } from '../../actions/vetoActions';
import './VetoMain.css';

const VetoMain = ({ socketData, roomData, vetoData, vetoStop, vetoVoting }) => {
  const accessToken = localStorage.getItem('access-token');
  const [vottedQuestions, setVottedQuestions] = useState([]);
  const socket = socketData.socket;

  useEffect(() => {
    if (socket !== null) {
      vetoStop(socket);
    }
  }, [socket, vetoStop]);

  // Checking if user is logged in
  if (accessToken === null) {
    return <Redirect to='/' />;
  }

  // // Checking if the socket and room_id are not null...
  if (socket === null) {
    return <Redirect to='/lobby' />;
  }

  if (vetoData.vetoEnded) {
    return <Redirect to='/arena' />;
  }

  const handleQuestionVoted = (data) => {
    if (vottedQuestions.length < roomData.data.competition.veto.max_vote) {
      setVottedQuestions((oldVottedQuestions) => [...oldVottedQuestions, data]);
    } else {
      alert(`Only ${roomData.data.competition.veto.max_vote} is allowed`);
    }
  };

  const handleClick = () => {
    vetoVoting(socket, vottedQuestions);
  };

  let content = (
    <div className='veto-page'>
      <Navbar />
      <VetoBody
        isLoading={vetoData.quesApiLoading}
        questions={vetoData.questions}
        getVotedQuestion={handleQuestionVoted}
      />
    </div>
  );

  if (!vetoData.quesApiLoading) {
    content = (
      <div className='veto-page'>
        <Navbar />
        <VetoBody
          isLoading={vetoData.quesApiLoading}
          questions={vetoData.questions}
          getVotedQuestion={handleQuestionVoted}
        />
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
      </div>
    );
  }

  if (vetoData.userVoted) {
    content = (
      <div className='veto-page'>
        <Navbar />
        <div className='veto-page-loading'>
          <Loader size='md' content='Waiting for others to vote...' />
        </div>
      </div>
    );
  }

  return content;
};

const mapStateToProps = (state) => ({
  vetoData: state.vetoData,
  socketData: state.socketData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, { vetoStop, vetoVoting })(VetoMain);
