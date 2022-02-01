import React from 'react';
import { Flex } from '@chakra-ui/react';
import NavBar from '../../components/navBar';
import HomeBody from './HomeBody';
import './Home.css';

const Home = () => (
  <Flex flexDir='column'>
    <NavBar loggedIn={false} />
    <HomeBody />
  </Flex>
);

export default Home;
