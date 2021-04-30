import React, { useState } from 'react';
import ArenaEditor from './ArenaEditor';
import ArenaQuestion from './ArenaQuestion';
import { Flex, Text, Select, Stack } from '@chakra-ui/react';

const ArenaBody = ({ questionsObject }) => {
  const questionCodeList = [];
  let questionCodesOptions = null;

  // Creating a list with only question codes
  if (questionsObject) {
    for (let questionCode in questionsObject) {
      questionCodeList.push(questionCode);
    }
  }

  // Mapping question codes in select
  if (questionCodeList) {
    questionCodesOptions = questionCodeList.map((item, index) => {
      return (
        <option key={index} value={item}>
          {item}
        </option>
      );
    });
  }

  // The current question data selected from select option
  const [currentQuestionCode, setCurrentQuestionCode] = useState(
    questionCodeList[0]
  );
  const [currentQuestion, setCurrentQuestion] = useState(
    questionsObject[questionCodeList[0]]
  );

  // Handle changing of data in question code select
  const handleQuestionCodeChange = (e) => {
    const questionCode = e.target.value;
    setCurrentQuestionCode(questionCode);
    setCurrentQuestion(questionsObject[questionCode]);
  };

  return (
    <Flex
      pos='absolute'
      top='0'
      right='0'
      bgColor='whitesmoke'
      width='75%'
      flexDir='column'
      padding='1em'
    >
      <Stack bgColor='white' padding='2em' marginBottom='2em'>
        <Text fontSize='lg'>Question</Text>
        <Select value={currentQuestionCode} onChange={handleQuestionCodeChange}>
          {questionCodesOptions}
        </Select>
      </Stack>
      <ArenaQuestion currentQuestion={currentQuestion} />
      <ArenaEditor currentQuestion={currentQuestion} />
    </Flex>
  );
};

export default ArenaBody;
