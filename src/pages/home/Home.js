import React from 'react';
import NavBar from '../../components/navBar/NavBar';
import HomeBody from './HomeBody';
import { Flex } from '@chakra-ui/react';
import './Home.scss';

const Home = () => {
  return (
    <Flex flexDir='column'>
      <NavBar loggedIn={false} />
      <HomeBody />
    </Flex>
  );
};

export default Home;
