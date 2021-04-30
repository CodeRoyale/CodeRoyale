import React, { useState } from 'react';
import { Input, IconButton, Icon, Flex } from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';

const JoinRoom = ({ getJoinRoomData }) => {
  const [roomId, setRoomId] = useState('');

  const handleJoinRoom = () => {
    getJoinRoomData({ room_id: roomId });
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
