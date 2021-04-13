import React from 'react';
import { Flex, Image, Spacer, Stack, Text } from '@chakra-ui/react';
import dashboard from '../../assets/dashboard.svg';
import JoinRoom from './JoinRoom';
import CreateRoom from './CreateRoom';

const DashboardBody = ({ getCreateRoomData }) => {
  // Create room data is received from props
  const handleCreateRoomData = (data) => {
    getCreateRoomData(data);
  };

  return (
    <Flex
      height='91vh'
      bgColor='#FAE1DD'
      justifyContent='center'
      alignItems='center'
      paddingX='8em'
    >
      <Stack>
        <Text fontWeight='bold' fontSize='4xl'>
          Compete Your Coding Skills <br /> with Others!
        </Text>
        <Text fontSize='lg'>
          Get mapped into a coding room with friends to <br /> battle out your
          competitive programming skills.
        </Text>
        <Flex>
          <CreateRoom getCreateRoomData={handleCreateRoomData} />
          <JoinRoom />
        </Flex>
      </Stack>
      <Spacer />
      <Image src={dashboard} alt='Dashboard' boxSize='550px' />
    </Flex>
  );
};

export default DashboardBody;
