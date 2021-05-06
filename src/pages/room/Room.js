import React, { useEffect } from 'react';
import { getRoom, roomClosed } from '../../actions/roomActions';
import { resetTeamAction } from '../../actions/teamActions';
import { vetoStart } from '../../actions/vetoActions';
import { TEAM_CREATED, TEAM_JOINED, TEAM_LEFT } from '../../utils/constants';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Flex, useToast } from '@chakra-ui/react';
import SideBar from '../../components/sideBar';
import RoomBody from './RoomBody';
import useSocket from '../../global-stores/useSocket';
import useRoom from '../../global-stores/useRoom';

const Room = ({
  roomData,
  socketData,
  teamData,
  getRoom,
  resetTeamAction,
  vetoData,
  vetoStart,
  roomClosed,
}) => {
  const toast = useToast();
  const socket = useSocket((state) => state.socket);
  const room = useRoom((state) => state.room);
  const history = useHistory();

  if (!socket) {
    history.push('/dashboard');
  }

  // Getting the room Id
  let roomId;
  if (room) {
    roomId = room.config.id;
  }

  // Get room & check if veto started
  useEffect(() => {
    if (socket !== null && teamData.type !== '' && roomId !== undefined) {
      getRoom(socket, { room_id: roomId });
    }

    if (socket !== null) {
      vetoStart(socket, history);
    }

    if (socket) {
      roomClosed(socket);
    }
  }, [roomId, socket, getRoom, vetoStart, teamData.type, roomClosed, history]);

  // Display Alert on every action...
  useEffect(() => {
    switch (teamData.type) {
      case TEAM_CREATED:
        toast({
          title: 'You have created a new team',
          status: 'success',
          position: 'top-right',
          duration: 750,
          isClosable: true,
        });
        resetTeamAction();
        break;
      case TEAM_JOINED:
        toast({
          title: 'You have joined a team',
          status: 'success',
          position: 'top-right',
          duration: 750,
          isClosable: true,
        });
        resetTeamAction();
        break;
      case TEAM_LEFT:
        toast({
          title: 'You have left a team',
          status: 'success',
          position: 'top-right',
          duration: 750,
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
        duration: 2000,
        isClosable: true,
      });
      resetTeamAction();
    }
  });

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
  roomClosed,
  vetoStart,
  resetTeamAction,
})(Room);
