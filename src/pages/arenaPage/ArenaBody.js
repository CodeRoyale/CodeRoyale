import React from 'react';
import { Flex } from '@chakra-ui/react';
import ArenaSolution from './ArenaSolution';

const ArenaBody = () => {
  return (
    <Flex
      pos='absolute'
      top='0'
      right='0'
      bgColor='white'
      width='75%'
      flexDir='column'
    >
      <ArenaSolution />
    </Flex>
  );
};

export default ArenaBody;
