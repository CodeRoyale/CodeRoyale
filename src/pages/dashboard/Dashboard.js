import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import NavBar from '../../components/navBar';
import { useHistory } from 'react-router-dom';
import { Flex, useToast } from '@chakra-ui/react';
import DashboardBody from './DashboardBody';
import { joinRoom } from '../../actions/roomActions';
import { ROOM_JOINED } from '../../utils/constants';
import { socketConnection } from '../../service/socket';
import useSocket from '../../global-stores/useSocket';

const Dashboard = ({ roomData, socketData, joinRoom }) => {
  const socket = socketData.socket;
  const toast = useToast();
  const history = useHistory();

  const setSocket = useSocket((state) => state.setSocket);

  const [joinRoomActionDone, setJoinRoomActionDone] = useState(false);

  useEffect(() => {
    socketConnection((error, data) => {
      if (data && data.message === 'CONNECTION_ACK') {
        setSocket(data.socket);
      }
    });
  }, [setSocket]);

  // Join room event messages
  useEffect(() => {
    if (joinRoomActionDone && roomData.type === ROOM_JOINED) {
      toast({
        title: 'Joined Room',
        status: 'success',
        position: 'top-right',
        duration: 750,
        isClosable: true,
      });
      history.push('/room');
      setJoinRoomActionDone(false);
    } else if (
      joinRoomActionDone &&
      roomData.type !== ROOM_JOINED &&
      !roomData.loading
    ) {
      toast({
        title: 'Error on Join Room',
        description:
          'Some error occurred. Our team is in the process of fixing it',
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      setJoinRoomActionDone(false);
    }
  }, [
    joinRoomActionDone,
    roomData.type,
    roomData.loading,
    roomData.error,
    toast,
    history,
  ]);

  // Join room data is received from props
  const handleJoinRoom = (data) => {
    joinRoom(socket, data);
    setJoinRoomActionDone(true);
  };

  return (
    <Flex flexDir='column' height='100vh'>
      <NavBar loggedIn={true} />
      <DashboardBody getJoinRoomData={handleJoinRoom} />
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, {
  joinRoom,
})(Dashboard);
