import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navBar/NavBar';
import { useHistory } from 'react-router-dom';
import { Alert, Loader } from 'rsuite';
import { connect } from 'react-redux';
import {
  getVetoStatus,
  vetoStop,
  vetoVoting,
  getAllVetoUsers,
} from '../../actions/vetoActions';
import VetoQuestions from './VetoQuestions';
import VetoSideBar from './VetoSideBar';
import VetoTopBar from './VetoTopBar';
import './VetoMain.css';

const VetoMain = ({
  socketData,
  vetoData,
  roomData,
  vetoStop,
  getVetoStatus,
  getAllVetoUsers,
  vetoVoting,
}) => {
  const history = useHistory();
  const socket = socketData.socket;
  const [getUsersFinished, setGetUsersFinished] = useState(false);

  if (!getUsersFinished) {
    getAllVetoUsers(roomData.data.teams);
    setGetUsersFinished(true);
  }

  // To check if veto has ended
  useEffect(() => {
    if (socket !== null) {
      vetoStop(socket);
      getVetoStatus(socket);
    }
  }, [socket, vetoStop, getVetoStatus]);

  // Checking if the socket is null
  // if (socket === null) {
  //   return <Redirect to='/lobby' />;
  // }

  if (vetoData.vetoEnded) {
    // history.push('/arena');
    console.log('veto ended asabsdjbasbasdjbkabsdkjabksdb');
  }

  // Send votes to server
  const handleConfirmVetoVotes = () => {
    // Only send votes if the votes array is not empty
    if (vetoData.vetoVotedQuestions.length !== 0) {
      vetoVoting(socket, vetoData.vetoVotedQuestions);
    } else {
      Alert.error(
        'You will need to vote for atleast 1 question to confirm veto'
      );
    }
  };

  // Default content
  let content = (
    <div className='veto-page'>
      <Navbar loggedIn={true} />
      <VetoSideBar
        vetoUsers={vetoData.vetoUsers}
        vetoCompletedUsers={vetoData.vetoCompletedUsers}
      />
      <div className='veto-section'>
        <div className='veto-section-interaction'>
          <VetoTopBar
            confirmVetoVotes={handleConfirmVetoVotes}
            vetoTime={roomData.data.competition.veto.timeLimit}
          />
          <VetoQuestions
            isLoading={vetoData.quesApiLoading}
            questions={vetoData.vetoQuestions}
          />
        </div>
      </div>
    </div>
  );

  // Loading while fetching questions
  if (!vetoData.quesApiLoading) {
    content = (
      <div className='veto-page'>
        <Navbar loggedIn={true} />
        <VetoSideBar
          vetoUsers={vetoData.vetoUsers}
          vetoCompletedUsers={vetoData.vetoCompletedUsers}
        />
        <div className='veto-section'>
          <div className='veto-section-interaction'>
            <VetoTopBar
              confirmVetoVotes={handleConfirmVetoVotes}
              vetoTime={roomData.data.competition.veto.timeLimit}
            />
            <VetoQuestions
              isLoading={vetoData.quesApiLoading}
              questions={vetoData.vetoQuestions}
            />
          </div>
        </div>
      </div>
    );
  }

  // Loading after user voted
  if (vetoData.userVoted) {
    content = (
      <div className='veto-page'>
        <Navbar loggedIn={true} />
        <div className='veto-page-loading'>
          <Loader size='sm' content='Waiting for others to vote...' />
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

export default connect(mapStateToProps, {
  vetoStop,
  getVetoStatus,
  vetoVoting,
  getAllVetoUsers,
})(VetoMain);
