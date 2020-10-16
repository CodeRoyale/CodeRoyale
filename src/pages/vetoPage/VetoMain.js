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
  const [vottedQuestions, setVottedQuestions] = useState([]);
  const socket = socketData.socket;

  // To check if veto has ended
  useEffect(() => {
    if (socket !== null) {
      vetoStop(socket);
    }
  }, [socket, vetoStop]);

  // Checking if the socket is null
  if (socket === null) {
    return <Redirect to='/lobby' />;
  }

  if (vetoData.vetoEnded) {
    return <Redirect to='/arena' />;
  }

  // Allow only set number of votes
  const handleQuestionVoted = (data) => {
    if (vottedQuestions.length < roomData.data.competition.veto.max_vote) {
      setVottedQuestions((oldVottedQuestions) => [...oldVottedQuestions, data]);
    } else {
      alert(`Only ${roomData.data.competition.veto.max_vote} is allowed`);
    }
  };

  // Send votes to server
  const handleVotesConfirm = () => {
    vetoVoting(socket, vottedQuestions);
  };

  // Default content
  let content = (
    <div className='veto-page'>
      <Navbar />
      <VetoBody
        isLoading={vetoData.quesApiLoading}
        questions={vetoData.vetoQuestions}
        getVotedQuestion={handleQuestionVoted}
      />
    </div>
  );

  // Loading while fetching questions
  if (!vetoData.quesApiLoading) {
    content = (
      <div className='veto-page'>
        <Navbar loggedIn={true} />
        <VetoBody
          isLoading={vetoData.quesApiLoading}
          questions={vetoData.vetoQuestions}
          getVotedQuestion={handleQuestionVoted}
        />
        <div className='veto-confirm-vote-container'>
          <Button
            type='button'
            buttonStyle='btn--primary--normal'
            buttonSize='btn--medium'
            onClick={handleVotesConfirm}
          >
            Confirm Veto
          </Button>
        </div>
      </div>
    );
  }

  // Loading after user voted
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
