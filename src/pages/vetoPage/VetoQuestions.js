import React from 'react';
import QuestionCard from '../../components/questionCard/QuestionCard';
import { Flex, Skeleton } from '@chakra-ui/react';

const VetoQuestions = ({ questionsLoading, preCheckLoading, questions }) => {
  let questionsArray = null;
  let questionCards = null;

  // Mapping questions to the QuestionCard component
  if (questions !== undefined) {
    questionsArray = questions.payload.data;
    questionCards = questionsArray.map((item, index) => {
      return (
        <QuestionCard
          key={index}
          questionNumber={index}
          questionTitle={item.questionTitle}
          questionDesc={item.description}
          questionID={item._id}
          questionTags={item.tags}
        />
      );
    });
  }

  // Default content
  let content = (
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

  // Loading while fetching questions
  if (questionsLoading || preCheckLoading) {
    content = (
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

  return content;
};

export default VetoQuestions;
