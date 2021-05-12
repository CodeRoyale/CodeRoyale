import React from 'react';
import { Flex, Select } from '@chakra-ui/react';
import Chat from './Chat';
import Logo from '../logo/Logo';
import ProfileButton from '../profileButton/ProfileButton';
import profileData from '../../utils/profileData';
import useChatType from '../../global-stores/useChatType';

const SideBar = () => {
  const chatType = useChatType((state) => state.chatType);
  const setChatType = useChatType((state) => state.setChatType);

  return (
    <Flex
      as='div'
      pos='fixed'
      bg='white'
      w='25%'
      height='100vh'
      flexDir='column'
      borderRight='1px #e0e0e0 solid'
    >
      <Flex
        as='div'
        pos='absolute'
        left='0'
        top='0'
        width='100%'
        height='115px'
        alignItems='center'
        justifyContent='space-between'
        bgColor='white'
        flexDir='column'
        zIndex='10'
      >
        <Flex
          width='100%'
          justifyContent='space-between'
          alignItems='center'
          padding='0.8em'
        >
          <Logo />
          <ProfileButton profileData={profileData()} />
        </Flex>
        <Select
          variant='filled'
          value={chatType}
          onChange={(e) => setChatType(e.target.value)}
        >
          <option value='everyone'>Chat with everyone</option>
          <option value='team'>Chat with team</option>
        </Select>
      </Flex>
      <Chat chatType={chatType} />
    </Flex>
  );
};

export default SideBar;
