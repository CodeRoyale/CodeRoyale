import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navBar/NavBar';
import './ArenaMain.css';
import Problem from './Problem';
import Chat from './Chat';
import Solution from './Solution';
import { Redirect } from 'react-router';
import { Loader } from 'rsuite';
import { connect } from 'react-redux';
import { getQuestion } from '../../actions/arenaActions';

const ArenaMain = ({ socketData, arenaData, vetoData, getQuestion }) => {
  const socket = socketData.socket;
  const [currentQuestion, setCurrentQuestion] = useState();

  useEffect(() => {
    if (vetoData.contestQuestionIDs !== null) {
      getQuestion(vetoData.contestQuestionIDs);
    }
  }, [vetoData.contestQuestionIDs, getQuestion]);

  if (socket === null) {
    return <Redirect to='/lobby' />;
  }

  const handleGetCurrQuestion = (data) => {
    setCurrentQuestion(data);
  };

  let content = (
    <div className='arena-page'>
      <div>
        <NavBar />
      </div>

      <div className='arena-body'>
        <div className='left-container'>
          <Problem
            questions={arenaData.questions}
            getCurrentQuestion={handleGetCurrQuestion}
          />
          <Chat socket={socket} />
        </div>

        <div className='right-container'>
          <Solution
            socket={socket}
            questions={arenaData.questions}
            currentQuestion={currentQuestion}
          />
        </div>
      </div>
    </div>
  );

  if (arenaData.isLoading) {
    content = (
      <div className='arena-page'>
        <div>
          <NavBar />
        </div>
        <div className='arena-page-loading'>
          <Loader size='md' content='Setting up your coding environment...' />
        </div>
      </div>
    );
  }

  return content;
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  vetoData: state.vetoData,
  arenaData: state.arenaData,
});

export default connect(mapStateToProps, { getQuestion })(ArenaMain);
