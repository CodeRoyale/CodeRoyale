/*
 * Main Chat component
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { sendEveryoneMsg, sendTeamMsg } from '../../actions/chatActions';
import TeamChat from './TeamChat';
import EveryoneChat from './EveryoneChat';
import { Flex, Select } from '@chakra-ui/react';

const Chat = ({
  socketData,
  roomData,
  chatData,
  sendEveryoneMsg,
  sendTeamMsg,
}) => {
  const socket = socketData.socket;

  const [chatType, setChatType] = useState('everyone');

  const everyoneMsgList = chatData.everyoneMsgList;
  const teamMsgList = chatData.teamMsgList;

  let userProfilePictures;
  if (roomData.data !== null) {
    userProfilePictures = roomData.data.state.profilePictures;
  }

  // Send message to everyone in room
  const handleEveryoneMsg = (message) => {
    sendEveryoneMsg(socket, { message });
  };

  // Send message to teammates
  const handleTeamMsg = (message) => {
    sendTeamMsg(socket, { message });
  };

  let content = (
    <Flex as='div' pos='relative' height='91%' width='100%' flexDir='column'>
      <Select
        variant='filled'
        value={chatType}
        onChange={(e) => setChatType(e.target.value)}
      >
        <option value='everyone'>Chat with everyone</option>
        <option value='team'>Chat with team</option>
      </Select>
      {chatType === 'everyone' ? (
        <EveryoneChat
          everyoneMsgList={everyoneMsgList}
          userProfilePictures={userProfilePictures}
          sendEveryoneMsg={handleEveryoneMsg}
        />
      ) : (
        <TeamChat
          teamMsgList={teamMsgList}
          userProfilePictures={userProfilePictures}
          sendTeamMsg={handleTeamMsg}
        />
      )}
    </Flex>
  );

  return content;
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  chatData: state.chatData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, { sendEveryoneMsg, sendTeamMsg })(Chat);
