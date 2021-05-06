import React, { useEffect } from 'react';
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
import { getRoom, roomUpdated, roomClosed } from '../../service/roomSocket';

const Room = ({ teamData, resetTeamAction, vetoData, vetoStart }) => {
  const toast = useToast();
  const socket = useSocket((state) => state.socket);
  const room = useRoom((state) => state.room);
  const setRoom = useRoom((state) => state.setRoom);
  const history = useHistory();

  if (!socket) {
    history.push('/dashboard');
  }

  // Getting the room Id
  let roomId;
  if (room) {
    roomId = room.config.id;
  }

  // Listeners for room updated, veto started and room closed
  useEffect(() => {
    // if (socket !== null && teamData.type !== '' && roomId !== undefined) {
    //   getRoom(socket, { room_id: roomId });
    // }

    if (socket) {
      roomUpdated(socket, (error, data) => {
        if (data) {
          getRoom(socket, { room_id: roomId }, (error, data) => {
            if (data) {
              setRoom(data);
            }
          });
        }
      });
    }

    if (socket !== null) {
      vetoStart(socket, history);
    }

    if (socket) {
      roomClosed(socket, (error, data) => {
        console.log(data);
        if (data) {
          toast({
            title: 'Room Closed',
            description: 'The admin of the room decided to close the room',
            variant: 'solid',
            position: 'top-right',
            duration: 4000,
            isClosable: true,
          });
          setRoom(null);
          history.push('/dashboard');
        }
      });
    }
  }, [history, setRoom, roomId, socket, vetoStart, toast]);

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
  teamData: state.teamData,
  vetoData: state.vetoData,
});

export default connect(mapStateToProps, {
  vetoStart,
  resetTeamAction,
})(Room);
