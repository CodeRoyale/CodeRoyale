import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navBar/NavBar';
import { Redirect } from 'react-router';
import VetoBody from './VetoBody';
import Button from '../../components/button/Button';
import { connect } from 'react-redux';
import { veto } from '../../actions/vetoActions';
import './VetoMain.css';

const VetoMain = (props) => {
  const accessToken = localStorage.getItem('access-token');
  const [questions, setQuestions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [vottedQuestions, setVottedQuestions] = useState([]);

  useEffect(() => {
    //props.veto(props.socketData.socket);
  });

  // Checking if user is logged in
  if (accessToken === null) {
    return <Redirect to='/' />;
  }

  // // Checking if the socket and room_id are not null...
  if (props.socketData.socket === null) {
    return <Redirect to='/lobby' />;
  }

  const handleQuestionVoted = (data) => {
    if (vottedQuestions.length < 3) {
      setVottedQuestions((oldVottedQuestions) => [...oldVottedQuestions, data]);
    } else {
      alert('Only 3 questions allowed');
    }
  };

  // const handleClick = () => {
  //   console.log(vottedQuestions);
  //   console.log(vottedQuestions.length);
  //   socket.emit('VETO_VOTES', { votes: vottedQuestions }, (data) => {
  //     console.log(data);
  //   });
  // };

  // Display confirm veto button only once loading is complete
  // const displayConfirmVeto = () => {
  //   if (!isLoading) {
  //     return (
  //       <div className='veto-confirm-vote-container'>
  //         <Button
  //           type='button'
  //           buttonStyle='btn--primary--normal'
  //           buttonSize='btn--medium'
  //         >
  //           Confirm Veto
  //         </Button>
  //       </div>
  //     );
  //   }
  // };

  return (
    <div className='veto-page'>
      <Navbar />
      <VetoBody
        isLoading={isLoading}
        questions={questions}
        getVotedQuestion={handleQuestionVoted}
      />
      {/* {displayConfirmVeto()} */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  vetoData: state.vetoData,
  socketData: state.socketData,
});

export default connect(mapStateToProps, { veto })(VetoMain);
