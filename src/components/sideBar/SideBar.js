import React from 'react';
import { Flex, Select } from '@chakra-ui/react';
import Chat from './Chat';
import LogoContainer from '../../components/logoContainer/LogoContainer';
import ProfileButton from '../../components/profileButton/ProfileButton';
import profileData from '../../utils/profileData';
import { connect } from 'react-redux';
import {
  sendEveryoneMsg,
  sendTeamMsg,
  changeChatType,
} from '../../actions/chatActions';

const SideBar = ({
  socketData,
  chatData,
  roomData,
  changeChatType,
  sendEveryoneMsg,
  sendTeamMsg,
}) => {
  const socket = socketData.socket;

  // Send message to everyone in room
  const handleEveryoneMsg = (message) => {
    sendEveryoneMsg(socket, { message });
  };

  // Send message to team
  const handleTeamMsg = (message) => {
    sendTeamMsg(socket, { message });
  };

  return (
    <Flex
      as='div'
      pos='relative'
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
          <LogoContainer />
          <ProfileButton profileData={profileData()} />
        </Flex>
        <Select
          variant='filled'
          value={chatData.chatType}
          onChange={(e) => changeChatType(e.target.value)}
        >
          <option value='everyone'>Chat with everyone</option>
          <option value='team'>Chat with team</option>
        </Select>
      </Flex>
      <Chat
        chatType={chatData.chatType}
        everyoneMsgList={chatData.everyoneMsgList}
        teamMsgList={chatData.teamMsgList}
        userProfilePictures={
          roomData.data !== null ? roomData.data.state.profilePictures : null
        }
        sendEveryoneMsg={handleEveryoneMsg}
        sendTeamMsg={handleTeamMsg}
      />
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  chatData: state.chatData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, {
  sendEveryoneMsg,
  sendTeamMsg,
  changeChatType,
})(SideBar);
