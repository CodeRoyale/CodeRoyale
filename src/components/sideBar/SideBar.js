import React from 'react';
import { Flex } from '@chakra-ui/react';
import Chat from './Chat';
import LogoContainer from '../../components/logoContainer/LogoContainer';
import ProfileButton from '../../components/profileButton/ProfileButton';
import profileData from '../../utils/profileData';

const SideBar = () => {
  return (
    <Flex
      as='div'
      pos='relative'
      bg='white'
      w='25%'
      flexDir='column'
      borderRight='1px #e0e0e0 solid'
    >
      <Flex
        width='100%'
        height='9%'
        alignItems='center'
        justifyContent='space-between'
        padding='1em'
      >
        <LogoContainer />
        <ProfileButton profileData={profileData()} />
      </Flex>
      <Chat />
    </Flex>
  );
};

export default SideBar;
