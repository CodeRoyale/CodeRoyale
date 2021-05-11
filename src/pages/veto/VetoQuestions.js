import React from 'react';
import { Flex, Skeleton } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import useVetoQuestionsIds from '../../global-stores/useVetoQuestionIds';
import VetoQuestionCard from './VetoQuestionCard';
import { getQuestionById } from '../../api/questionAPI';

const VetoQuestions = () => {
  const history = useHistory();
  const vetoQuestionIds = useVetoQuestionsIds((state) => state.vetoQuestionIds);

  // Fetching veto questions
  const { data, isLoading, isSuccess, isError } = useQuery(
    'fetchVetoQuestions',
    () => getQuestionById(history, vetoQuestionIds),
    { retry: false, refetchOnWindowFocus: false }
  );

  // Mapping questions to the QuestionCard component
  let questionsArray = null;
  let questionCards = null;
  if (isSuccess) {
    questionsArray = data.payload.data;
    questionCards = questionsArray.map((item, index) => (
      <VetoQuestionCard
        key={index}
        questionNumber={index}
        questionTitle={item.questionTitle}
        questionDesc={item.description}
        questionID={item._id}
        questionTags={item.tags}
      />
    ));
  }

  // Error in fetching questions
  if (isError) {
    history.push('/dashboard');
  }

  // Loading while fetching questions
  if (isLoading) {
    return (
      <Flex padding='35px' flexDir='column'>
        <Skeleton height='20px' />
        <Skeleton height='20px' marginTop='0.5em' />
        <Skeleton height='20px' marginTop='0.5em' />
        <Skeleton height='20px' marginTop='1em' />
        <Skeleton height='20px' marginTop='0.5em' />
        <Skeleton height='20px' marginTop='0.5em' />
        <Skeleton height='20px' marginTop='1em' />
        <Skeleton height='20px' marginTop='0.5em' />
        <Skeleton height='20px' marginTop='0.5em' />
      </Flex>
    );
  }

  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      bgColor='whitesmoke'
      flexDir='column'
      padding='5px'
    >
      {questionCards}
    </Flex>
  );
};

export default VetoQuestions;
