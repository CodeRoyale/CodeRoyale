import React from 'react';
import { Flex, Stack, Text } from '@chakra-ui/react';

const ArenaQuestion = ({ currentQuestion }) => {
  // Question data variables
  let questionTitle;
  let questionCode;
  let questionFormat;
  let questionDescription;
  let questionIO;

  let questionInputOutput;

  // Assigning selected question data to variables
  if (currentQuestion) {
    questionTitle = currentQuestion.questionTitle;
    questionCode = currentQuestion.problemCode;
    questionFormat = currentQuestion.format;
    questionDescription = currentQuestion.description;
    questionIO = currentQuestion.io;
  }

  // Question input output view
  if (questionIO) {
    questionInputOutput = questionIO.map((item, index) => (
      <>
        <Stack marginTop='1em' key={index}>
          <Text fontSize='lg' fontWeight='bold'>
            Input
          </Text>
          <Text fontSize='md' whiteSpace='pre-line'>
            {item.input}
          </Text>
        </Stack>
        <Stack marginTop='1em'>
          <Text fontSize='lg' fontWeight='bold'>
            Output
          </Text>
          <Text fontSize='md' whiteSpace='pre-line'>
            {item.output}
          </Text>
        </Stack>
        <Stack marginTop='1em'>
          <Text fontSize='lg' fontWeight='bold'>
            Explanation
          </Text>
          <Text fontSize='md' whiteSpace='pre-line'>
            {item.explanation ? item.explanation : '(No explanation)'}
          </Text>
        </Stack>
      </>
    ));
  }

  return (
    <Flex
      as='div'
      flexDir='column'
      bgColor='white'
      marginBottom='2em'
      padding='2em'
    >
      <Stack>
        <Text fontWeight='bold' fontSize='3xl'>
          {questionTitle}
        </Text>
        <Text fontSize='xl'>{questionCode}</Text>
      </Stack>
      <Stack marginTop='1em'>
        <Text fontSize='lg' fontWeight='bold' whiteSpace='pre-line'>
          Description
        </Text>
        <Text fontSize='md' whiteSpace='pre-line'>
          {questionDescription}
        </Text>
      </Stack>
      <Stack marginTop='1em'>
        <Text fontSize='lg' fontWeight='bold'>
          Format
        </Text>
        <Text fontSize='md' whiteSpace='pre-line'>
          {questionFormat}
        </Text>
      </Stack>
      {questionInputOutput}
    </Flex>
  );
};

export default ArenaQuestion;
