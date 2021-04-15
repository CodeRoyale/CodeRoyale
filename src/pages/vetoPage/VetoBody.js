import { Flex } from '@chakra-ui/layout';
import React from 'react';
import VetoQuestions from './VetoQuestions';
import VetoTopBar from './VetoTopBar';

const VetoBody = ({
  vetoTime,
  questionsLoading,
  preCheckLoading,
  questions,
}) => {
  return (
    <Flex
      pos='absolute'
      top='0'
      right='0'
      height='100%'
      bgColor='white'
      width='75%'
      flexDir='column'
    >
      <VetoTopBar vetoTime={vetoTime} />
      <VetoQuestions
        questionsLoading={questionsLoading}
        preCheckLoading={preCheckLoading}
        questions={questions}
      />
    </Flex>
  );
};

export default VetoBody;
