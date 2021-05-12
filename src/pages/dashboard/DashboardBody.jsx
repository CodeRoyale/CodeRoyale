import React from 'react';
import { Flex, Image, Spacer, Stack, Text } from '@chakra-ui/react';
import dashboard from '../../assets/dashboard.svg';
import JoinRoom from './JoinRoom';
import CreateRoom from './CreateRoom';

const DashboardBody = () => (
  <Flex
    height='100%'
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
        Create a coding room with friends to <br /> battle out your competitive
        programming skills.
      </Text>
      <Flex>
        <CreateRoom />
        <JoinRoom />
      </Flex>
    </Stack>
    <Spacer />
    <Image src={dashboard} alt='Dashboard' boxSize='550px' />
  </Flex>
);

export default DashboardBody;
