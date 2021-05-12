import React from 'react';
import { Flex, Stack, Text } from '@chakra-ui/react';
import CountBar from './CountBar';
import CloseRoom from './CloseRoom';
import StartCompetition from './StartCompetition';
import profileData from '../../utils/profileData';
import RoomInfo from './RoomInfo';
import useRoom from '../../global-stores/useRoom';

const RoomTopBar = () => {
  const room = useRoom((state) => state.room);

  let numberOfPlayers = 0;
  let playersInTeams = 0;
  let numberOfTeams = 0;
  let maxUsersInRoom = 0;
  let maxTeamsInRoom = 0;
  let roomAdmin;

  const userName = profileData().userName.toString();

  if (room) {
    maxUsersInRoom = room.config.max_perRoom;
    maxTeamsInRoom = room.config.max_teams;
    numberOfTeams = Object.keys(room.teams).length;
    Object.keys(room.teams).forEach((teamName) => {
      playersInTeams += room.teams[teamName].length;
    });
    numberOfPlayers = playersInTeams + room.state.bench.length;
    roomAdmin = room.config.admin;
  }

  return (
    <Flex
      bg='white'
      height='150px'
      width='100%'
      alignItems='center'
      padding='1.47em'
    >
      <Stack width='100%'>
        <>
          <Text>Number of Users in Room</Text>
          <CountBar
            count={numberOfPlayers}
            total={maxUsersInRoom}
            width='100%'
          />
        </>
        <>
          <Text>Number of Teams in Room</Text>
          <CountBar count={numberOfTeams} total={maxTeamsInRoom} width='100%' />
        </>
      </Stack>
      <Stack marginLeft='1em'>
        {userName === roomAdmin ? (
          <>
            <CloseRoom />
            <StartCompetition />
          </>
        ) : null}
        <RoomInfo />
      </Stack>
    </Flex>
  );
};

export default RoomTopBar;
