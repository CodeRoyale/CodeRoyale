import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { connectSocket } from '../../actions/socketActions';
import { preCheckUser, userActionReset } from '../../actions/userActions';
import NavBar from '../../components/navBar/NavBar';
import { useHistory } from 'react-router-dom';
import { PRECHECK_SUCCESS } from '../../actions/types';
import { Flex, Spinner, useToast } from '@chakra-ui/react';
import DashboardBody from './DashboardBody';
import { createRoom } from '../../actions/roomActions';
import { ROOM_CREATED } from '../../utils/constants';

const DashboardMain = ({
  connectSocket,
  userData,
  roomData,
  socketData,
  preCheckUser,
  createRoom,
  userActionReset,
}) => {
  const socket = socketData.socket;
  const toast = useToast();
  const history = useHistory();

  const [actionDone, setActionDone] = useState(false);

  // For checking if user token is validated by server
  useEffect(() => {
    preCheckUser(history);
  }, [preCheckUser, history]);

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

  useEffect(() => {
    if (actionDone && roomData.type === ROOM_CREATED) {
      toast({
        title: 'Room Created!',
        status: 'success',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      setActionDone(false);
    } else if (
      actionDone &&
      !roomData.loading &&
      roomData.type !== ROOM_CREATED
    ) {
      toast({
        title: 'Error on Create Room',
        description:
          'Some error occurred. Our team is working to fix the issue!',
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
      setActionDone(false);
    }
  }, [
    roomData.type,
    roomData.loading,
    roomData.error,
    roomData,
    actionDone,
    toast,
  ]);

  // Create room data is received from props
  const handleCreateRoom = (data) => {
    createRoom(socket, data);
    setActionDone(true);
  };

  // Default content
  let content = (
    <Flex flexDir='column'>
      <NavBar loggedIn={true} />
      <DashboardBody getCreateRoomData={handleCreateRoom} />
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
  userActionReset,
})(DashboardMain);
