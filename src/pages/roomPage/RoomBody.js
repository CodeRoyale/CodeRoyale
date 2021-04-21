import { Flex } from '@chakra-ui/layout';
import React from 'react';
import RoomHeader from './RoomHeader';

const RoomBody = () => {
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
      <RoomHeader />
    </Flex>
  );
};

export default RoomBody;
