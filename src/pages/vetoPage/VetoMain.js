import React, { useState } from 'react';
import Navbar from '../../components/navBar/NavBar';
import { Redirect } from 'react-router';
import VetoBody from './VetoBody';
import { Loader } from 'rsuite';
import Button from '../../components/button/Button';
import { connect } from 'react-redux';
import { veto, vetoVoting } from '../../actions/vetoActions';
import './VetoMain.css';

const VetoMain = (props) => {
  const accessToken = localStorage.getItem('access-token');
  const [vottedQuestions, setVottedQuestions] = useState([]);

  // Checking if user is logged in
  if (accessToken === null) {
    return <Redirect to='/' />;
  }

  // // Checking if the socket and room_id are not null...
  if (props.socketData.socket === null) {
    return <Redirect to='/lobby' />;
  }

  if (props.vetoData.vetoEnded) {
    return <Redirect to='/arena' />;
  }

  const handleQuestionVoted = (data) => {
    if (
      vottedQuestions.length < props.roomData.data.competition.veto.max_vote
    ) {
      setVottedQuestions((oldVottedQuestions) => [...oldVottedQuestions, data]);
    } else {
      alert(`Only ${props.roomData.data.competition.veto.max_vote} is allowed`);
    }
  };

  const handleClick = () => {
    props.vetoVoting(props.socketData.socket, vottedQuestions);
  };

  let content = (
    <div className='veto-page'>
      <Navbar />
      <VetoBody
        isLoading={props.vetoData.quesApiLoading}
        questions={props.vetoData.questions}
        getVotedQuestion={handleQuestionVoted}
      />
    </div>
  );

  if (!props.vetoData.quesApiLoading) {
    content = (
      <div className='veto-page'>
        <Navbar />
        <VetoBody
          isLoading={props.vetoData.quesApiLoading}
          questions={props.vetoData.questions}
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

  if (props.vetoData.userVoted) {
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

export default connect(mapStateToProps, { veto, vetoVoting })(VetoMain);
