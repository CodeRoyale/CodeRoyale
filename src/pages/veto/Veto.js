import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getVetoStatus,
  vetoStop,
  vetoVoting,
  getAllVetoUsers,
} from '../../actions/vetoActions';
import { Flex, useToast } from '@chakra-ui/react';
import SideBar from '../../components/sideBar';
import VetoBody from './VetoBody';

const Veto = ({
  socketData,
  vetoData,
  roomData,
  userData,
  vetoStop,
  getVetoStatus,
  getAllVetoUsers,
  vetoVoting,
}) => {
  const history = useHistory();
  const socket = socketData.socket;
  const toast = useToast();
  const [getUsersFinished, setGetUsersFinished] = useState(false);

  // Fetching the room details beforehand
  // To make sure render does not break due to roomData.data being null
  let roomTeams, vetoTimeLimit;
  if (roomData.data !== null) {
    roomTeams = roomData.data.teams;
    vetoTimeLimit = roomData.data.competition.veto.timeLimit;
  }

  // Fetching all users from room (fetch only once)
  if (!getUsersFinished && roomData.data) {
    getAllVetoUsers(roomTeams);
    setGetUsersFinished(true);
  }

  // Starting the listeners for when server sends VETO_STOP and USER_VOTED
  useEffect(() => {
    if (socket !== null) {
      vetoStop(socket);
      getVetoStatus(socket);
    }
  }, [socket, vetoStop, getVetoStatus]);

  // Checking if the socket is null (if null move user back to dashboard)
  if (socket === null) {
    history.push('/dashboard');
  }

  // Move the user to Arena if veto has ended
  if (vetoData.vetoEnded) {
    history.push('/arena');
  }

  // Send votes to server
  const handleConfirmVetoVotes = () => {
    // Only send votes if the votes array is not empty
    if (vetoData.vetoVotedQuestions.length !== 0) {
      vetoVoting(socket, vetoData.vetoVotedQuestions);
    } else {
      toast({
        title: 'Error on Veto',
        description:
          'You will need to vote for atleast 1 question to confirm your veto votes',
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // Default content
  let content = (
    <Flex pos='relative'>
      <SideBar />
      <VetoBody
        vetoUsers={vetoData.vetoUsers}
        vetoCompletedUsers={vetoData.vetoCompletedUsers}
        userProfilePictures={
          roomData.data !== null ? roomData.data.state.profilePictures : null
        }
        vetoTime={vetoTimeLimit}
        questionsLoading={vetoData.quesApiLoading}
        preCheckLoading={userData.preCheckData.isLoading}
        questions={vetoData.vetoQuestions}
        confirmVetoVotes={handleConfirmVetoVotes}
        userVoted={vetoData.userVoted}
      />
    </Flex>
  );

  return content;
};

const mapStateToProps = (state) => ({
  vetoData: state.vetoData,
  socketData: state.socketData,
  roomData: state.roomData,
  userData: state.userData,
});

export default connect(mapStateToProps, {
  vetoStop,
  getVetoStatus,
  vetoVoting,
  getAllVetoUsers,
})(Veto);
