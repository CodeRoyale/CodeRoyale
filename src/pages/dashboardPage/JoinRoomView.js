import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ROOM_JOINED } from '../../utils/constants';
import { connect } from 'react-redux';
import { joinRoom } from '../../actions/roomActions';
import { Input, IconButton, Icon, Flex, useToast } from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';

const JoinRoomView = ({ socketData, roomData, joinRoom }) => {
  // For showing toast messages
  const toast = useToast();

  const history = useHistory();
  const socket = socketData.socket;

  const [roomId, setRoomId] = useState('');
  const [actionDone, setActionDone] = useState(false);

  // After successful joining...
  useEffect(() => {
    if (actionDone && roomData.type === ROOM_JOINED) {
      toast({
        title: 'Joined Room',
        status: 'success',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      history.push('/room');
    } else if (
      actionDone &&
      roomData.type !== ROOM_JOINED &&
      !roomData.loading
    ) {
      toast({
        title: 'Error on trying to join room',
        description:
          'Some error occurred. Our team is in the process of fixing it',
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [
    actionDone,
    roomData.type,
    roomData.loading,
    roomData.error,
    toast,
    history,
  ]);

  const handleJoinRoom = () => {
    joinRoom(socket, { room_id: roomId });
    setActionDone(true);
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

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, { joinRoom })(JoinRoomView);
