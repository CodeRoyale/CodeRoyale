import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { connectSocket } from '../../actions/socketActions';
import { preCheckUser, userActionReset } from '../../actions/userActions';
import NavBar from '../../components/navBar/NavBar';
import { useHistory } from 'react-router-dom';
import { PRECHECK_SUCCESS } from '../../actions/types';
import { Flex, Spinner, useToast } from '@chakra-ui/react';
import DashboardBody from './DashboardBody';
import { createRoom, joinRoom } from '../../actions/roomActions';
import { ROOM_CREATED, ROOM_JOINED } from '../../utils/constants';

const Dashboard = ({
  connectSocket,
  userData,
  roomData,
  socketData,
  preCheckUser,
  createRoom,
  joinRoom,
  userActionReset,
}) => {
  const socket = socketData.socket;
  const toast = useToast();
  const history = useHistory();

  const [createRoomActionDone, setCreateRoomActionDone] = useState(false);
  const [joinRoomActionDone, setJoinRoomActionDone] = useState(false);

  // For checking if user token is validated by server
  // useEffect(() => {
  //   preCheckUser(history);
  // }, [preCheckUser, history]);

  // PreCheck error handling
  useEffect(() => {
    if (
      userData.preCheckData.error &&
      userData.preCheckData.error.payload === undefined
    ) {
      toast({
        title: 'Error on Precheck',
        description: userData.preCheckData.error,
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      localStorage.removeItem('token');
      history.push('/login');
      userActionReset();
    }
  }, [userData.preCheckData.error, userActionReset, history, toast]);

  useEffect(() => {
    if (
      userData.preCheckData.type &&
      userData.preCheckData.type === PRECHECK_SUCCESS
    ) {
      connectSocket();
    }
  }, [connectSocket, userData]);

  // Create room event messages
  useEffect(() => {
    if (createRoomActionDone && roomData.type === ROOM_CREATED) {
      toast({
        title: 'Room Created!',
        status: 'success',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      setCreateRoomActionDone(false);
      history.push('/room');
    } else if (
      createRoomActionDone &&
      !roomData.loading &&
      roomData.type !== ROOM_CREATED
    ) {
      toast({
        title: 'Error on Create Room',
        description:
          'Some error occurred. Our team is in the process of fixing it',
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      setCreateRoomActionDone(false);
    }
  }, [
    roomData.type,
    roomData.loading,
    roomData.error,
    roomData,
    createRoomActionDone,
    toast,
    history,
  ]);

  // Join room event messages
  useEffect(() => {
    if (joinRoomActionDone && roomData.type === ROOM_JOINED) {
      toast({
        title: 'Joined Room',
        status: 'success',
        position: 'top-right',
        duration: 4000,
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

  // Create room data is received from props
  const handleCreateRoom = (data) => {
    createRoom(socket, data);
    setCreateRoomActionDone(true);
  };

  // Join room data is received from props
  const handleJoinRoom = (data) => {
    joinRoom(socket, data);
    setJoinRoomActionDone(true);
  };

  // Default content
  let content = (
    <Flex flexDir='column' height='100vh'>
      <NavBar loggedIn={true} />
      <DashboardBody
        getCreateRoomData={handleCreateRoom}
        getJoinRoomData={handleJoinRoom}
      />
    </Flex>
  );

  // Pre-check running
  if (userData.preCheckData.isLoading) {
    content = (
      <Flex
        height='100vh'
        flexDir='column'
        justifyContent='center'
        alignItems='center'
      >
        <Spinner color='#dd2c00' />
      </Flex>
    );
  }

  return content;
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  roomData: state.roomData,
  userData: state.userData,
});

export default connect(mapStateToProps, {
  connectSocket,
  preCheckUser,
  createRoom,
  joinRoom,
  userActionReset,
})(Dashboard);
