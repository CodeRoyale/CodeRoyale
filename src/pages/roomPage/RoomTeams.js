import React from 'react';
import { Flex } from '@chakra-ui/layout';
import CreateTeamView from './CreateTeamView';

const RoomTeams = () => {
  return (
    <Flex
      bgColor='whitesmoke'
      height='100%'
      padding='1em'
      border='2px red dotted'
    >
      <CreateTeamView />
    </Flex>
  );
};

export default RoomTeams;
