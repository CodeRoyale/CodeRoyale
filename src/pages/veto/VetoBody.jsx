import { Flex } from '@chakra-ui/layout';
import React from 'react';
import VetoQuestions from './VetoQuestions';
import VetoTopBar from './VetoTopBar';

const VetoBody = ({ vetoTimeLimit }) => (
  <Flex
    pos='absolute'
    top='0'
    right='0'
    height='100%'
    bgColor='white'
    width='75%'
    flexDir='column'
  >
    <VetoTopBar vetoTimeLimit={vetoTimeLimit} />
    <VetoQuestions />
  </Flex>
);

export default VetoBody;
