import React from 'react';
import CountBar from './CountBar';
import CloseRoomView from './CloseRoomView';
import StartCompetitionButton from './StartCompetitionButton';
import { Flex, Stack, Text } from '@chakra-ui/react';
import RoomInfo from './RoomInfo';
import { connect } from 'react-redux';

const RoomHeader = ({ roomData }) => {
  let numberOfPlayers;
  let playersInTeams;
  let numberOfTeams;
  let maxUsersInRoom;
  let maxTeamsInRoom;

  if (roomData.data) {
    maxUsersInRoom = roomData.data.config.max_perRoom;
    maxTeamsInRoom = roomData.data.config.max_teams;
    numberOfTeams = Object.keys(roomData.data.teams).length;
    for (let teamName in roomData.data.teams) {
      playersInTeams += roomData.data.teams[teamName].length;
    }
    numberOfPlayers = playersInTeams + roomData.data.state.bench.length;
  }

  return (
    <Flex
      bg='white'
      height='150px'
      width='100%'
      alignItems='center'
      padding='1.47em'
      border='2px green dotted'
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
      {true ? (
        <Stack marginLeft='1em'>
          <StartCompetitionButton />
          <RoomInfo />
          <CloseRoomView />
        </Stack>
      ) : null}
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  roomData: state.roomData,
});

export default connect(mapStateToProps, null)(RoomHeader);
