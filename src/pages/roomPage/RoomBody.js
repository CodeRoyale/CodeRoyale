import { Flex } from '@chakra-ui/layout';
import React from 'react';
import RoomHeader from './RoomHeader';
import RoomTeams from './RoomTeams';

const RoomBody = ({ roomData }) => {
  return (
    <Flex
      pos='absolute'
      top='0'
      right='0'
      height='100vh'
      bgColor='white'
      width='75%'
      flexDir='column'
    >
      <RoomHeader />
      <RoomTeams />
    </Flex>
  );
};

export default RoomBody;
