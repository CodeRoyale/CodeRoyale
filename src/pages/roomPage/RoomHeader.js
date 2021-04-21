import React from 'react';
import CountBar from './CountBar';
import CloseRoomView from './CloseRoomView';
import StartCompetitionButton from './StartCompetitionButton';
import { connect } from 'react-redux';
import profileData from '../../utils/profileData';
import { Flex, Stack, Text } from '@chakra-ui/react';
import RoomInfo from './RoomInfo';

const RoomHeader = ({ roomData }) => {
  let numberOfPlayers = 0;
  let playersInTeams = 0;
  let numberOfTeams = 0;
  let maxUsersInRoom = 0;
  let maxTeamsInRoom = 0;
  let roomAdmin;

  const userName = profileData().userName.toString();

  if (roomData.data) {
    maxUsersInRoom = roomData.data.config.max_perRoom;
    maxTeamsInRoom = roomData.data.config.max_teams;
    numberOfTeams = Object.keys(roomData.data.teams).length;
    for (let teamName in roomData.data.teams) {
      playersInTeams += roomData.data.teams[teamName].length;
    }
    numberOfPlayers = playersInTeams + roomData.data.state.bench.length;
    roomAdmin = roomData.data.config.admin;
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
            width={'100%'}
          />
        </>
        <>
          <Text>Number of Teams in Room</Text>
          <CountBar
            count={numberOfTeams}
            total={maxTeamsInRoom}
            width={'100%'}
          />
        </>
      </Stack>
      <Stack marginLeft='1em'>
        {userName === roomAdmin ? (
          <>
            <CloseRoomView />
            <StartCompetitionButton />
          </>
        ) : null}
        <RoomInfo />
      </Stack>
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  roomData: state.roomData,
});

export default connect(mapStateToProps, null)(RoomHeader);
