import { Flex } from '@chakra-ui/layout';
import React from 'react';
import RoomTopBar from './RoomTopBar';
import RoomTeams from './RoomTeams';

const RoomBody = () => {
  return (
    <Flex
      pos='absolute'
      top='0'
      right='0'
      height='100vh'
      bgColor='whitesmoke'
      width='75%'
      flexDir='column'
    >
      <RoomTopBar />
      <RoomTeams />
    </Flex>
  );
};

export default RoomBody;
