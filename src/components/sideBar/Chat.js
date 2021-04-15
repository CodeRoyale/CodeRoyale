/*
 * Main Chat component
 */

import React from 'react';
import TeamChat from './TeamChat';
import EveryoneChat from './EveryoneChat';
import { Flex } from '@chakra-ui/react';

const Chat = ({
  everyoneMsgList,
  teamMsgList,
  userProfilePictures,
  chatType,
  sendEveryoneMsg,
  sendTeamMsg,
}) => {
  // Sending in props to main component for everyone message
  const handleEveryoneMsg = (message) => {
    sendEveryoneMsg(message);
  };

  // Sending in props to main component for team message
  const handleTeamMsg = (message) => {
    sendTeamMsg(message);
  };

  let content = (
    <Flex
      as='div'
      pos='relative'
      height='100%'
      width='100%'
      flexDir='column'
      paddingTop='115px'
    >
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

export default Chat;
