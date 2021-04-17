import React from 'react';
import { Flex } from '@chakra-ui/react';
import ArenaSolution from './ArenaSolution';

const ArenaBody = () => {
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
      <ArenaSolution />
    </Flex>
  );
};

export default ArenaBody;
