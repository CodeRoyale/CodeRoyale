import React, { useEffect } from 'react';
import { getRoom } from '../../actions/roomActions';
import { resetTeamAction } from '../../actions/teamActions';
import { vetoStart } from '../../actions/vetoActions';
import { TEAM_CREATED, TEAM_JOINED, TEAM_LEFT } from '../../utils/constants';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Flex, useToast } from '@chakra-ui/react';
import SideBar from '../../components/sideBar/SideBar';
import RoomBody from './RoomBody';

const Room = ({
  roomData,
  socketData,
  teamData,
  getRoom,
  resetTeamAction,
  vetoData,
  vetoStart,
}) => {
  const toast = useToast();
  const socket = socketData.socket;
  const history = useHistory();

  // Getting the room Id
  let room_id;
  if (roomData.data) {
    room_id = roomData.data.config.id;
  }

  // Get room & check if veto started
  useEffect(() => {
    if (socket !== null && teamData.type !== '' && room_id !== undefined) {
      getRoom(socket, { room_id });
    }

    if (socket !== null) {
      vetoStart(socket, history);
    }
  }, [room_id, socket, getRoom, vetoStart, teamData.type, history]);

  // Display Alert on every action...
  useEffect(() => {
    switch (teamData.type) {
      case TEAM_CREATED:
        toast({
          title: 'You have created a new team',
          status: 'success',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
        resetTeamAction();
        break;
      case TEAM_JOINED:
        toast({
          title: 'You have joined a team',
          status: 'success',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
        resetTeamAction();
        break;
      case TEAM_LEFT:
        toast({
          title: 'You have left a team',
          status: 'success',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
        resetTeamAction();
        break;
      default:
        break;
    }
    if (teamData.error !== null) {
      toast({
        title: teamData.error,
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      resetTeamAction();
    }
  });

  // Checking all the conditions to be in the room...
  // if (socket === null) {
  //   history.push('/dashboard');
  // }

  if (vetoData.vetoStarted) {
    history.push('/veto');
  }

  return (
    <Flex pos='relative'>
      <SideBar />
      <RoomBody />
    </Flex>
  );
};

export const mapStateToProps = (state) => ({
  roomData: state.roomData,
  teamData: state.teamData,
  socketData: state.socketData,
  vetoData: state.vetoData,
});

export default connect(mapStateToProps, {
  getRoom,
  vetoStart,
  resetTeamAction,
})(Room);
