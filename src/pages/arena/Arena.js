import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import {
  competitionStarted,
  getQuestion,
  competitionStopped,
  codeSubmittedStatus,
  roomCodeSubmissionSuccess,
} from '../../actions/arenaActions';
import { useHistory } from 'react-router-dom';
import SideBar from '../../components/sideBar';
import ArenaBody from './ArenaBody';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import useSocket from '../../global-stores/useSocket';
import useCompQuestionIds from '../../global-stores/useCompQuestionIds';
import { useQuery } from 'react-query';
import { getQuestionById } from '../../api/questionAPI';

const Arena = ({
  vetoData,
  socketData,
  arenaData,
  competitionStarted,
  getQuestion,
  competitionStopped,
  codeSubmittedStatus,
  roomCodeSubmissionSuccess,
}) => {
  const history = useHistory();
  const socket = useSocket((state) => state.socket);
  const compQuestionIds = useCompQuestionIds((state) => state.compQuestionIds);
  const compQuestionsQuery = useQuery(
    'fetchCompQuestions',
    () => getQuestionById(history, compQuestionIds),
    { retry: false }
  );

  // if (!socket) {
  //   history.push('/dashboard');
  // }

  // Listeners
  useEffect(() => {
    if (socket !== null) {
      competitionStarted(socket);
      competitionStopped(socket);
      codeSubmittedStatus(socket);
      roomCodeSubmissionSuccess(socket);
    }
  }, [
    competitionStarted,
    competitionStopped,
    codeSubmittedStatus,
    roomCodeSubmissionSuccess,
    socket,
  ]);

  // Move to /scoreboard once the competition stops
  if (arenaData.competitionStopped) {
    history.push('/scoreboard');
  }

  // Fetching all questions from api response
  let questionsList;
  if (compQuestionsQuery.isSuccess) {
    questionsList = compQuestionsQuery.data.payload.data;
  }
  // useMemo so that function doesnot compute for every single render
  const questionsObject = useMemo(() => {
    return getQuestionsObject(questionsList);
  }, [questionsList]);

  if (compQuestionsQuery.isError) {
    history.push('/dashboard');
  }

  if (compQuestionsQuery.isLoading) {
    return (
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

  return (
    <Flex pos='relative'>
      <SideBar />
      <ArenaBody questionsObject={questionsObject} />
    </Flex>
  );
};

// Return an object with problemCode as key and value as complete question
const getQuestionsObject = (questionsList) => {
  const questionsObject = {};
  if (questionsList) {
    for (let i = 0; i < questionsList.length; i++) {
      questionsObject[questionsList[i].problemCode] = questionsList[i];
    }
  }
  return questionsObject;
};

const mapStateToProps = (state) => ({
  vetoData: state.vetoData,
  socketData: state.socketData,
  arenaData: state.arenaData,
});

export default connect(mapStateToProps, {
  getQuestion,
  competitionStarted,
  competitionStopped,
  codeSubmittedStatus,
  roomCodeSubmissionSuccess,
})(Arena);
