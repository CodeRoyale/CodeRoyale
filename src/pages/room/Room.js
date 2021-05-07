import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, useToast } from '@chakra-ui/react';
import SideBar from '../../components/sideBar';
import RoomBody from './RoomBody';
import useSocket from '../../global-stores/useSocket';
import useRoom from '../../global-stores/useRoom';
import useTeamEvent from '../../global-stores/useTeamEvent';
import useVetoQuestions from '../../global-stores/useVetoQuestions';
import { getRoom, roomUpdated, roomClosed } from '../../service/roomSocket';
import { vetoStart } from '../../service/vetoSocket';

const Room = () => {
  const toast = useToast();
  const socket = useSocket((state) => state.socket);
  const room = useRoom((state) => state.room);
  const teamEvent = useTeamEvent((state) => state.teamEvent);
  const setTeamEvent = useTeamEvent((state) => state.setTeamEvent);
  const setRoom = useRoom((state) => state.setRoom);
  const setVetoQuestions = useVetoQuestions((state) => state.setVetoQuestions);
  const history = useHistory();

  if (!socket) {
    history.push('/dashboard');
  }

  // Getting the room Id
  let roomId;
  if (room) {
    roomId = room.config.id;
  }

  if (socket && teamEvent && roomId !== undefined) {
    getRoom(socket, { room_id: roomId }, (error, data) => {
      if (data) {
        setRoom(data);
        setTeamEvent(null);
      }
    });
  }

  // Listeners for room updated, veto started and room closed
  useEffect(() => {
    roomUpdated(socket, (error, data) => {
      if (data) {
        getRoom(socket, { room_id: roomId }, (error, data) => {
          if (data) {
            setRoom(data);
          }
        });
      }
    });

    vetoStart(socket, (error, data) => {
      if (data) {
        setVetoQuestions(data);
        // history.push('/veto')
      }
    });

    roomClosed(socket, (error, data) => {
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
  }, [history, setRoom, roomId, socket, toast, setVetoQuestions]);

  return (
    <Flex pos='relative'>
      <SideBar />
      <RoomBody />
    </Flex>
  );
};

export default Room;
