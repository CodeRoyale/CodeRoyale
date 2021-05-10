import React, { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import SideBar from '../../components/sideBar';
import ArenaBody from './ArenaBody';
import { Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import useSocket from '../../global-stores/useSocket';
import useCompQuestionIds from '../../global-stores/useCompQuestionIds';
import useCodeSubmitLoading from '../../global-stores/useCodeSubmitLoading';
import useCompQuestions from '../../global-stores/useCompQuestions';
import useScoreboard from '../../global-stores/useScoreboard';
import { useQuery } from 'react-query';
import { getQuestionById } from '../../api/questionAPI';
import {
  competitionStarted,
  competitionStopped,
  userCodeSubmittedStatus,
  roomCodeSubmissionSuccess,
} from '../../service/arenaSocket';

const Arena = () => {
  const history = useHistory();
  const toast = useToast();
  const socket = useSocket((state) => state.socket);
  const setCodeSubmitLoading = useCodeSubmitLoading(
    (state) => state.setCodeSubmitLoading
  );
  const compQuestionIds = useCompQuestionIds((state) => state.compQuestionIds);
  const setCompQuestions = useCompQuestions((state) => state.setCompQuestions);
  const setScoreboard = useScoreboard((state) => state.setScoreboard);
  const updateScore = useScoreboard((state) => state.updateScore);

  const compQuestionsQuery = useQuery(
    'fetchCompQuestions',
    () => getQuestionById(history, compQuestionIds),
    { retry: false, refetchOnWindowFocus: false }
  );

  if (!socket) {
    history.push('/dashboard');
  }

  // Listeners
  useEffect(() => {
    userCodeSubmittedStatus(socket, (error, data) => {
      setCodeSubmitLoading(false);
      if (data) {
        const teamName = data.team_name;
        const problemCode = data.problemCode;
        updateScore(teamName, problemCode);
        toast({
          title: 'Success on Code Submission',
          description: `The code you submitted for ${problemCode} passed ALL testcases successfully!`,
          status: 'success',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
      }

      if (error) {
        const problemCode = error.problemCode;
        toast({
          title: 'Error on Code Submission',
          description: `The code you submitted for ${problemCode} didnot pass the testcases`,
          status: 'error',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
      }
    });

    competitionStarted(socket, (error, data) => {
      if (data) {
        setScoreboard(data.returnObj.scoreboard);
      }
    });

    roomCodeSubmissionSuccess(socket, (error, data) => {
      if (data) {
        const teamName = data.team_name;
        const problemCode = data.problemCode;
        updateScore(teamName, problemCode);
        toast({
          title: 'Success on Code Submission',
          description: `${teamName} passed all testcases for question ${problemCode}`,
          status: 'success',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
      }
    });

    competitionStopped(socket, (error, data) => {
      if (data) {
        setScoreboard(data.scoreboard);
        history.push('/scoreboard');
      }
    });
  }, [
    setScoreboard,
    updateScore,
    setCodeSubmitLoading,
    socket,
    toast,
    history,
  ]);

  // Fetching all questions from api response
  let questionsList;
  if (compQuestionsQuery.isSuccess) {
    questionsList = compQuestionsQuery.data.payload.data;
    setCompQuestions(compQuestionsQuery.data.payload.data);
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

export default Arena;
