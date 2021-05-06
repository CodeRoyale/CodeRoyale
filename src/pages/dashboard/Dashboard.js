import React, { useEffect } from 'react';
import NavBar from '../../components/navBar';
import { Flex } from '@chakra-ui/react';
import DashboardBody from './DashboardBody';
import { socketConnection } from '../../service/socket';
import useSocket from '../../global-stores/useSocket';

const Dashboard = () => {
  const setSocket = useSocket((state) => state.setSocket);

  useEffect(() => {
    socketConnection((error, data) => {
      if (data && data.message === 'CONNECTION_ACK') {
        setSocket(data.socket);
      }
    });
  }, [setSocket]);

  return (
    <Flex flexDir='column' height='100vh'>
      <NavBar loggedIn={true} />
      <DashboardBody />
    </Flex>
  );
};

export default Dashboard;
