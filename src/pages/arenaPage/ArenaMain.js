import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getQuestion,
  competitionStopped,
  codeSubmittedStatus,
  roomCodeSubmissionSuccess,
} from '../../actions/arenaActions';
import { useHistory } from 'react-router-dom';
import SideBar from '../../components/sideBar/SideBar';
import ArenaBody from './ArenaBody';
import { Flex, Spinner, Text } from '@chakra-ui/react';

const ArenaMain = ({
  vetoData,
  socketData,
  arenaData,
  roomData,
  getQuestion,
  competitionStopped,
  codeSubmittedStatus,
  roomCodeSubmissionSuccess,
}) => {
  let questionsList;
  const socket = socketData.socket;
  const history = useHistory();

  // if (socket === null) {
  //   history.push('/dashboard');
  // }

  // Fetching the questions from qapi
  useEffect(() => {
    if (vetoData.contestQuestionIDs !== null) {
      getQuestion(vetoData.contestQuestionIDs);
    }
  }, [vetoData.contestQuestionIDs, getQuestion]);

  // Listeners
  useEffect(() => {
    if (socket !== null) {
      competitionStopped(socket);
      codeSubmittedStatus(socket);
      roomCodeSubmissionSuccess(socket);
    }
  }, [
    competitionStopped,
    codeSubmittedStatus,
    roomCodeSubmissionSuccess,
    socket,
  ]);

  // Move to /scoreboard once the competition stops
  if (arenaData.competitionStopped) {
    history.push('/scoreboard');
  }

  // Put all the questions in quesList from redux...
  if (arenaData.questions !== undefined && !arenaData.isLoading) {
    questionsList = arenaData.questions.payload.data;
  }

  const questionsObject = {};
  if (questionsList) {
    for (let i = 0; i < questionsList.length; i++) {
      questionsObject[questionsList[i].problemCode] = questionsList[i];
    }
  }

  // Default content
  let content = (
    <Flex pos='relative'>
      <SideBar />
      <ArenaBody questionsObject={questionsObject} />
    </Flex>
  );

  if (arenaData.isLoading) {
    content = (
      <Flex
        height='100vh'
        justifyContent='center'
        alignItems='center'
        flexDir='column'
      >
        <Spinner color='orange' />
        <Text marginTop='1em' fontSize='md'>
          Setting up your coding environment...
        </Text>
      </Flex>
    );
  }

  return content;
};

const mapStateToProps = (state) => ({
  vetoData: state.vetoData,
  socketData: state.socketData,
  arenaData: state.arenaData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, {
  getQuestion,
  competitionStopped,
  codeSubmittedStatus,
  roomCodeSubmissionSuccess,
})(ArenaMain);
