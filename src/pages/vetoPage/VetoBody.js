import { Flex } from '@chakra-ui/layout';
import React from 'react';
import VetoQuestions from './VetoQuestions';
import VetoTopBar from './VetoTopBar';

const VetoBody = () => {
  return (
    <Flex height='100%' bgColor='white' width='75%'>
      <VetoTopBar />
      {/* <VetoQuestions /> */}
    </Flex>
  );
};

export default VetoBody;
