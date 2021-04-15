/*
 * Everyone chat, send message to everyone in room
 */

import React, { useState } from 'react';
import ChatBubble from './ChatBubble';
import profileData from '../../utils/profileData';
import { Flex, Stack, InputGroup, Input } from '@chakra-ui/react';

const EveryoneChat = (props) => {
  let chatBubbles = null;
  const [message, setMessage] = useState('');

  const everyoneMsgList = props.everyoneMsgList;

  if (everyoneMsgList !== undefined) {
    chatBubbles = everyoneMsgList.map((item, index) => {
      return (
        <ChatBubble
          key={index}
          userName={item.source}
          userImage={
            item.source === 'You'
              ? profileData().picture
              : props.userProfilePictures[item.source]
          }
          userMessage={item.message}
          bubbleColor={index % 2 === 0 ? '#F0F0F0' : '#F9F9F9'}
        />
      );
    });
  }

  const handleChatInputKeyPressed = (event) => {
    if (event.key === 'Enter') {
      props.sendEveryoneMsg(event.target.value);
      setMessage('');
    }
  };

  return (
    <Flex
      as='div'
      pos='relative'
      paddingLeft='0.8em'
      paddingRight='0.8em'
      paddingBottom='0.8em'
      height='100%'
      width='100%'
    >
      <Stack marginBottom='50px' overflow='auto'>
        {chatBubbles}
      </Stack>
      <InputGroup
        size='md'
        pos='absolute'
        bottom='0'
        left='0'
        borderColor='#dd2c00'
        padding='inherit'
      >
        <Input
          pr='4.5rem'
          placeholder='Type a message to everyone'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleChatInputKeyPressed}
        />
      </InputGroup>
    </Flex>
  );
};

export default EveryoneChat;
