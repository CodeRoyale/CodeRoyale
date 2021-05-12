import React, { useState } from 'react';
import { Input, IconButton, Icon, Flex, useToast } from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import useSocket from '../../global-stores/useSocket';
import useRoom from '../../global-stores/useRoom';
import { joinRoom } from '../../service/roomSocket';

const JoinRoom = () => {
  const socket = useSocket((state) => state.socket);
  const toast = useToast();
  const setRoom = useRoom((state) => state.setRoom);
  const history = useHistory();

  const [roomId, setRoomId] = useState('');

  const handleJoinRoom = () => {
    joinRoom(socket, { roomId }, (error, data) => {
      if (data) {
        toast({
          title: 'Joined Room',
          status: 'success',
          position: 'top-right',
          duration: 750,
          isClosable: true,
        });
        setRoom(data);
        history.push('/room');
      }

      if (error) {
        toast({
          title: 'Error on Join Room',
          description:
            'Some error occurred. Our team is in the process of fixing it',
          status: 'error',
          position: 'top-right',
          duration: 4000,
          isClosable: true,
        });
      }
    });
    setRoomId('');
  };

  return (
    <Flex>
      <Input
        placeholder='Room ID'
        variant='filled'
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <IconButton
        aria-label='Join room'
        icon={<Icon as={AiOutlineArrowRight} />}
        onClick={handleJoinRoom}
      />
    </Flex>
  );
};

export default JoinRoom;
